/**
 * COURSE: WEB TECHNOLOGY (ITA02_WEB)
 * UNIT II SKILL DEVELOPMENT LABORATORY ASSESSMENT
 * STUDENT: DHIYANSHU DEV K.P. | REGISTER NO: 192421056
 * INSTITUTION: SIMATS UNIVERSITY, CHENNAI
 * JAVASCRIPT ENGINE (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    initFormHandler();
    initThemeToggle();
});

/**
 * Event Card Selector Function (Populates registration form dropdown)
 */
function selectEvent(eventName) {
    const eventSelect = document.getElementById('eventSelect');
    if (eventSelect) {
        eventSelect.value = eventName;
        
        // Scroll smoothly to registration section
        const regSection = document.getElementById('registration');
        if (regSection) {
            regSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Highlight dropdown field briefly
        eventSelect.style.borderColor = '#6366f1';
        setTimeout(() => {
            eventSelect.style.borderColor = '';
        }, 1500);
    }
}

/**
 * Form Validation & Modal Trigger Engine
 */
function initFormHandler() {
    const form = document.getElementById('registration-form');
    const modal = document.getElementById('successModal');
    const modalDetails = document.getElementById('modalDetails');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('studentName').value.trim();
        const regNo = document.getElementById('registerNo').value.trim();
        const department = document.getElementById('department').value;
        const email = document.getElementById('email').value.trim();
        const selectedEvent = document.getElementById('eventSelect').value;

        // Validation Checks
        let isValid = true;

        if (!name) {
            showError('nameError', 'Please enter your full name.');
            isValid = false;
        } else {
            clearError('nameError');
        }

        if (!regNo) {
            showError('regError', 'Please enter your register number.');
            isValid = false;
        } else {
            clearError('regError');
        }

        if (!department) {
            showError('deptError', 'Please select your department.');
            isValid = false;
        } else {
            clearError('deptError');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError('emailError');
        }

        if (!selectedEvent) {
            showError('eventError', 'Please select an event to register.');
            isValid = false;
        } else {
            clearError('eventError');
        }

        if (isValid) {
            // Populate Modal Summary
            modalDetails.innerHTML = `
                <p><strong>Candidate Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Register Number:</strong> ${escapeHtml(regNo)}</p>
                <p><strong>Department:</strong> ${escapeHtml(department)}</p>
                <p><strong>Email Address:</strong> ${escapeHtml(email)}</p>
                <p><strong>Registered Event:</strong> <span style="color: #6366f1; font-weight: bold;">${escapeHtml(selectedEvent)}</span></p>
                <p><strong>Status:</strong> Confirmed & Ticket Issued</p>
            `;
            modal.classList.add('active');
        }
    });

    function showError(elementId, msg) {
        const el = document.getElementById(elementId);
        if (el) el.textContent = msg;
    }

    function clearError(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.textContent = '';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Dark / Light Theme Switcher Engine
 */
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeBtn.textContent = '☀️ Light Mode';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeBtn.textContent = '🌙 Dark Mode';
        }
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
