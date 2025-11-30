// Quiz JavaScript Module
(function () {
    'use strict';

    // Quiz state
    const quizState = {
        questions: [],
        currentQuestionIndex: 0,
        userEmail: null,
        userName: null,
        sessionId: null,
        score: 0,
        answers: [],
        startTime: null,
        questionStartTime: null
    };

    // Initialize quiz when DOM is ready
    function initQuiz() {
        // Load user data from localStorage
        loadUserData();
        
        // Set up event listeners
        setupEventListeners();
        
        // Load questions
        loadQuestions();
    }

    // Load user data from localStorage
    function loadUserData() {
        quizState.userEmail = localStorage.getItem('quiz_user_email');
        quizState.userName = localStorage.getItem('quiz_user_name');
        
        if (quizState.userEmail && quizState.userName) {
            // Pre-fill registration form
            const emailInput = document.getElementById('quiz-email');
            const nameInput = document.getElementById('quiz-name');
            if (emailInput) emailInput.value = quizState.userEmail;
            if (nameInput) nameInput.value = quizState.userName;
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Start quiz button
        const startBtn = document.getElementById('quiz-start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', handleStartQuiz);
        }

        // Change name button
        const changeNameBtn = document.getElementById('quiz-change-name-btn');
        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', handleChangeName);
        }

        // Restart quiz button
        const restartBtn = document.getElementById('quiz-restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', handleRestartQuiz);
        }

        // Review answers button
        const reviewBtn = document.getElementById('quiz-review-btn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', handleReviewAnswers);
        }
    }

    // Load questions from TSV file
    async function loadQuestions() {
        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : {
                    QUESTIONS_TSV_PATH: 'data/quiz-questions.tsv'
                };

            const response = await fetch(config.QUESTIONS_TSV_PATH);
            if (!response.ok) {
                throw new Error(`Failed to load questions: ${response.statusText}`);
            }

            const tsvContent = await response.text();
            quizState.questions = parseTSVQuestions(tsvContent);
            
            console.log(`Loaded ${quizState.questions.length} questions`);
        } catch (error) {
            console.error('Error loading questions:', error);
            showMessage('quiz-registration-message', 
                'Failed to load questions. Please check if the questions file exists.', 
                'error');
        }
    }

    // Parse TSV questions
    function parseTSVQuestions(tsvContent) {
        const lines = tsvContent.trim().split('\n');
        const questions = [];

        lines.forEach((line, index) => {
            if (!line.trim()) return;

            const parts = line.split('\t');
            if (parts.length < 5) {
                console.warn(`Skipping invalid question at line ${index + 1}: ${line}`);
                return;
            }

            const question = parts[0].trim();
            const correctAnswer = parts[1].trim();
            const answer2 = parts[2].trim();
            const answer3 = parts[3].trim();
            const answer4 = parts[4].trim();

            // Create answers array
            const answers = [correctAnswer, answer2, answer3, answer4];
            
            // Shuffle answers for display
            const shuffledAnswers = [...answers];
            shuffleArray(shuffledAnswers);
            
            // Find correct answer index in shuffled array
            const correctIndex = shuffledAnswers.indexOf(correctAnswer);

            questions.push({
                id: index + 1,
                question: question,
                answers: answers,
                correctAnswer: 0, // Original index
                correctAnswerText: correctAnswer,
                shuffledAnswers: shuffledAnswers,
                correctIndex: correctIndex
            });
        });

        return questions;
    }

    // Shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Handle start quiz
    async function handleStartQuiz() {
        const emailInput = document.getElementById('quiz-email');
        const nameInput = document.getElementById('quiz-name');

        if (!emailInput || !nameInput) return;

        const email = emailInput.value.trim();
        const name = nameInput.value.trim();

        // Validate inputs
        if (!email || !isValidEmail(email)) {
            showMessage('quiz-registration-message', 
                'Please enter a valid email address.', 
                'error');
            return;
        }

        if (!name) {
            showMessage('quiz-registration-message', 
                'Please enter your name.', 
                'error');
            return;
        }

        // Check if questions are loaded
        if (quizState.questions.length === 0) {
            showMessage('quiz-registration-message', 
                'Questions are still loading. Please wait...', 
                'error');
            return;
        }

        // Save user data
        quizState.userEmail = email;
        quizState.userName = name;
        localStorage.setItem('quiz_user_email', email);
        localStorage.setItem('quiz_user_name', name);

        // Start quiz session
        try {
            quizState.sessionId = await startQuizSession(email, name);
            quizState.startTime = Date.now();
            quizState.score = 0;
            quizState.answers = [];
            quizState.currentQuestionIndex = 0;

            // Show quiz player
            showSection('quiz-player');
            displayQuestion();
        } catch (error) {
            console.error('Error starting quiz session:', error);
            showMessage('quiz-registration-message', 
                'Failed to start quiz session. Please try again.', 
                'error');
        }
    }

    // Start quiz session
    async function startQuizSession(email, name) {
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            throw new Error('Google Script URL not configured');
        }

        // Generate session ID (client-side for now, will be validated by server)
        const sessionId = 'SESSION_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Submit to Google Apps Script
        const formData = new URLSearchParams();
        formData.append('action', 'startSession');
        formData.append('email', email);
        formData.append('name', name);
        formData.append('sessionId', sessionId);
        formData.append('totalQuestions', quizState.questions.length.toString());

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                return result.sessionId || sessionId;
            } else {
                throw new Error(result.error || 'Failed to start session');
            }
        } catch (error) {
            console.error('Error starting session:', error);
            // Return session ID anyway for offline mode
            return sessionId;
        }
    }

    // Display current question
    function displayQuestion() {
        if (quizState.currentQuestionIndex >= quizState.questions.length) {
            endQuiz();
            return;
        }

        const question = quizState.questions[quizState.currentQuestionIndex];
        const questionText = document.getElementById('quiz-question-text');
        const answersContainer = document.getElementById('quiz-answers');
        const questionNumber = document.getElementById('quiz-question-number');
        const totalQuestions = document.getElementById('quiz-total-questions');
        const progressFill = document.getElementById('quiz-progress-fill');
        const currentScore = document.getElementById('quiz-current-score');
        const currentName = document.getElementById('quiz-current-name');

        if (questionText) {
            questionText.textContent = question.question;
        }

        if (questionNumber) {
            questionNumber.textContent = (quizState.currentQuestionIndex + 1).toString();
        }

        if (totalQuestions) {
            totalQuestions.textContent = quizState.questions.length.toString();
        }

        if (progressFill) {
            const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
            progressFill.style.width = progress + '%';
        }

        if (currentScore) {
            currentScore.textContent = quizState.score.toString();
        }

        if (currentName) {
            currentName.textContent = quizState.userName;
        }

        // Clear previous answers
        if (answersContainer) {
            answersContainer.innerHTML = '';
            
            // Create answer buttons
            const colors = ['red', 'blue', 'yellow', 'green'];
            const colorLabels = ['Red', 'Blue', 'Yellow', 'Green'];
            question.shuffledAnswers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = `quiz-answer-btn quiz-answer-${colors[index]}`;
                button.textContent = answer;
                button.dataset.answerIndex = index;
                button.dataset.isCorrect = (index === question.correctIndex).toString();
                button.setAttribute('aria-label', `${colorLabels[index]} option: ${answer}`);
                button.setAttribute('tabindex', '0');
                button.addEventListener('click', () => handleAnswerSelect(button, question));
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleAnswerSelect(button, question);
                    }
                });
                answersContainer.appendChild(button);
            });
        }

        // Start timer
        startTimer();
        quizState.questionStartTime = Date.now();
    }

    // Start timer for current question
    function startTimer() {
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { QUESTION_TIME_LIMIT: 30000 };

        const timeLimit = config.QUESTION_TIME_LIMIT || 30000;
        let timeRemaining = timeLimit / 1000; // Convert to seconds
        const timerText = document.getElementById('quiz-timer-text');
        const timerProgress = document.getElementById('quiz-timer-progress');

        const timerInterval = setInterval(() => {
            timeRemaining -= 0.1;
            
            if (timerText) {
                const seconds = Math.ceil(timeRemaining);
                timerText.textContent = seconds.toString();
                
                // Update aria-label for screen readers
                const timerAnnounce = document.getElementById('quiz-timer-announce');
                if (timerAnnounce) {
                    timerAnnounce.textContent = seconds === 1 ? '1 second remaining' : seconds + ' seconds remaining';
                }
                
                // Add warning class when time is running out
                if (timeRemaining <= 5 && timeRemaining > 0) {
                    timerText.classList.add('warning');
                } else {
                    timerText.classList.remove('warning');
                }
            }

            if (timerProgress) {
                const progress = (timeRemaining / (timeLimit / 1000)) * 100;
                timerProgress.style.strokeDashoffset = (100 - progress) * 2.827; // 2πr for r=45
                
                // Change color when time is running out
                if (timeRemaining <= 5 && timeRemaining > 0) {
                    timerProgress.style.stroke = '#F44336';
                } else {
                    timerProgress.style.stroke = 'var(--primary-color)';
                }
            }

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                // Auto-submit if no answer selected
                const answersContainer = document.getElementById('quiz-answers');
                if (answersContainer) {
                    const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
                    if (buttons.length > 0 && !answersContainer.querySelector('.selected')) {
                        // No answer selected, mark as incorrect
                        handleAnswerTimeout();
                    }
                }
            }
        }, 100);
    }

    // Handle answer selection
    function handleAnswerSelect(button, question) {
        // Disable all buttons
        const answersContainer = document.getElementById('quiz-answers');
        if (answersContainer) {
            const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
            buttons.forEach(btn => {
                btn.disabled = true;
                btn.setAttribute('tabindex', '-1');
                if (btn === button) {
                    btn.classList.add('selected');
                    btn.setAttribute('aria-pressed', 'true');
                }
            });
        }

        // Calculate time taken
        const timeTaken = Date.now() - quizState.questionStartTime;
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { QUESTION_TIME_LIMIT: 30000, BASE_POINTS: 1000, TIME_BONUS_MAX: 500 };

        const timeLimit = config.QUESTION_TIME_LIMIT || 30000;
        const isCorrect = button.dataset.isCorrect === 'true';
        
        // Calculate points
        let points = 0;
        if (isCorrect) {
            const basePoints = config.BASE_POINTS || 1000;
            const timeBonus = ((timeLimit - timeTaken) / timeLimit) * (config.TIME_BONUS_MAX || 500);
            points = Math.round(basePoints + timeBonus);
            quizState.score += points;
        }

        // Store answer
        quizState.answers.push({
            questionId: question.id,
            questionText: question.question,
            selectedAnswer: button.textContent,
            correctAnswer: question.correctAnswerText,
            isCorrect: isCorrect,
            timeTaken: timeTaken,
            points: points
        });

        // Show correct/incorrect feedback
        if (answersContainer) {
            const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
            buttons.forEach(btn => {
                if (btn.dataset.isCorrect === 'true') {
                    btn.classList.add('correct');
                } else if (btn === button && !isCorrect) {
                    btn.classList.add('incorrect');
                }
            });
        }

        // Submit answer to server
        submitAnswer(question, button.textContent, timeTaken, points, isCorrect);

        // Move to next question after delay
        setTimeout(() => {
            quizState.currentQuestionIndex++;
            displayQuestion();
        }, config.SHOW_CORRECT_ANSWER_DELAY || 2000);
    }

    // Handle answer timeout
    function handleAnswerTimeout() {
        const question = quizState.questions[quizState.currentQuestionIndex];
        
        // Store answer as incorrect
        quizState.answers.push({
            questionId: question.id,
            questionText: question.question,
            selectedAnswer: null,
            correctAnswer: question.correctAnswerText,
            isCorrect: false,
            timeTaken: (typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG && CONFIG.QUIZ_CONFIG.QUESTION_TIME_LIMIT) || 30000,
            points: 0
        });

        // Show correct answer
        const answersContainer = document.getElementById('quiz-answers');
        if (answersContainer) {
            const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
            buttons.forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.isCorrect === 'true') {
                    btn.classList.add('correct');
                }
            });
        }

        // Submit answer to server
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { QUESTION_TIME_LIMIT: 30000 };
        submitAnswer(question, null, config.QUESTION_TIME_LIMIT || 30000, 0, false);

        // Move to next question after delay
        setTimeout(() => {
            quizState.currentQuestionIndex++;
            displayQuestion();
        }, config.SHOW_CORRECT_ANSWER_DELAY || 2000);
    }

    // Submit answer to server
    async function submitAnswer(question, selectedAnswer, timeTaken, points, isCorrect) {
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            console.warn('Google Script URL not configured, answer not submitted');
            return;
        }

        const formData = new URLSearchParams();
        formData.append('action', 'submitAnswer');
        formData.append('email', quizState.userEmail);
        formData.append('name', quizState.userName);
        formData.append('sessionId', quizState.sessionId);
        formData.append('questionId', question.id.toString());
        formData.append('questionText', question.question);
        formData.append('selectedAnswer', selectedAnswer || '');
        formData.append('correctAnswer', question.correctAnswerText);
        formData.append('isCorrect', isCorrect.toString());
        formData.append('timeTaken', timeTaken.toString());
        formData.append('points', points.toString());

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (!result.success) {
                console.error('Error submitting answer:', result.error);
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            // Store answer locally for retry later
            const pendingAnswers = JSON.parse(localStorage.getItem('quiz_pending_answers') || '[]');
            pendingAnswers.push({
                email: quizState.userEmail,
                name: quizState.userName,
                sessionId: quizState.sessionId,
                questionId: question.id,
                questionText: question.question,
                selectedAnswer: selectedAnswer || '',
                correctAnswer: question.correctAnswerText,
                isCorrect: isCorrect,
                timeTaken: timeTaken,
                points: points
            });
            localStorage.setItem('quiz_pending_answers', JSON.stringify(pendingAnswers));
        }
    }

    // End quiz
    async function endQuiz() {
        // Submit end session
        try {
            await endQuizSession();
        } catch (error) {
            console.error('Error ending quiz session:', error);
        }

        // Calculate results
        const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
        const totalQuestions = quizState.questions.length;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        // Display results
        const finalScore = document.getElementById('quiz-final-score');
        const correctAnswersEl = document.getElementById('quiz-correct-answers');
        const accuracyEl = document.getElementById('quiz-accuracy');

        if (finalScore) finalScore.textContent = quizState.score.toString();
        if (correctAnswersEl) correctAnswersEl.textContent = `${correctAnswers} / ${totalQuestions}`;
        if (accuracyEl) accuracyEl.textContent = accuracy + '%';

        // Show results section
        showSection('quiz-results');
    }

    // End quiz session
    async function endQuizSession() {
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            return;
        }

        const formData = new URLSearchParams();
        formData.append('action', 'endSession');
        formData.append('email', quizState.userEmail);
        formData.append('sessionId', quizState.sessionId);
        formData.append('totalScore', quizState.score.toString());
        formData.append('totalQuestions', quizState.questions.length.toString());
        formData.append('correctAnswers', quizState.answers.filter(a => a.isCorrect).length.toString());

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (!result.success) {
                console.error('Error ending session:', result.error);
            }
        } catch (error) {
            console.error('Error ending session:', error);
        }
    }

    // Handle change name
    function handleChangeName() {
        const newName = prompt('Enter your new name:', quizState.userName);
        if (newName && newName.trim()) {
            quizState.userName = newName.trim();
            localStorage.setItem('quiz_user_name', quizState.userName);
            
            const currentName = document.getElementById('quiz-current-name');
            if (currentName) {
                currentName.textContent = quizState.userName;
            }

            // Update name on server
            updateUserName(newName.trim());
        }
    }

    // Update user name on server
    async function updateUserName(newName) {
        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            return;
        }

        const formData = new URLSearchParams();
        formData.append('action', 'updateUserName');
        formData.append('email', quizState.userEmail);
        formData.append('newName', newName);

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (!result.success) {
                console.error('Error updating name:', result.error);
            }
        } catch (error) {
            console.error('Error updating name:', error);
        }
    }

    // Handle restart quiz
    function handleRestartQuiz() {
        // Reset quiz state
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        quizState.answers = [];
        quizState.sessionId = null;

        // Show registration section
        showSection('quiz-registration');
    }

    // Handle review answers
    function handleReviewAnswers() {
        const reviewContainer = document.getElementById('quiz-answer-review');
        if (!reviewContainer) return;

        if (reviewContainer.style.display === 'none') {
            // Show review
            reviewContainer.innerHTML = '';
            
            quizState.answers.forEach((answer, index) => {
                const reviewItem = document.createElement('div');
                reviewItem.className = `quiz-review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
                reviewItem.innerHTML = `
                    <div class="quiz-review-question">
                        <strong>Question ${index + 1}:</strong> ${answer.questionText}
                    </div>
                    <div class="quiz-review-answers">
                        <div class="quiz-review-answer ${answer.isCorrect ? '' : 'wrong'}">
                            <span class="quiz-review-label">Your Answer:</span>
                            <span>${answer.selectedAnswer || 'No answer'}</span>
                        </div>
                        <div class="quiz-review-answer correct">
                            <span class="quiz-review-label">Correct Answer:</span>
                            <span>${answer.correctAnswer}</span>
                        </div>
                        <div class="quiz-review-points">
                            Points: ${answer.points}
                        </div>
                    </div>
                `;
                reviewContainer.appendChild(reviewItem);
            });

            reviewContainer.style.display = 'block';
        } else {
            // Hide review
            reviewContainer.style.display = 'none';
        }
    }

    // Show specific section
    function showSection(sectionId) {
        const sections = ['quiz-registration', 'quiz-player', 'quiz-results'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.style.display = id === sectionId ? 'block' : 'none';
            }
        });
    }

    // Show message
    function showMessage(elementId, message, type) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.className = `form-message ${type}`;
            element.style.display = 'block';
        }
    }

    // Validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }
})();

