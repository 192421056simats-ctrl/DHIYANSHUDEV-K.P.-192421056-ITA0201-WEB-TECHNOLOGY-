/**
 * ITA02 Web Technology Assignment 1 Script
 * Author: Dhiyanshu Dev K.P. (Reg. No: 192421056)
 * Concepts: Form Validation, Event Handling, Reusable Functions, Arrays/Objects, Dynamic DOM
 */

// Debugging Trace Log (Requirement 10)
console.log("=================================================================");
console.log("🚀 ITA02 Course Registration Portal initialized for Dhiyanshu Dev K.P. (192421056)");
console.log("=================================================================");

/**
 * 1. Available Courses Master Data Structure (JS Objects Array)
 */
const COURSES_CATALOG = [
    { code: "ITA02", name: "Web Technology", credits: 4, type: "Theory" },
    { code: "CS302", name: "Artificial Intelligence", credits: 4, type: "Theory" },
    { code: "ITA04", name: "Web Technology Laboratory", credits: 2, type: "Practical" },
    { code: "CS304", name: "Machine Learning", credits: 4, type: "Theory" },
    { code: "IT305", name: "Database Management Systems", credits: 3, type: "Theory" },
    { code: "CS306", name: "Cloud Computing Architecture", credits: 3, type: "Theory" }
];

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const registrationForm = document.getElementById('registrationForm');
    const regNumberInput = document.getElementById('regNumber');
    const studentNameInput = document.getElementById('studentName');
    const studentEmailInput = document.getElementById('studentEmail');
    const departmentSelect = document.getElementById('department');
    const semesterInput = document.getElementById('semester');
    const courseCheckboxes = document.getElementsByName('selectedCourses');
    
    const summaryContainer = document.getElementById('summaryContainer');
    const resetBtn = document.getElementById('resetBtn');

    // Error Message Elements
    const regNumErr = document.getElementById('regNumErr');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const deptErr = document.getElementById('deptErr');
    const semErr = document.getElementById('semErr');
    const courseErr = document.getElementById('courseErr');

    /**
     * 2. Reusable Function to Calculate Total Selected Courses and Total Credits (Requirement 8)
     * @param {Array<string>} selectedCodes Array of selected course codes
     * @returns {Object} { totalCourses, totalCredits, courseDetails }
     */
    function calculateRegistrationTotals(selectedCodes) {
        let totalCourses = 0;
        let totalCredits = 0;
        let courseDetails = [];

        selectedCodes.forEach(code => {
            const course = COURSES_CATALOG.find(c => c.code === code);
            if (course) {
                totalCourses++;
                totalCredits += course.credits;
                courseDetails.push(course);
            }
        });

        // Debugging trace using console.log()
        console.log(`[Calc] Selected ${totalCourses} courses | Total Credits: ${totalCredits}`);
        return { totalCourses, totalCredits, courseDetails };
    }

    /**
     * 3. Form Validation Logic (Requirement 6)
     */
    function validateForm() {
        let isValid = true;
        clearErrors();

        const regNoVal = regNumberInput.value.trim();
        const nameVal = studentNameInput.value.trim();
        const emailVal = studentEmailInput.value.trim();
        const deptVal = departmentSelect.value;
        const semVal = semesterInput.value.trim();

        // Register Number Check
        if (!regNoVal) {
            showFieldError(regNumberInput, regNumErr, "Register Number is required.");
            isValid = false;
        }

        // Student Name Check
        if (!nameVal) {
            showFieldError(studentNameInput, nameErr, "Student Name is required.");
            isValid = false;
        }

        // Email Format Validation (Regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            showFieldError(studentEmailInput, emailErr, "Email Address is required.");
            isValid = false;
        } else if (!emailPattern.test(emailVal)) {
            showFieldError(studentEmailInput, emailErr, "Please enter a valid email address (e.g. name@apex.edu.in).");
            isValid = false;
        }

        // Department Selection Check
        if (!deptVal) {
            showFieldError(departmentSelect, deptErr, "Please select your department.");
            isValid = false;
        }

        // Semester Range Validation (1 to 8)
        const semNum = parseInt(semVal, 10);
        if (!semVal) {
            showFieldError(semesterInput, semErr, "Semester is required.");
            isValid = false;
        } else if (isNaN(semNum) || semNum < 1 || semNum > 8) {
            showFieldError(semesterInput, semErr, "Semester must be a number between 1 and 8.");
            isValid = false;
        }

        // Course Selection Check (At least 1 course selected)
        const selectedCodes = getSelectedCourseCodes();
        if (selectedCodes.length === 0) {
            courseErr.textContent = "Please select at least one course to register.";
            isValid = false;
        }

        return isValid;
    }

    function getSelectedCourseCodes() {
        const selected = [];
        courseCheckboxes.forEach(cb => {
            if (cb.checked) {
                selected.push(cb.value);
            }
        });
        return selected;
    }

    function showFieldError(inputElem, errorElem, message) {
        inputElem.parentElement.classList.add('has-error');
        errorElem.textContent = message;
    }

    function clearErrors() {
        const errorElements = [regNumErr, nameErr, emailErr, deptErr, semErr, courseErr];
        errorElements.forEach(elem => elem.textContent = '');

        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('has-error'));
    }

    /**
     * 4. Dynamic Registration Summary Display (Requirement 9)
     */
    function renderRegistrationSummary(studentData, calcResults) {
        summaryContainer.innerHTML = ''; // Clear previous summary

        const summaryCard = document.createElement('div');
        summaryCard.classList.add('summary-card');

        // Course Tag Items
        const courseTagsHtml = calcResults.courseDetails.map(c => 
            `<span class="c-tag"><strong>${c.code}</strong>: ${c.name} (${c.credits} Credits)</span>`
        ).join('');

        summaryCard.innerHTML = `
            <div class="summary-header">
                <h3>🎓 Dynamic Registration Summary</h3>
                <span class="status-passed">Status: Validated &amp; Ready</span>
            </div>

            <div class="summary-details-grid">
                <div class="sum-item">
                    <label>Student Name</label>
                    <span>${studentData.name}</span>
                </div>
                <div class="sum-item">
                    <label>Register Number</label>
                    <span>${studentData.regNo}</span>
                </div>
                <div class="sum-item">
                    <label>Department</label>
                    <span>${studentData.dept}</span>
                </div>
                <div class="sum-item">
                    <label>Semester</label>
                    <span>Semester ${studentData.sem}</span>
                </div>
                <div class="sum-item">
                    <label>Student Email</label>
                    <span>${studentData.email}</span>
                </div>
            </div>

            <div class="selected-courses-list">
                <h4>Selected Courses (${calcResults.totalCourses}):</h4>
                <div class="course-tags">
                    ${courseTagsHtml}
                </div>
            </div>

            <div class="summary-totals">
                <div class="total-box">
                    <div class="val">${calcResults.totalCourses}</div>
                    <div class="lbl">Total Courses</div>
                </div>
                <div class="total-box">
                    <div class="val">${calcResults.totalCredits}</div>
                    <div class="lbl">Total Academic Credits</div>
                </div>
            </div>
        `;

        summaryContainer.appendChild(summaryCard);
        summaryContainer.classList.remove('hidden');

        // Scroll to summary section smoothly
        summaryContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * 5. Form Submit Event Handler
     */
    registrationForm.addEventListener('submit', (event) => {
        // Prevent complete webpage reload (Requirement 9)
        event.preventDefault();

        console.log("[Event] Submit button clicked. Triggering validation...");

        if (validateForm()) {
            const studentData = {
                regNo: regNumberInput.value.trim(),
                name: studentNameInput.value.trim(),
                email: studentEmailInput.value.trim(),
                dept: departmentSelect.value,
                sem: semesterInput.value.trim()
            };

            const selectedCodes = getSelectedCourseCodes();
            const calcResults = calculateRegistrationTotals(selectedCodes);

            // Render summary dynamically
            renderRegistrationSummary(studentData, calcResults);
            console.log("✅ Registration Summary generated successfully without page reload!");
        } else {
            console.warn("⚠️ Validation failed! Please fix form errors.");
        }
    });

    // Reset Button Event Handler
    resetBtn.addEventListener('click', () => {
        registrationForm.reset();
        clearErrors();
        summaryContainer.classList.add('hidden');
        summaryContainer.innerHTML = '';
        console.log("[Event] Form reset.");
    });
});

/**
 * 6. Debugging & Issue Resolution Log (Requirement 10)
 * -----------------------------------------------------------------
 * Identified Issue during development:
 * In initial iteration, clicking submit caused full browser page refresh because form 
 * had no event.preventDefault() handling inside the submit listener.
 * 
 * Resolution:
 * Used Console DevTools to inspect network tab, added event.preventDefault() inside 
 * the submit event handler, and ensured dynamic DOM insertion using summaryContainer.
 * -----------------------------------------------------------------
 */
