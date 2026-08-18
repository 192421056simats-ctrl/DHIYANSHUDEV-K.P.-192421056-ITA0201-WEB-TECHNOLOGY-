/**
 * Experiment 1: DOM-Based Interactive Student Registration Preview
 * Concepts Assessed: DOM manipulation, element selection, dynamic content,
 * event handling, classList, element removal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selection using getElementById() and querySelector()
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('studentName');
    const regInput = document.getElementById('regNumber');
    const deptInput = document.getElementById('department');
    const yearInput = document.getElementById('yearOfStudy');

    const profileContainer = document.getElementById('profileContainer');
    const emptyState = document.getElementById('emptyState');
    const profileCountBadge = document.getElementById('profileCount');
    const resetBtn = document.getElementById('resetBtn');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const regError = document.getElementById('regError');
    const deptError = document.getElementById('deptError');
    const yearError = document.getElementById('yearError');

    let totalProfilesCount = 0;

    // 2. Add Event Listener for Form Submission (Display Action)
    registrationForm.addEventListener('submit', (event) => {
        // Prevent default form reloading behavior
        event.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Read Form Values using DOM input references
        const nameValue = nameInput.value.trim();
        const regValue = regInput.value.trim();
        const deptValue = deptInput.value;
        const yearValue = yearInput.value;

        // Perform Client Validation
        let isValid = true;

        if (!nameValue) {
            showError(nameInput, nameError, 'Please enter the student name.');
            isValid = false;
        }

        if (!regValue) {
            showError(regInput, regError, 'Please enter the register number.');
            isValid = false;
        }

        if (!deptValue) {
            showError(deptInput, deptError, 'Please select a department.');
            isValid = false;
        }

        if (!yearValue) {
            showError(yearInput, yearError, 'Please select year of study.');
            isValid = false;
        }

        if (!isValid) return;

        // 3. Dynamically Generate Student Profile Card using DOM methods
        createProfileCard({
            name: nameValue,
            regNo: regValue,
            department: deptValue,
            year: yearValue
        });

        // Reset the form fields after successful submission
        registrationForm.reset();
    });

    // Event Listener for Manual Reset Button
    resetBtn.addEventListener('click', () => {
        registrationForm.reset();
        clearErrors();
    });

    /**
     * Function to create a styled student profile element using DOM methods
     */
    function createProfileCard(student) {
        // Hide empty state placeholder if visible
        if (emptyState && emptyState.parentNode === profileContainer) {
            emptyState.style.display = 'none';
        }

        // Create main container for the profile card using createElement()
        const cardDiv = document.createElement('div');
        
        // Visually distinguish using classList
        cardDiv.classList.add('profile-card');

        // Extract initials for Avatar
        const initials = student.name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);

        // --- Card Top Header ---
        const cardTop = document.createElement('div');
        cardTop.classList.add('profile-card-top');

        const infoMain = document.createElement('div');
        infoMain.classList.add('student-info-main');

        // Avatar Element
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.textContent = initials; // Using textContent for safe text injection

        // Name & RegNo Container
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('student-heading');

        const nameHeading = document.createElement('h3');
        nameHeading.textContent = student.name;

        const regTag = document.createElement('span');
        regTag.classList.add('reg-number-tag');
        regTag.textContent = `Reg No: ${student.regNo}`;

        headingDiv.appendChild(nameHeading);
        headingDiv.appendChild(regTag);

        infoMain.appendChild(avatar);
        infoMain.appendChild(headingDiv);

        // 4. Remove Button with addEventListener() for Removal Action
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.classList.add('btn-remove');
        removeBtn.innerHTML = '<span>🗑️</span> Remove';
        removeBtn.title = 'Remove this student profile';

        // Add event listener to remove this specific profile card dynamically
        removeBtn.addEventListener('click', () => {
            // Smooth exit animation before DOM element removal
            cardDiv.classList.add('removing');
            cardDiv.addEventListener('animationend', () => {
                // DOM element removal using remove()
                cardDiv.remove();
                
                // Update profile counter
                totalProfilesCount--;
                updateProfileCounter();

                // Show empty state if all cards are removed
                if (totalProfilesCount === 0 && emptyState) {
                    emptyState.style.display = 'block';
                }
            });
        });

        cardTop.appendChild(infoMain);
        cardTop.appendChild(removeBtn);

        // --- Card Details Grid ---
        const detailsGrid = document.createElement('div');
        detailsGrid.classList.add('profile-card-details');

        // Department item
        const deptItem = document.createElement('div');
        deptItem.classList.add('detail-item');
        const deptLabel = document.createElement('span');
        deptLabel.classList.add('detail-label');
        deptLabel.textContent = 'Department';
        const deptVal = document.createElement('span');
        deptVal.classList.add('detail-value');
        deptVal.textContent = student.department;
        deptItem.appendChild(deptLabel);
        deptItem.appendChild(deptVal);

        // Year item
        const yearItem = document.createElement('div');
        yearItem.classList.add('detail-item');
        const yearLabel = document.createElement('span');
        yearLabel.classList.add('detail-label');
        yearLabel.textContent = 'Year of Study';
        const yearVal = document.createElement('span');
        yearVal.classList.add('detail-value');
        yearVal.textContent = student.year;
        yearItem.appendChild(yearLabel);
        yearItem.appendChild(yearVal);

        detailsGrid.appendChild(deptItem);
        detailsGrid.appendChild(yearItem);

        // Timestamp
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        const now = new Date();
        timestamp.textContent = `Registered at ${now.toLocaleTimeString()}`;

        // Assemble the card
        cardDiv.appendChild(cardTop);
        cardDiv.appendChild(detailsGrid);
        cardDiv.appendChild(timestamp);

        // Prepend to display newest profile on top
        profileContainer.insertBefore(cardDiv, profileContainer.firstChild);

        // Update count
        totalProfilesCount++;
        updateProfileCounter();
    }

    // Helper Functions for Validation & Count updates
    function showError(inputElem, errorElem, message) {
        inputElem.parentElement.classList.add('has-error');
        errorElem.textContent = message;
    }

    function clearErrors() {
        const errorElements = [nameError, regError, deptError, yearError];
        const formGroups = document.querySelectorAll('.form-group');

        errorElements.forEach(elem => elem.textContent = '');
        formGroups.forEach(group => group.classList.remove('has-error'));
    }

    function updateProfileCounter() {
        profileCountBadge.textContent = `${totalProfilesCount} ${totalProfilesCount === 1 ? 'Profile' : 'Profiles'}`;
    }
});
