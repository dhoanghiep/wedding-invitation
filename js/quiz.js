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
        questionStartTime: null,
        forcedAdvanceCheckInterval: null
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

        // Next question button
        const nextBtn = document.getElementById('quiz-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', handleNextQuestion);
        }

        // Begin quiz button (from rules page)
        const beginBtn = document.getElementById('quiz-begin-btn');
        if (beginBtn) {
            beginBtn.addEventListener('click', handleBeginQuiz);
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
            if (parts.length < 6) {
                console.warn(`Skipping invalid question at line ${index + 1}: Expected 6 columns (Question, Answer1, Answer2, Answer3, Answer4, CorrectIndex), got ${parts.length}`);
                return;
            }

            const question = parts[0].trim();
            const answer1 = parts[1].trim();
            const answer2 = parts[2].trim();
            const answer3 = parts[3].trim();
            const answer4 = parts[4].trim();
            const correctAnswerIndex = parseInt(parts[5].trim(), 10);

            // Validate correct answer index (should be 1, 2, 3, or 4)
            if (isNaN(correctAnswerIndex) || correctAnswerIndex < 1 || correctAnswerIndex > 4) {
                console.warn(`Skipping invalid question at line ${index + 1}: Correct answer index must be 1, 2, 3, or 4, got ${parts[5]}`);
                return;
            }

            // Create answers array (index 0-3, but correctAnswerIndex is 1-4)
            const answers = [answer1, answer2, answer3, answer4];
            const correctAnswerText = answers[correctAnswerIndex - 1]; // Convert 1-4 to 0-3 index
            
            // Shuffle answers for display
            const shuffledAnswers = [...answers];
            shuffleArray(shuffledAnswers);
            
            // Find correct answer index in shuffled array
            const correctIndex = shuffledAnswers.indexOf(correctAnswerText);

            questions.push({
                id: index + 1,
                question: question,
                answers: answers,
                correctAnswer: correctAnswerIndex - 1, // Original index (0-3)
                correctAnswerText: correctAnswerText,
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

            // Show rules section instead of going directly to quiz
            showSection('quiz-rules');
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

        // Hide Next button for new question
        const nextContainer = document.getElementById('quiz-next-container');
        if (nextContainer) {
            nextContainer.style.display = 'none';
        }

        // Start tracking time for scoring (no visual timer)
        quizState.questionStartTime = Date.now();
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

        // Show only if selected answer is correct or incorrect (don't reveal correct answer)
        if (answersContainer) {
            if (isCorrect) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        }

        // Submit answer to server
        submitAnswer(question, button.textContent, timeTaken, points, isCorrect);

        // Show Next button instead of auto-advancing
        const nextContainer = document.getElementById('quiz-next-container');
        if (nextContainer) {
            nextContainer.style.display = 'block';
        }
    }


    // Update question index when starting quiz
    async function updateQuestionIndexOnStart() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                return;
            }

            const formData = new URLSearchParams();
            formData.append('action', 'updateQuestionIndex');
            formData.append('sessionId', quizState.sessionId);
            formData.append('email', quizState.userEmail);
            formData.append('questionIndex', quizState.currentQuestionIndex.toString());

            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                console.error('Failed to update question index');
            }
        } catch (error) {
            console.error('Error updating question index:', error);
        }
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
        // Stop forced advance checking
        stopForcedAdvanceCheck();
        
        // Submit end session
        try {
            await endQuizSession();
        } catch (error) {
            console.error('Error ending quiz session:', error);
        }

        // Calculate results
        const correctAnswers = quizState.answers.filter(a => a.isCorrect).length;
        const totalQuestions = quizState.questions.length;

        // Display results
        const finalScore = document.getElementById('quiz-final-score');
        const correctAnswersEl = document.getElementById('quiz-correct-answers');

        if (finalScore) finalScore.textContent = quizState.score.toString();
        if (correctAnswersEl) correctAnswersEl.textContent = `${correctAnswers} / ${totalQuestions}`;

        // Show results section
        showSection('quiz-results');
        
        // Load and display leaderboard
        await loadLeaderboard();
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

    // Handle begin quiz (from rules page)
    async function handleBeginQuiz() {
        // Start checking for forced advances
        startForcedAdvanceCheck();
        
        // Update server with initial question index
        await updateQuestionIndexOnStart();
        
        // Show quiz player and start with first question
        showSection('quiz-player');
        displayQuestion();
    }

    // Handle next question
    async function handleNextQuestion() {
        quizState.currentQuestionIndex++;
        
        // Update server-side question index
        await updateQuestionIndex();
        
        displayQuestion();
    }

    // Update question index on server
    async function updateQuestionIndex() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                return;
            }

            const formData = new URLSearchParams();
            formData.append('action', 'updateQuestionIndex');
            formData.append('sessionId', quizState.sessionId);
            formData.append('email', quizState.userEmail);
            formData.append('questionIndex', quizState.currentQuestionIndex.toString());

            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                console.error('Failed to update question index');
            }
        } catch (error) {
            console.error('Error updating question index:', error);
        }
    }

    // Handle restart quiz
    function handleRestartQuiz() {
        // Stop forced advance checking
        stopForcedAdvanceCheck();
        
        // Reset quiz state
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        quizState.answers = [];
        quizState.sessionId = null;

        // Show registration section
        showSection('quiz-registration');
    }

    // Start checking for forced advances
    function startForcedAdvanceCheck() {
        // Only check if we're in the quiz player section
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        // Check every 2 seconds
        quizState.forcedAdvanceCheckInterval = setInterval(() => {
            checkForcedAdvance();
        }, 2000);
    }

    // Stop checking for forced advances
    function stopForcedAdvanceCheck() {
        if (quizState.forcedAdvanceCheckInterval) {
            clearInterval(quizState.forcedAdvanceCheckInterval);
            quizState.forcedAdvanceCheckInterval = null;
        }
    }

    // Check if admin has forced advance to next question
    async function checkForcedAdvance() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        // Only check if we're in the quiz player section
        const playerSection = document.getElementById('quiz-player');
        if (!playerSection || playerSection.style.display === 'none') {
            return;
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                return;
            }

            const formData = new URLSearchParams();
            formData.append('action', 'checkForcedAdvance');
            formData.append('sessionId', quizState.sessionId);
            formData.append('email', quizState.userEmail);
            formData.append('currentQuestionIndex', quizState.currentQuestionIndex.toString());

            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            if (!response.ok) {
                return;
            }

            const result = await response.json();
            
            if (result.success && result.shouldAdvance) {
                // Admin has forced advance - move to the target question
                const targetIndex = result.targetQuestionIndex || (quizState.currentQuestionIndex + 1);
                
                if (targetIndex > quizState.currentQuestionIndex && targetIndex < quizState.questions.length) {
                    // Advance to the target question
                    quizState.currentQuestionIndex = targetIndex;
                    
                    // If we're past the last question, end the quiz
                    if (quizState.currentQuestionIndex >= quizState.questions.length) {
                        endQuiz();
                    } else {
                        // Display the new question
                        displayQuestion();
                    }
                }
            }
        } catch (error) {
            // Silently fail - don't interrupt the user experience
            console.log('Error checking forced advance:', error);
        }
    }


    // Show specific section
    function showSection(sectionId) {
        const sections = ['quiz-registration', 'quiz-rules', 'quiz-player', 'quiz-results'];
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

    // Load leaderboard
    async function loadLeaderboard() {
        const leaderboardContainer = document.getElementById('quiz-leaderboard');
        const leaderboardLoading = document.getElementById('quiz-leaderboard-loading');
        
        if (!leaderboardContainer) return;
        
        // Show loading state
        if (leaderboardLoading) {
            leaderboardLoading.style.display = 'block';
        }
        leaderboardContainer.innerHTML = '';
        
        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            // Fetch leaderboard
            const formData = new URLSearchParams();
            formData.append('action', 'getLeaderboard');

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
            
            if (leaderboardLoading) {
                leaderboardLoading.style.display = 'none';
            }
            
            if (result.success && result.leaderboard) {
                displayLeaderboard(result.leaderboard);
            } else {
                leaderboardContainer.innerHTML = '<p class="quiz-leaderboard-error">Unable to load leaderboard at this time.</p>';
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            if (leaderboardLoading) {
                leaderboardLoading.style.display = 'none';
            }
            leaderboardContainer.innerHTML = '<p class="quiz-leaderboard-error">Unable to load leaderboard at this time.</p>';
        }
    }

    // Display leaderboard
    function displayLeaderboard(leaderboard) {
        const leaderboardContainer = document.getElementById('quiz-leaderboard');
        if (!leaderboardContainer) return;

        if (leaderboard.length === 0) {
            leaderboardContainer.innerHTML = '<p class="quiz-leaderboard-empty">No scores yet. Be the first!</p>';
            return;
        }

        // Find current user's position
        const currentUserIndex = leaderboard.findIndex(entry => entry.email === quizState.userEmail);
        
        let html = '<div class="quiz-leaderboard-list">';
        
        leaderboard.forEach((entry, index) => {
            const isCurrentUser = entry.email === quizState.userEmail;
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
            
            html += `
                <div class="quiz-leaderboard-item ${isCurrentUser ? 'current-user' : ''}">
                    <div class="quiz-leaderboard-rank">
                        ${medal} <span class="rank-number">${rank}</span>
                    </div>
                    <div class="quiz-leaderboard-info">
                        <div class="quiz-leaderboard-name">${escapeHtml(entry.name || 'Anonymous')}</div>
                        <div class="quiz-leaderboard-details">
                            <span>Score: ${entry.totalScore || 0}</span>
                            <span>•</span>
                            <span>${entry.correctAnswers || 0}/${entry.totalQuestions || 0} correct</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        leaderboardContainer.innerHTML = html;
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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

