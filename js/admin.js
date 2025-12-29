// Admin Panel JavaScript Module
(function () {
    'use strict';

    // Admin state
    const adminState = {
        activeSessions: [],
        leaderboard: [],
        currentQuestion: null,
        refreshInterval: null
    };

    // Initialize admin panel
    function initAdmin() {
        setupEventListeners();
        loadData();
        loadGameStatus();
        loadActiveSessions();
        loadLeaderboard();
    }

    // Helper function to handle fetch with CORS error handling
    async function fetchWithCorsHandling(url, options) {
        try {
            const response = await fetch(url, options);
            
            // Try to read response
            try {
                if (!response.ok && response.status !== 0) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                return { success: true, data: result, corsError: false };
            } catch (readError) {
                // CORS error - can't read response but request likely succeeded
                return { success: true, data: null, corsError: true };
            }
        } catch (error) {
            // Network/CORS error - request may have still succeeded on server
            if (error.name === 'TypeError' && (error.message.includes('Failed to fetch') || error.message.includes('CORS'))) {
                // CORS/network error - assume request succeeded on server
                return { success: true, data: null, corsError: true };
            }
            throw error;
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            });
        }

        const startGameBtn = document.getElementById('start-game-btn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                startGame();
            });
        }

        const restartGameBtn = document.getElementById('restart-game-btn');
        if (restartGameBtn) {
            restartGameBtn.addEventListener('click', () => {
                restartGame();
            });
        }

        const closeQuestionBtn = document.getElementById('close-question-btn');
        if (closeQuestionBtn) {
            closeQuestionBtn.addEventListener('click', () => {
                closeCurrentQuestion();
            });
        }

        const nextQuestionBtn = document.getElementById('next-question-btn');
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                nextQuestion();
            });
        }
    }

    // Start game (move all sessions to first question, set status to OPEN)
    async function startGame() {
        const startGameBtn = document.getElementById('start-game-btn');
        const messageEl = document.getElementById('admin-game-message');
        
        if (startGameBtn) {
            startGameBtn.disabled = true;
            startGameBtn.innerHTML = '<span class="btn-icon">⏳</span> Starting...';
        }

        if (messageEl) {
            messageEl.className = 'admin-message info';
            messageEl.textContent = 'Starting game - moving all sessions to first question...';
            messageEl.style.display = 'block';
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            // Go to question 0 (first question)
            const formData = new URLSearchParams();
            formData.append('action', 'goToQuestion');
            formData.append('questionIndex', '0');

            // Use no-cors mode to avoid CORS errors
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).catch(() => {
                // Silently ignore - request was sent
            });
            
            // Wait a bit then refresh to show updated status
            setTimeout(() => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            }, 1000);
            
            if (messageEl) {
                messageEl.className = 'admin-message success';
                messageEl.textContent = 'Game started! All sessions moved to question 1 (status: OPEN).';
            }
        } catch (error) {
            console.error('Error starting game:', error);
            if (messageEl) {
                messageEl.className = 'admin-message error';
                messageEl.textContent = `Error: ${error.message || 'Failed to start game'}`;
            }
        } finally {
            if (startGameBtn) {
                startGameBtn.disabled = false;
                startGameBtn.innerHTML = '<span class="btn-icon">🚀</span> Start Game';
            }
        }
    }

    // Restart game (move all sessions to first question, set status to OPEN)
    async function restartGame() {
        const restartGameBtn = document.getElementById('restart-game-btn');
        const messageEl = document.getElementById('admin-game-message');
        
        if (restartGameBtn) {
            restartGameBtn.disabled = true;
            restartGameBtn.innerHTML = '<span class="btn-icon">⏳</span> Restarting...';
        }

        if (messageEl) {
            messageEl.className = 'admin-message info';
            messageEl.textContent = 'Restarting game - moving all sessions to first question...';
            messageEl.style.display = 'block';
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            // Go to question 0 (first question) - mark as restart to reset completed sessions
            const formData = new URLSearchParams();
            formData.append('action', 'goToQuestion');
            formData.append('questionIndex', '0');
            formData.append('restartGame', 'true');

            // Use no-cors mode to avoid CORS errors
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).catch(() => {
                // Silently ignore - request was sent
            });
            
            // Wait a bit then refresh to show updated status
            setTimeout(() => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            }, 1000);
            
            if (messageEl) {
                messageEl.className = 'admin-message success';
                messageEl.textContent = 'Game restarted! All sessions moved to question 1 (status: OPEN).';
            }
        } catch (error) {
            console.error('Error restarting game:', error);
            if (messageEl) {
                messageEl.className = 'admin-message error';
                messageEl.textContent = `Error: ${error.message || 'Failed to restart game'}`;
            }
        } finally {
            if (restartGameBtn) {
                restartGameBtn.disabled = false;
                restartGameBtn.innerHTML = '<span class="btn-icon">🔄</span> Restart Game';
            }
        }
    }

    // Next question (advance all sessions to next question)
    async function nextQuestion() {
        const nextQuestionBtn = document.getElementById('next-question-btn');
        const messageEl = document.getElementById('admin-message');
        
        if (nextQuestionBtn) {
            nextQuestionBtn.disabled = true;
            nextQuestionBtn.innerHTML = '<span class="btn-icon">⏳</span> Processing...';
        }

        if (messageEl) {
            messageEl.className = 'admin-message info';
            messageEl.textContent = 'Advancing to next question...';
            messageEl.style.display = 'block';
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'allowNextQuestion');

            // Use no-cors mode to avoid CORS errors
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).catch(() => {
                // Silently ignore - request was sent
            });
            
            // Refresh data immediately and then again after delay to ensure updates are shown
            loadData();
            loadGameStatus();
            loadActiveSessions();
            loadLeaderboard();
            
            // Refresh again after delay to catch any backend updates
            setTimeout(() => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            }, 1500);
            
            // One more refresh after longer delay to ensure everything is updated
            setTimeout(() => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            }, 3000);
            
            if (messageEl) {
                messageEl.className = 'admin-message success';
                messageEl.textContent = 'Request sent. All sessions should advance to next question.';
            }
        } catch (error) {
            console.error('Error advancing to next question:', error);
            if (messageEl) {
                messageEl.className = 'admin-message error';
                messageEl.textContent = `Error: ${error.message || 'Failed to advance question'}`;
            }
        } finally {
            if (nextQuestionBtn) {
                nextQuestionBtn.disabled = false;
                nextQuestionBtn.innerHTML = '<span class="btn-icon">⏭️</span> Next Question';
            }
        }
    }

    // Load all data
    async function loadData() {
        await Promise.all([
            loadCurrentQuestion(),
            loadGameStatus()
        ]);
    }

    // Load active sessions
    async function loadActiveSessions() {
        const loadingEl = document.getElementById('sessions-loading');
        const listEl = document.getElementById('active-sessions-list');
        const countEl = document.getElementById('active-sessions-count');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (listEl) listEl.innerHTML = '';

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'getActiveSessions');

            // Try to fetch, but handle CORS errors gracefully
            let fetchResult;
            try {
                fetchResult = await fetchWithCorsHandling(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });
            } catch (error) {
                // If fetch completely fails due to CORS, return CORS error state
                fetchResult = { success: true, data: null, corsError: true };
            }
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (fetchResult.corsError) {
                // CORS error - can't read response
                if (listEl) {
                    listEl.innerHTML = '<div class="admin-sessions-empty">Unable to load (CORS error)</div>';
                }
                if (countEl) countEl.textContent = '-';
                return;
            }
            
            const result = fetchResult.data;
            if (result && result.success && result.sessions) {
                adminState.activeSessions = result.sessions;
                displayActiveSessions(result.sessions);
                if (countEl) countEl.textContent = result.sessions.length.toString();
            } else {
                adminState.activeSessions = [];
                if (listEl) {
                    listEl.innerHTML = '<div class="admin-sessions-empty">No active sessions</div>';
                }
                if (countEl) countEl.textContent = '0';
            }
        } catch (error) {
            console.error('Error loading active sessions:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (listEl) {
                listEl.innerHTML = '<div class="admin-sessions-empty">Error loading active sessions</div>';
            }
            if (countEl) countEl.textContent = '0';
        }
    }

    // Display active sessions (simplified - just names)
    function displayActiveSessions(sessions) {
        const listEl = document.getElementById('active-sessions-list');
        if (!listEl) return;

        if (sessions.length === 0) {
            listEl.innerHTML = '<div class="admin-sessions-empty">No active sessions</div>';
            return;
        }

        let html = '';
        sessions.forEach((session) => {
            html += `
                <div class="admin-session-item">
                    <div class="admin-session-name">${escapeHtml(session.name || 'Anonymous')}</div>
                </div>
            `;
        });

        listEl.innerHTML = html;
    }

    // Load leaderboard
    async function loadLeaderboard() {
        const loadingEl = document.getElementById('leaderboard-loading');
        const leaderboardEl = document.getElementById('admin-leaderboard');
        const countEl = document.getElementById('leaderboard-count');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (leaderboardEl) leaderboardEl.innerHTML = '';

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'getLeaderboard');

            const fetchResult = await fetchWithCorsHandling(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (fetchResult.corsError) {
                // CORS error - can't read response
                if (leaderboardEl) {
                    leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">Unable to load (CORS error)</div>';
                }
                if (countEl) countEl.textContent = '-';
                return;
            }
            
            const result = fetchResult.data;
            if (result && result.success && result.leaderboard) {
                adminState.leaderboard = result.leaderboard;
                displayLeaderboard(result.leaderboard);
                if (countEl) countEl.textContent = result.leaderboard.length.toString();
            } else {
                adminState.leaderboard = [];
                if (leaderboardEl) {
                    leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">No leaderboard data available</div>';
                }
                if (countEl) countEl.textContent = '0';
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (leaderboardEl) {
                leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">Error loading leaderboard</div>';
            }
            if (countEl) countEl.textContent = '0';
        }
    }

    // Display leaderboard
    function displayLeaderboard(leaderboard) {
        const leaderboardEl = document.getElementById('admin-leaderboard');
        if (!leaderboardEl) return;

        if (leaderboard.length === 0) {
            leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">No leaderboard data available</div>';
            return;
        }

        let html = '';
        leaderboard.forEach((entry, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
            
            html += `
                <div class="admin-leaderboard-item">
                    <div class="admin-leaderboard-rank">
                        ${medal} <span class="rank-number">${rank}</span>
                    </div>
                    <div class="admin-leaderboard-info">
                        <div class="admin-leaderboard-name">${escapeHtml(entry.name || 'Anonymous')}</div>
                        <div class="admin-leaderboard-details">
                            <span>Email: ${escapeHtml(entry.email || 'N/A')}</span>
                            <span>•</span>
                            <span>${entry.correctAnswers || 0}/${entry.totalQuestions || 0} correct</span>
                        </div>
                    </div>
                    <div class="admin-leaderboard-score">
                        ${entry.totalScore || 0}
                    </div>
                </div>
            `;
        });

        leaderboardEl.innerHTML = html;
    }

    // Load game status
    async function loadGameStatus() {
        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'getCurrentQuestion');

            const fetchResult = await fetchWithCorsHandling(scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });
            
            if (fetchResult.corsError) {
                updateGameStatusDisplay(null);
                return;
            }
            
            const result = fetchResult.data;
            if (result && result.success) {
                // Ensure we have a valid gameStartStatus value
                const gameStartStatus = result.gameStartStatus !== undefined && result.gameStartStatus !== null 
                    ? result.gameStartStatus 
                    : 0; // Default to 0 if not provided
                updateGameStatusDisplay(gameStartStatus);
            } else {
                // Don't update to null - keep current state if fetch fails
                // updateGameStatusDisplay(null);
            }
        } catch (error) {
            console.error('Error loading game status:', error);
            updateGameStatusDisplay(null);
        }
    }

    // Update game status display
    function updateGameStatusDisplay(gameStartStatus) {
        const statusEl = document.getElementById('admin-game-start-status');
        if (!statusEl) return;
        
        // Handle null, undefined, or empty string - default to 0 (not started)
        if (gameStartStatus === null || gameStartStatus === undefined || gameStartStatus === '') {
            statusEl.textContent = 'Not Started (0)';
            statusEl.className = 'admin-status-value not-started';
            return;
        }
        
        // Parse the status - handle string "0", "1" or number 0, 1
        const status = parseInt(gameStartStatus);
        // Check for NaN after parseInt
        if (isNaN(status)) {
            statusEl.textContent = 'Not Started (0)';
            statusEl.className = 'admin-status-value not-started';
            return;
        }
        
        if (status === 1) {
            statusEl.textContent = 'Started (1)';
            statusEl.className = 'admin-status-value started';
        } else {
            statusEl.textContent = 'Not Started (0)';
            statusEl.className = 'admin-status-value not-started';
        }
    }

    // Load current question
    async function loadCurrentQuestion() {
        const loadingEl = document.getElementById('question-loading');
        const questionTextEl = document.getElementById('admin-question-text');
        const questionIndexEl = document.getElementById('admin-question-index');
        const questionStatusEl = document.getElementById('admin-question-status');
        
        if (loadingEl) loadingEl.style.display = 'block';

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'getCurrentQuestion');

            // Try to fetch, but handle CORS errors gracefully
            let fetchResult;
            try {
                fetchResult = await fetchWithCorsHandling(scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });
            } catch (error) {
                // If fetch completely fails due to CORS, return CORS error state
                fetchResult = { success: true, data: null, corsError: true };
            }
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (fetchResult.corsError) {
                // CORS error - can't read response, show default state
                if (questionTextEl) questionTextEl.textContent = 'Unable to verify (CORS)';
                if (questionIndexEl) questionIndexEl.textContent = 'Question: -';
                if (questionStatusEl) {
                    questionStatusEl.textContent = 'Status: Unknown';
                    questionStatusEl.className = 'admin-question-status';
                }
                return;
            }
            
            const result = fetchResult.data;
            if (result && result.success) {
                adminState.currentQuestion = result;
                
                if (questionTextEl) {
                    questionTextEl.textContent = result.currentQuestionText || 'No question active';
                }
                
                if (questionIndexEl) {
                    questionIndexEl.textContent = `Question: ${result.currentQuestionIndex + 1}`;
                }
                
                if (questionStatusEl) {
                    const status = result.questionStatus || 'CLOSED';
                    questionStatusEl.textContent = `Status: ${status}`;
                    questionStatusEl.className = `admin-question-status ${status.toLowerCase()}`;
                }
                
                // Also update game status when loading question
                // Ensure we have a valid gameStartStatus value
                const gameStartStatus = result.gameStartStatus !== undefined && result.gameStartStatus !== null 
                    ? result.gameStartStatus 
                    : 0; // Default to 0 if not provided
                updateGameStatusDisplay(gameStartStatus);
            } else {
                if (questionTextEl) questionTextEl.textContent = 'Error loading question';
            }
        } catch (error) {
            console.error('Error loading current question:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (questionTextEl) questionTextEl.textContent = 'Error loading question';
        }
    }


    // Close current question
    async function closeCurrentQuestion() {
        const closeBtn = document.getElementById('close-question-btn');
        const messageEl = document.getElementById('admin-message');
        
        if (closeBtn) {
            closeBtn.disabled = true;
            closeBtn.innerHTML = '<span class="btn-icon">⏳</span> Processing...';
        }

        if (messageEl) {
            messageEl.className = 'admin-message info';
            messageEl.textContent = 'Closing current question...';
            messageEl.style.display = 'block';
        }

        try {
            const config = typeof CONFIG !== 'undefined' && CONFIG.QUIZ_CONFIG 
                ? CONFIG.QUIZ_CONFIG 
                : { GOOGLE_SCRIPT_URL: CONFIG.GOOGLE_SCRIPT_URL };

            const scriptUrl = config.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL;
            
            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const formData = new URLSearchParams();
            formData.append('action', 'closeCurrentQuestion');

            // Use no-cors mode to avoid CORS errors (we don't need to read response for write operations)
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).catch(() => {
                // Silently ignore - request was sent
            });
            
            // Wait a bit then refresh to show updated status
            setTimeout(() => {
                loadData();
                loadGameStatus();
                loadActiveSessions();
                loadLeaderboard();
            }, 1000);
            
            if (messageEl) {
                messageEl.className = 'admin-message success';
                messageEl.textContent = 'Request sent. Current question should be closed. Answers submitted after this time will receive 0 points.';
            }
        } catch (error) {
            console.error('Error closing question:', error);
            if (messageEl) {
                messageEl.className = 'admin-message error';
                messageEl.textContent = `Error: ${error.message || 'Failed to close question'}`;
            }
        } finally {
            if (closeBtn) {
                closeBtn.disabled = false;
                closeBtn.innerHTML = '<span class="btn-icon">🔒</span> Lock Question';
            }
        }
    }


    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (adminState.refreshInterval) {
            clearInterval(adminState.refreshInterval);
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdmin);
    } else {
        initAdmin();
    }
})();

