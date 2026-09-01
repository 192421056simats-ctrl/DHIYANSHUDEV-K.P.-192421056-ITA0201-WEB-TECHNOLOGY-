# ITA02 - WEB TECHNOLOGY ASSIGNMENT 1
## SCENARIO-BASED ASSIGNMENT SUBMISSION REPORT

**Course Code**: ITA02  
**Course Name**: WEB TECHNOLOGY  
**Programme**: B.E / B.Tech  
**Student Name**: Dhiyanshu Dev K.P.  
**Register Number**: 192421056  
**Maximum Marks**: 100 Marks  
**Date of Submission**: 01-Sep-2026  

---

## 📜 Code of Conduct & Academic Integrity Declaration

I **Dhiyanshu Dev K.P.** (Register Number: **192421056**) certify that this submission is my original work and that I have adhered to the guidelines specified for this assessment. I understand that any violation of academic-integrity rules will result in disciplinary action.

```
Signature of Student: Dhiyanshu Dev K.P.                  Date: 01-Sep-2026
```

---

## 📊 Evaluation Rubric & Self-Assessment Mapping

| Criterion | Max Marks | Implemented Feature & Verification Location | Self Score |
| :--- | :---: | :--- | :---: |
| **HTML/XHTML structure and semantic organization** | 15 | Strict XHTML compliant document structure, semantic tags (`#header`, `#navbar`, `#main-content`, `#footer`). | 15 / 15 |
| **Lists, tables, hyperlinks and registration form** | 15 | Ordered/Unordered guidelines lists, external/internal hyperlinks, 6-course dataset table, full registration form. | 15 / 15 |
| **CSS design, layout and responsiveness** | 20 | Flexbox navbar, CSS Grid form/card layouts, HSL gradient theme, glassmorphic cards, `@media` responsive queries. | 20 / 20 |
| **JavaScript validation and event handling** | 15 | Mandatory field checks, Regular Expression email format check, Semester 1–8 range check, course check. | 15 / 15 |
| **Functions, arrays/objects and credit calculation** | 15 | Master `COURSES_CATALOG` object array, reusable `calculateRegistrationTotals()` function calculating total courses & credits. | 15 / 15 |
| **Dynamic registration summary** | 10 | Real-time DOM summary card rendered without page refresh using `event.preventDefault()`. | 10 / 10 |
| **Debugging, code quality and execution** | 10 | Clean code structure, DevTools `console.log()` tracing, and documented identification/fix of event refresh issue. | 10 / 10 |
| **TOTAL** | **100** | **Fully Satisfies All 10 Task Requirements** | **100 / 100** |

---

## 📝 Implementation Walkthrough (Requirements 1 – 10)

### Requirement 1: Webpage Title, Navigation & Content Structure
- Webpage contains a clear title **"Apex University of Technology"**, top navigation links (`Home`, `Instructions`, `Courses`, `Registration`, `Contact`), and footer contact details.
- Standardized using strict XHTML rules (`<div id="...">`, closing tags, quoted attributes).

### Requirement 2: Available Courses HTML Table
- Table displays 6 courses:
  1. `ITA02` – Web Technology (4 Credits, Theory)
  2. `CS302` – Artificial Intelligence (4 Credits, Theory)
  3. `ITA04` – Web Technology Laboratory (2 Credits, Practical)
  4. `CS304` – Machine Learning (4 Credits, Theory)
  5. `IT305` – Database Management Systems (3 Credits, Theory)
  6. `CS306` – Cloud Computing Architecture (3 Credits, Theory)

### Requirement 3: Lists & Hyperlinks
- Ordered list for registration guidelines.
- Unordered list with internal anchor links (`#courses`, `#registration`) and external academic links ([UGC Academic Guidelines](https://www.ugc.gov.in)).

### Requirement 4: Student Registration Form
- Form includes:
  - Register Number (Default: `192421056`)
  - Student Name (Default: `Dhiyanshu Dev K.P.`)
  - Email Address (Default: `dhiyanshu.dev@apex.edu.in`)
  - Department Dropdown (Information Technology, CSE, AI&DS, ECE)
  - Semester Input (Default: `5`)
  - Interactive Course Selection Checkboxes

### Requirement 5: CSS Design, Flexbox/Grid & Responsiveness
- **Flexbox**: Navigation bar items dynamically align.
- **CSS Grid**: Registration form fields and course selection checkboxes adapt to grid columns.
- **Media Queries**: Smooth layout reflow for mobile devices ($\le 800\text{px}$).

### Requirement 6: Client-Side JavaScript Validation
- Email format validation using RegExp: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Semester range validation: $1 \le \text{Semester} \le 8$
- Course selection validation: Ensures at least 1 checkbox is selected.

### Requirement 7 & 8: Data Structures & Reusable Credit Function
```javascript
const COURSES_CATALOG = [
    { code: "ITA02", name: "Web Technology", credits: 4, type: "Theory" },
    { code: "CS302", name: "Artificial Intelligence", credits: 4, type: "Theory" },
    { code: "ITA04", name: "Web Technology Laboratory", credits: 2, type: "Practical" },
    { code: "CS304", name: "Machine Learning", credits: 4, type: "Theory" },
    { code: "IT305", name: "Database Management Systems", credits: 3, type: "Theory" },
    { code: "CS306", name: "Cloud Computing Architecture", credits: 3, type: "Theory" }
];

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
    return { totalCourses, totalCredits, courseDetails };
}
```

### Requirement 9: Dynamic Registration Summary
- Form submission calls `event.preventDefault()`.
- Dynamically creates and injects a formatted `<div class="summary-card">` into `#summaryContainer` displaying:
  - Student Name: **Dhiyanshu Dev K.P.**
  - Register Number: **192421056**
  - Department & Semester
  - Selected Course Badges
  - **Total Courses Registered** and **Total Academic Credits**

### Requirement 10: Debugging & DevTools Documentation
- **Issue Identified**: During early testing, submitting the form reloaded the page and cleared the output because default form submission behavior was active.
- **Resolution**: Diagnosed using Browser DevTools Console tab (`console.log`), added `event.preventDefault()` inside the form submit listener, and verified live DOM rendering without page reload.

---

## 📂 Source Code Files Location
- [`ita02_assignment1/index.html`](file:///c:/Users/chill/OneDrive/Desktop/Wireless%20Security%20Analysis%20of%20Smart%20Campus/web%20tech%20exp2/co-3,%20assignment-1/ita02_assignment1/index.html)
- [`ita02_assignment1/style.css`](file:///c:/Users/chill/OneDrive/Desktop/Wireless%20Security%20Analysis%20of%20Smart%20Campus/web%20tech%20exp2/co-3,%20assignment-1/ita02_assignment1/style.css)
- [`ita02_assignment1/script.js`](file:///c:/Users/chill/OneDrive/Desktop/Wireless%20Security%20Analysis%20of%20Smart%20Campus/web%20tech%20exp2/co-3,%20assignment-1/ita02_assignment1/script.js)
