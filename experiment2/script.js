/**
 * Experiment 2: Student Registration Form with Validation
 * Core JavaScript: Real-time Regex, Password Strength Meter, and Age Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    initPasswordToggle();
    initThemeToggle();
});

/**
 * Main Validation Engine
 */
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const modalSummary = document.getElementById('modalSummary');
    const fillSampleBtn = document.getElementById('fillSampleBtn');

    if (fillSampleBtn) {
        fillSampleBtn.addEventListener('click', () => {
            fields.fullName.value = 'Dhiyanshu Dev K.P.';
            fields.rollNumber.value = '192421056';
            fields.registerNumber.value = '192421056001';
            fields.email.value = '192421056.simats@saveetha.com';
            fields.phone.value = '6379691518';
            fields.dob.value = '2003-05-20';
            fields.gender.value = 'Male';
            fields.department.value = 'Information Technology';
            fields.semester.value = 'Sem 6';
            fields.address.value = 'SIMATS University Campus, Chennai, Tamil Nadu, India';
            fields.password.value = 'Dhiyanshu@2026';
            fields.confirmPassword.value = 'Dhiyanshu@2026';
            fields.terms.checked = true;

            Object.keys(fields).forEach(key => validateField(key));
            checkPasswordStrength(fields.password.value);
        });
    }

    // Input elements
    const fields = {
        fullName: document.getElementById('fullName'),
        rollNumber: document.getElementById('rollNumber'),
        registerNumber: document.getElementById('registerNumber'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        dob: document.getElementById('dob'),
        gender: document.getElementById('gender'),
        department: document.getElementById('department'),
        semester: document.getElementById('semester'),
        address: document.getElementById('address'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    // Attach real-time input / change listeners
    Object.keys(fields).forEach(key => {
        const input = fields[key];
        if (!input) return;

        const eventType = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            validateField(key);
        });

        input.addEventListener('blur', () => {
            validateField(key);
        });
    });

    // Real-time Password Strength Meter listener
    fields.password.addEventListener('input', () => {
        checkPasswordStrength(fields.password.value);
        if (fields.confirmPassword.value) {
            validateField('confirmPassword');
        }
    });

    // Form Submission Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isAllValid = true;
        Object.keys(fields).forEach(key => {
            const isValid = validateField(key);
            if (!isValid) isAllValid = false;
        });

        if (isAllValid) {
            // Populate modal summary
            modalSummary.innerHTML = `
                <p><strong>Student Name:</strong> ${escapeHtml(fields.fullName.value)}</p>
                <p><strong>Roll Number:</strong> ${escapeHtml(fields.rollNumber.value)}</p>
                <p><strong>Register Number:</strong> ${escapeHtml(fields.registerNumber.value)}</p>
                <p><strong>Email:</strong> ${escapeHtml(fields.email.value)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(fields.phone.value)}</p>
                <p><strong>DOB:</strong> ${escapeHtml(fields.dob.value)}</p>
                <p><strong>Department:</strong> ${escapeHtml(fields.department.value)}</p>
                <p><strong>Semester:</strong> ${escapeHtml(fields.semester.value)}</p>
            `;
            successModal.classList.add('active');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        form.reset();
        clearAllValidations();
    });

    /**
     * Validates individual field by key name
     */
    function validateField(key) {
        const input = fields[key];
        const group = input.closest('.form-group');
        const errorElement = document.getElementById(`${key}Error`);
        let errorMessage = '';

        const value = input.value.trim();

        switch (key) {
            case 'fullName':
                if (!value) errorMessage = 'Full Name is required.';
                else if (value.length < 3) errorMessage = 'Name must be at least 3 characters.';
                break;

            case 'rollNumber':
                if (!value) errorMessage = 'Roll Number is required.';
                break;

            case 'registerNumber':
                if (!value) errorMessage = 'Register Number is required.';
                else if (!/^\d{12}$/.test(value)) errorMessage = 'Must be exactly 12 digits.';
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) errorMessage = 'Email is required.';
                else if (!emailRegex.test(value)) errorMessage = 'Enter a valid email address (e.g. name@domain.com).';
                break;

            case 'phone':
                const phoneRegex = /^[0-9]{10}$/;
                if (!value) errorMessage = 'Phone number is required.';
                else if (!phoneRegex.test(value)) errorMessage = 'Enter a valid 10-digit mobile number.';
                break;

            case 'dob':
                if (!value) {
                    errorMessage = 'Date of Birth is required.';
                } else {
                    const age = calculateAge(value);
                    if (age < 17) {
                        errorMessage = `Age must be at least 17 years old. Current calculated age: ${age}.`;
                    }
                }
                break;

            case 'gender':
                if (!value) errorMessage = 'Please select your gender.';
                break;

            case 'department':
                if (!value) errorMessage = 'Please select your department.';
                break;

            case 'semester':
                if (!value) errorMessage = 'Please select your semester.';
                break;

            case 'address':
                if (!value) errorMessage = 'Address is required.';
                else if (value.length < 10) errorMessage = 'Address must be at least 10 characters.';
                break;

            case 'password':
                if (!value) errorMessage = 'Password is required.';
                else if (value.length < 8) errorMessage = 'Password must be at least 8 characters.';
                break;

            case 'confirmPassword':
                if (!value) errorMessage = 'Please confirm your password.';
                else if (value !== fields.password.value) errorMessage = 'Passwords do not match.';
                break;

            case 'terms':
                if (!input.checked) errorMessage = 'You must accept the terms and conditions.';
                break;
        }

        if (errorMessage) {
            group.classList.remove('valid');
            group.classList.add('invalid');
            if (errorElement) errorElement.textContent = errorMessage;
            return false;
        } else {
            group.classList.remove('invalid');
            group.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
            return true;
        }
    }

    function clearAllValidations() {
        Object.keys(fields).forEach(key => {
            const group = fields[key].closest('.form-group');
            if (group) {
                group.classList.remove('valid', 'invalid');
            }
            const err = document.getElementById(`${key}Error`);
            if (err) err.textContent = '';
        });
        document.getElementById('strengthBar').style.width = '0%';
        document.getElementById('strengthText').textContent = 'Password Strength';
    }
}

/**
 * Calculates exact age in years from Date of Birth
 */
function calculateAge(dobString) {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 * Evaluates password complexity and updates the visual meter
 */
function checkPasswordStrength(password) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');

    if (!password) {
        bar.style.width = '0%';
        text.textContent = 'Password Strength';
        return;
    }

    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    bar.style.width = `${score}%`;

    if (score < 40) {
        bar.style.backgroundColor = '#ef4444';
        text.textContent = 'Strength: Weak';
        text.style.color = '#ef4444';
    } else if (score < 75) {
        bar.style.backgroundColor = '#f59e0b';
        text.textContent = 'Strength: Moderate';
        text.style.color = '#f59e0b';
    } else {
        bar.style.backgroundColor = '#10b981';
        text.textContent = 'Strength: Strong';
        text.style.color = '#10b981';
    }
}

/**
 * Password Visibility Toggle
 */
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-pass-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            if (targetInput) {
                const isPass = targetInput.type === 'password';
                targetInput.type = isPass ? 'text' : 'password';
                btn.textContent = isPass ? '🙈' : '👁️';
            }
        });
    });
}

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '🌙';
        }
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
