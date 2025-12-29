// Admin Panel JavaScript Module
(function () {
    'use strict';

    // Admin state
    const adminState = {
        activeSessions: [],
        leaderboard: [],
        refreshInterval: null
    };

    // Initialize admin panel
    function initAdmin() {
        setupEventListeners();
        loadData();
        
        // Auto-refresh every 5 seconds
        adminState.refreshInterval = setInterval(() => {
            loadData();
        }, 5000);
    }

    // Set up event listeners
    function setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadData();
            });
        }

        const forceNextBtn = document.getElementById('force-next-btn');
        if (forceNextBtn) {
            forceNextBtn.addEventListener('click', () => {
                forceAllSessionsNext();
            });
        }
    }

    // Load all data
    async function loadData() {
        await Promise.all([
            loadActiveSessions(),
            loadLeaderboard()
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
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (result.success && result.sessions) {
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

    // Display active sessions
    function displayActiveSessions(sessions) {
        const listEl = document.getElementById('active-sessions-list');
        if (!listEl) return;

        if (sessions.length === 0) {
            listEl.innerHTML = '<div class="admin-sessions-empty">No active sessions</div>';
            return;
        }

        let html = '';
        sessions.forEach((session) => {
            const progress = session.totalQuestions > 0 
                ? Math.round((session.currentQuestionIndex / session.totalQuestions) * 100)
                : 0;
            
            const startTime = new Date(session.startTime);
            const timeElapsed = Math.floor((Date.now() - startTime.getTime()) / 1000 / 60); // minutes
            
            html += `
                <div class="admin-session-item">
                    <div class="admin-session-info">
                        <div class="admin-session-name">${escapeHtml(session.name || 'Anonymous')}</div>
                        <div class="admin-session-details">
                            <div class="admin-session-detail">
                                <span class="admin-session-detail-label">Email:</span>
                                <span>${escapeHtml(session.email || 'N/A')}</span>
                            </div>
                            <div class="admin-session-detail">
                                <span class="admin-session-detail-label">Session:</span>
                                <span>${escapeHtml(session.sessionId || 'N/A')}</span>
                            </div>
                            <div class="admin-session-detail">
                                <span class="admin-session-detail-label">Time:</span>
                                <span>${timeElapsed} min</span>
                            </div>
                        </div>
                    </div>
                    <div class="admin-session-progress">
                        <div class="admin-session-progress-bar">
                            <div class="admin-session-progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="admin-session-progress-text">
                            Question ${session.currentQuestionIndex + 1} / ${session.totalQuestions}
                        </div>
                    </div>
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
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (result.success && result.leaderboard) {
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

    // Force all sessions to next question
    async function forceAllSessionsNext() {
        const forceNextBtn = document.getElementById('force-next-btn');
        const messageEl = document.getElementById('admin-message');
        
        if (forceNextBtn) {
            forceNextBtn.disabled = true;
            forceNextBtn.textContent = 'Processing...';
        }

        if (messageEl) {
            messageEl.className = 'admin-message info';
            messageEl.textContent = 'Forcing all active sessions to next question...';
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
            formData.append('action', 'forceNextQuestion');

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
                if (messageEl) {
                    messageEl.className = 'admin-message success';
                    messageEl.textContent = `Successfully advanced ${result.advancedCount || 0} session(s) to next question.`;
                }
                
                // Refresh data after a short delay
                setTimeout(() => {
                    loadData();
                }, 1000);
            } else {
                throw new Error(result.error || 'Failed to force next question');
            }
        } catch (error) {
            console.error('Error forcing next question:', error);
            if (messageEl) {
                messageEl.className = 'admin-message error';
                messageEl.textContent = `Error: ${error.message || 'Failed to force next question'}`;
            }
        } finally {
            if (forceNextBtn) {
                forceNextBtn.disabled = false;
                forceNextBtn.innerHTML = '<span class="btn-icon">⏭️</span> Force All Sessions to Next Question';
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

