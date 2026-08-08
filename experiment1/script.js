/**
 * Experiment 1: Responsive Student Profile Webpage
 * Core JavaScript Logic: Modular Tab Navigation & Theme Toggle Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initializer
    initTabNavigation();
    initThemeToggle();
});

/**
 * Handles Tab Navigation Switching with active state management
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // Deactivate all buttons & panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activate current button & targeted panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/**
 * Theme Switching Module (Dark / Light Mode with LocalStorage Support)
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    const themeText = themeToggleBtn.querySelector('.theme-text');
    const body = document.body;

    // Load saved preference or default to dark
    const savedTheme = localStorage.getItem('profile_theme') || 'dark';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const isCurrentDark = body.classList.contains('dark-theme');
        const newTheme = isCurrentDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('profile_theme', newTheme);
    });

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }
}
