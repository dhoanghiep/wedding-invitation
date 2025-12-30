// Leaderboard JavaScript Module
(function () {
    'use strict';

    // Leaderboard state
    const leaderboardState = {
        leaderboard: [],
        refreshInterval: null,
        refreshIntervalMs: 2000 // Refresh every 2 seconds
    };

    // Initialize leaderboard
    function initLeaderboard() {
        setupEventListeners();
        loadLeaderboard();
        startAutoRefresh();
    }

    // Set up event listeners
    function setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadLeaderboard();
            });
        }
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

    // Load leaderboard (silent background refresh)
    async function loadLeaderboard() {
        const leaderboardEl = document.getElementById('leaderboard');
        const countEl = document.getElementById('leaderboard-count');
        const isEmpty = !leaderboardEl || leaderboardEl.innerHTML === '';

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
            
            if (fetchResult.corsError) {
                // CORS error - can't read response
                if (leaderboardEl && isEmpty) {
                    leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">Unable to load leaderboard</div>';
                }
                if (countEl) countEl.textContent = '-';
                return;
            }
            
            const result = fetchResult.data;
            if (result && result.success && result.leaderboard) {
                leaderboardState.leaderboard = result.leaderboard;
                displayLeaderboard(result.leaderboard);
                if (countEl) countEl.textContent = result.leaderboard.length.toString();
            } else {
                leaderboardState.leaderboard = [];
                if (leaderboardEl && isEmpty) {
                    leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">No leaderboard data available</div>';
                }
                if (countEl) countEl.textContent = '0';
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            if (leaderboardEl && isEmpty) {
                leaderboardEl.innerHTML = '<div class="admin-leaderboard-empty">Error loading leaderboard</div>';
            }
            if (countEl) countEl.textContent = '0';
        }
    }

    // Display leaderboard (audience-friendly version - no email addresses)
    function displayLeaderboard(leaderboard) {
        const leaderboardEl = document.getElementById('leaderboard');
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

    // Start auto-refresh
    function startAutoRefresh() {
        // Clear any existing interval
        if (leaderboardState.refreshInterval) {
            clearInterval(leaderboardState.refreshInterval);
        }
        
        // Set up new interval
        leaderboardState.refreshInterval = setInterval(() => {
            loadLeaderboard();
        }, leaderboardState.refreshIntervalMs);
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (leaderboardState.refreshInterval) {
            clearInterval(leaderboardState.refreshInterval);
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLeaderboard);
    } else {
        initLeaderboard();
    }
})();

