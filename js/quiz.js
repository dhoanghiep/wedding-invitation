// Quiz JavaScript Module
(function () {
    'use strict';

    // Quiz state
    const quizState = {
        questions: [],
        currentQuestionIndex: -1, // Start at -1 to indicate waiting
        userEmail: null,
        userName: null,
        sessionId: null,
        score: 0,
        answers: [],
        startTime: null,
        questionStartTime: null,
        forcedAdvanceCheckInterval: null,
        questionStateCheckInterval: null,
        currentQuestionOpen: true,
        waitingForStart: false,
        pauseStateCheckUntil: 0 // Timestamp when state checking should resume
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
        
        if (quizState.userName) {
            // Pre-fill registration form
            const nameInput = document.getElementById('quiz-name');
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

        // Next question button removed - questions advance automatically when admin allows

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
        const nameInput = document.getElementById('quiz-name');
        const startBtn = document.getElementById('quiz-start-btn');

        if (!nameInput) return;

        const name = nameInput.value.trim();

        // Validate inputs
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

        // Show loading state
        let originalText = 'Continue';
        if (startBtn) {
            originalText = startBtn.textContent || 'Continue';
            startBtn.disabled = true;
            startBtn.innerHTML = '<span class="btn-spinner"></span> Starting...';
        }

        // Generate email from name (for session tracking)
        const email = name.toLowerCase().replace(/\s+/g, '.') + '@quiz.local';
        
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
            quizState.currentQuestionIndex = -1; // Start at -1 (waiting)

            // Show rules section
            showSection('quiz-rules');
        } catch (error) {
            console.error('Error starting quiz session:', error);
            showMessage('quiz-registration-message', 
                'Failed to start quiz session. Please try again.', 
                'error');
            
            // Restore button state on error
            if (startBtn) {
                startBtn.disabled = false;
                startBtn.textContent = originalText;
            }
        } finally {
            // Restore button state (in case of success, it's already hidden by showSection)
            const registrationSection = document.getElementById('quiz-registration');
            if (startBtn && registrationSection && registrationSection.style.display !== 'none') {
                startBtn.disabled = false;
                startBtn.textContent = originalText;
            }
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
        // CRITICAL: Don't display question if waiting for start
        // This is a safety check to prevent displaying questions when game start status is 0
        if (quizState.waitingForStart) {
            showSection('quiz-rules');
            return;
        }
        
        // Check if we have a valid question index
        if (quizState.currentQuestionIndex < 0 || quizState.currentQuestionIndex >= quizState.questions.length) {
            return;
        }

        const question = quizState.questions[quizState.currentQuestionIndex];
        const questionText = document.getElementById('quiz-question-text');
        const answersContainer = document.getElementById('quiz-answers');
        const answerWaiting = document.getElementById('quiz-answer-waiting');
        const questionNumber = document.getElementById('quiz-question-number');
        const totalQuestions = document.getElementById('quiz-total-questions');
        const progressFill = document.getElementById('quiz-progress-fill');
        const currentScore = document.getElementById('quiz-current-score');
        const currentName = document.getElementById('quiz-current-name');
        
        // Hide waiting message and show question/answers
        if (answerWaiting) {
            answerWaiting.style.display = 'none';
        }
        if (questionText) {
            questionText.style.display = 'block';
        }
        if (answersContainer) {
            answersContainer.style.display = 'grid';
        }

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

        // Next button removed - questions advance automatically when admin allows

        // Update question status display
        updateQuestionStatusDisplay();

        // Start tracking time for scoring (no visual timer)
        quizState.questionStartTime = Date.now();
    }


    // Handle answer selection
    function handleAnswerSelect(button, question) {
        // Check if question is still open
        if (!quizState.currentQuestionOpen) {
            // Question is closed - show message and don't process answer
            alert('This question is closed. Your answer will receive 0 points.');
        }

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
        
        // Calculate points - if question is closed, give 0 points
        let points = 0;
        if (quizState.currentQuestionOpen && isCorrect) {
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

        // Don't reveal answer - just show selected state
        if (answersContainer) {
            // Only mark as selected, don't show correct/incorrect
            button.classList.add('selected');
        }

        // Hide question and answers, show waiting message
        const questionText = document.getElementById('quiz-question-text');
        const answerWaiting = document.getElementById('quiz-answer-waiting');
        
        if (questionText) {
            questionText.style.display = 'none';
        }
        if (answersContainer) {
            answersContainer.style.display = 'none';
        }
        if (answerWaiting) {
            answerWaiting.style.display = 'block';
        }

        // Submit answer to server (include question index and closed status)
        submitAnswer(question, button.textContent, timeTaken, points, isCorrect, !quizState.currentQuestionOpen);

        // Questions advance automatically when admin allows - no button needed
    }


    // Update question index when starting quiz
    function updateQuestionIndexOnStart() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            // No script URL configured - this is okay, just skip syncing
            return;
        }

        // Fire-and-forget request - don't await to avoid CORS blocking
        const formData = new URLSearchParams();
        formData.append('action', 'updateQuestionIndex');
        formData.append('sessionId', quizState.sessionId);
        formData.append('email', quizState.userEmail);
        formData.append('questionIndex', quizState.currentQuestionIndex.toString());

        // Use fetch without await - fire and forget to avoid CORS issues
        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors mode to avoid CORS errors
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        }).catch(() => {
            // Silently ignore all errors - request may still succeed on server side
            // CORS errors are expected and don't mean the request failed
        });
    }

    // Submit answer to server
    async function submitAnswer(question, selectedAnswer, timeTaken, points, isCorrect, questionClosed = false) {
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
        formData.append('questionIndex', quizState.currentQuestionIndex.toString());

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
    function handleBeginQuiz() {
        // Set waiting state
        quizState.waitingForStart = true;
        quizState.currentQuestionIndex = -1;
        
        // Disable the button and show ready state
        const beginBtn = document.getElementById('quiz-begin-btn');
        if (beginBtn) {
            beginBtn.disabled = true;
            beginBtn.textContent = 'Ready - Waiting for game to start...';
            beginBtn.classList.add('ready-state');
        }
        
        // Start checking for game start (from rules page)
        startForcedAdvanceCheck();
        
        // Update server with initial question index (fire-and-forget, non-blocking)
        updateQuestionIndexOnStart();
        
        // Stay on rules page - don't show waiting section
    }

    // Next question handler removed - questions advance automatically when admin allows

    // Update question index on server
    function updateQuestionIndex() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
            ? CONFIG.QUIZ_CONFIG 
            : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

        const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
        
        if (!scriptUrl) {
            // No script URL configured - this is okay, just skip syncing
            return;
        }

        // Fire-and-forget request - don't await to avoid CORS blocking
        const formData = new URLSearchParams();
        formData.append('action', 'updateQuestionIndex');
        formData.append('sessionId', quizState.sessionId);
        formData.append('email', quizState.userEmail);
        formData.append('questionIndex', quizState.currentQuestionIndex.toString());

        // Use fetch without await - fire and forget to avoid CORS issues
        fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors mode to avoid CORS errors
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        }).catch(() => {
            // Silently ignore all errors - request may still succeed on server side
            // CORS errors are expected and don't mean the request failed
        });
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

    // Start checking for question state changes
    function startForcedAdvanceCheck() {
        // Check if we have session info
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        // Check question state every 1 second
        quizState.questionStateCheckInterval = setInterval(() => {
            checkQuestionState();
        }, 1000);
        
        // Also check immediately
        checkQuestionState();
    }

    // Stop checking for question state
    function stopForcedAdvanceCheck() {
        if (quizState.questionStateCheckInterval) {
            clearInterval(quizState.questionStateCheckInterval);
            quizState.questionStateCheckInterval = null;
        }
    }

    // Check question state (open/closed and if next question is available)
    async function checkQuestionState() {
        if (!quizState.sessionId || !quizState.userEmail) {
            return;
        }

        // Check if we're on rules page (waiting for start), waiting section, or in quiz player section
        const rulesSection = document.getElementById('quiz-rules');
        const waitingSection = document.getElementById('quiz-waiting');
        const playerSection = document.getElementById('quiz-player');
        const isOnRules = rulesSection && rulesSection.style.display !== 'none';
        const isWaiting = waitingSection && waitingSection.style.display !== 'none';
        const isPlaying = playerSection && playerSection.style.display !== 'none';
        const isWaitingForStart = quizState.waitingForStart;
        
        // Skip checking if we're in the pause period (5 seconds after displaying new question)
        // BUT: Don't skip if we're waiting for game to start (on rules page)
        const now = Date.now();
        // Only skip pause if we're not waiting for start
        if (!isWaitingForStart && now < quizState.pauseStateCheckUntil) {
            return;
        }
        
        if (!isOnRules && !isWaiting && !isPlaying) {
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
            formData.append('action', 'checkQuestionState');
            formData.append('questionIndex', Math.max(0, quizState.currentQuestionIndex).toString());

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
            
            if (result.success) {
                // Check game start status (0 = not started, 1 = started)
                // CRITICAL: Default to 0 (not started) to prevent accidental advancement
                // Only advance if explicitly set to 1 by the server
                const gameStartStatus = result.gameStartStatus !== undefined ? parseInt(result.gameStartStatus) : 0;
                
                // If on rules page or waiting section, check if game has started
                if ((isOnRules || isWaiting) && quizState.waitingForStart) {
                    // CRITICAL: Only advance if gameStartStatus is EXACTLY 1
                    // Even if currentQuestionIndex >= 0, don't advance if gameStartStatus is 0
                    if (gameStartStatus === 1 && result.currentQuestionIndex >= 0) {
                        // Game has started!
                        quizState.waitingForStart = false;
                        quizState.currentQuestionIndex = result.currentQuestionIndex;
                        // Default to open when starting game
                        quizState.currentQuestionOpen = true;
                        // Pause state checking for 5 seconds after displaying first question
                        quizState.pauseStateCheckUntil = Date.now() + 5000;
                        showSection('quiz-player');
                        displayQuestion();
                        return;
                    }
                    // If gameStartStatus is 0 (or any value other than 1), stay on rules page (waiting) - DO NOT ADVANCE
                    // This prevents users from seeing questions when game is restarted or not started
                    if (gameStartStatus !== 1) {
                        // Ensure we're on rules page and button is in waiting state
                        showSection('quiz-rules');
                        const beginBtn = document.getElementById('quiz-begin-btn');
                        if (beginBtn) {
                            beginBtn.disabled = true;
                            beginBtn.textContent = 'Ready - Waiting for game to start...';
                            beginBtn.classList.add('ready-state');
                        }
                    }
                    return;
                }
                
                // If playing but gameStartStatus is 0, move back to rules page
                if (isPlaying && gameStartStatus === 0) {
                    quizState.waitingForStart = true;
                    quizState.currentQuestionIndex = -1;
                    showSection('quiz-rules');
                    // Re-enable the button
                    const beginBtn = document.getElementById('quiz-begin-btn');
                    if (beginBtn) {
                        beginBtn.disabled = false;
                        beginBtn.textContent = 'I\'m Ready';
                        beginBtn.classList.remove('ready-state');
                    }
                    return;
                }
                
                // If playing, update question state
                if (isPlaying) {
                    // IMPORTANT: Don't advance questions if game start status is 0
                    // This prevents users from seeing questions when game is restarted
                    if (gameStartStatus === 0) {
                        // Game was restarted - move back to rules page
                        quizState.waitingForStart = true;
                        quizState.currentQuestionIndex = -1;
                        showSection('quiz-rules');
                        // Re-enable the button
                        const beginBtn = document.getElementById('quiz-begin-btn');
                        if (beginBtn) {
                            beginBtn.disabled = false;
                            beginBtn.textContent = 'I\'m Ready';
                            beginBtn.classList.remove('ready-state');
                        }
                        return;
                    }
                    
                    // Check if next question is available (do this first, before status updates)
                    // Only advance if game start status is 1
                    if (gameStartStatus === 1 && result.currentQuestionIndex > quizState.currentQuestionIndex) {
                        // Admin has allowed next question - move to it
                        quizState.currentQuestionIndex = result.currentQuestionIndex;
                        
                        // If we're past the last question, end the quiz
                        if (quizState.currentQuestionIndex >= quizState.questions.length) {
                            endQuiz();
                        } else {
                            // Default to open when displaying new question
                            quizState.currentQuestionOpen = true;
                            // Pause state checking for 5 seconds after displaying new question
                            quizState.pauseStateCheckUntil = Date.now() + 5000;
                            // Display the new question
                            displayQuestion();
                        }
                        return; // Don't update status for new question, it defaults to open
                    }
                    
                    // Only update question open state if we're not in the pause period
                    // During pause, keep it as open (default)
                    // Only update if game start status is 1
                    if (gameStartStatus === 1 && now >= quizState.pauseStateCheckUntil) {
                        const wasOpen = quizState.currentQuestionOpen;
                        quizState.currentQuestionOpen = result.isOpen;
                        
                        // Update UI if state changed
                        if (wasOpen !== result.isOpen) {
                            updateQuestionStatusDisplay();
                        }
                    }
                }
            }
        } catch (error) {
            // Silently fail - don't interrupt the user experience
        }
    }

    // Update question status display
    function updateQuestionStatusDisplay() {
        const statusEl = document.getElementById('quiz-question-status');
        const answersContainer = document.getElementById('quiz-answers');
        const waitingMessage = document.getElementById('quiz-waiting-message');
        
        if (!quizState.currentQuestionOpen) {
            // Question is closed
            if (statusEl) {
                statusEl.style.display = 'block';
            }
            if (answersContainer) {
                const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
                buttons.forEach(btn => {
                    if (!btn.disabled) {
                        btn.style.opacity = '0.6';
                        btn.title = 'Question is closed - answers will receive 0 points';
                    }
                });
            }
        } else {
            // Question is open
            if (statusEl) {
                statusEl.style.display = 'none';
            }
            if (answersContainer) {
                const buttons = answersContainer.querySelectorAll('.quiz-answer-btn');
                buttons.forEach(btn => {
                    btn.style.opacity = '1';
                    btn.title = '';
                });
            }
        }
        
        // Show waiting message if we're waiting for next question
        if (waitingMessage && quizState.currentQuestionIndex >= quizState.questions.length - 1) {
            // Check if we're on the last question and waiting
            waitingMessage.style.display = 'block';
        } else if (waitingMessage) {
            waitingMessage.style.display = 'none';
        }
    }


    // Show specific section
    function showSection(sectionId) {
        const sections = ['quiz-registration', 'quiz-rules', 'quiz-waiting', 'quiz-player', 'quiz-results'];
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

