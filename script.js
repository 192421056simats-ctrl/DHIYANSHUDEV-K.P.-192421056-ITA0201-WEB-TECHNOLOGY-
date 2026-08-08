/**
 * Web Technology Laboratory Experiments - Suite Portal Engine
 * Handles Navigation, Iframe Embedding, Live Search & Theme Syncing
 */

class SuitePortal {
    constructor() {
        this.activeUrl = null;

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.searchInput = document.getElementById('searchInput');

        this.expNavList = document.getElementById('expNavList');
        this.navItems = document.querySelectorAll('.exp-nav-item');

        this.activeTitle = document.getElementById('activeExpTitle');
        this.openNewTabBtn = document.getElementById('openNewTabBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');

        this.gridHubView = document.getElementById('gridHubView');
        this.iframeViewContainer = document.getElementById('iframeViewContainer');
        this.experimentIframe = document.getElementById('experimentIframe');

        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.themeIcon = document.getElementById('themeIcon');
        this.themeLabel = document.getElementById('themeLabel');
    }

    bindEvents() {
        // Toggle Sidebar Desktop
        this.toggleSidebarBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
            this.toggleSidebarBtn.textContent = this.sidebar.classList.contains('collapsed') ? '▶' : '◀';
        });

        // Mobile Menu Drawer
        this.mobileMenuBtn.addEventListener('click', () => {
            this.sidebar.classList.toggle('mobile-open');
        });

        // Search Filter
        this.searchInput.addEventListener('input', (e) => this.filterExperiments(e.target.value.toLowerCase()));

        // Nav Item Click
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetExp = item.dataset.exp;
                const url = item.dataset.url;
                const title = item.querySelector('.exp-title').textContent;

                this.navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                if (targetExp === 'grid') {
                    this.showGridHub();
                } else {
                    this.launchExp(url, title);
                }

                // Close mobile drawer if open
                this.sidebar.classList.remove('mobile-open');
            });
        });

        // Action Buttons
        this.openNewTabBtn.addEventListener('click', () => {
            if (this.activeUrl) {
                window.open(this.activeUrl, '_blank');
            }
        });

        this.fullscreenBtn.addEventListener('click', () => {
            if (this.iframeViewContainer.requestFullscreen) {
                this.iframeViewContainer.requestFullscreen();
            } else if (this.iframeViewContainer.webkitRequestFullscreen) {
                this.iframeViewContainer.webkitRequestFullscreen();
            }
        });

        // Theme Toggle
        this.themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            if (isDark) {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                this.themeIcon.textContent = '☀️';
                this.themeLabel.textContent = 'Light Mode';
            } else {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                this.themeIcon.textContent = '🌙';
                this.themeLabel.textContent = 'Dark Mode';
            }
        });
    }

    launchExp(url, title) {
        this.activeUrl = url;
        this.activeTitle.textContent = title;

        this.gridHubView.classList.add('hidden');
        this.iframeViewContainer.classList.remove('hidden');
        this.experimentIframe.src = url;

        this.openNewTabBtn.style.display = 'inline-block';
        this.fullscreenBtn.style.display = 'inline-block';

        // Update nav active state
        this.navItems.forEach(item => {
            if (item.dataset.url === url) item.classList.add('active');
            else item.classList.remove('active');
        });
    }

    showGridHub() {
        this.activeUrl = null;
        this.activeTitle.textContent = 'All Experiments Hub';

        this.iframeViewContainer.classList.add('hidden');
        this.experimentIframe.src = 'about:blank';
        this.gridHubView.classList.remove('hidden');

        this.openNewTabBtn.style.display = 'none';
        this.fullscreenBtn.style.display = 'none';
    }

    filterExperiments(query) {
        const cards = document.querySelectorAll('.exp-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        this.navItems.forEach(item => {
            if (item.dataset.exp === 'grid') return;
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

let portal;
document.addEventListener('DOMContentLoaded', () => {
    portal = new SuitePortal();
});
