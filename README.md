# Web Technology Laboratory Experiments

**Student Name**: Dhiyanshu Dev K.P.  
**Register Number**: 192421056  
**Department**: B.Tech - Information Technology (B.Tech IT)  
**CGPA**: 8.86 / 10.0  
**Institution**: SIMATS University, Chennai, India  
**GitHub**: [192421056simats-ctrl](https://github.com/192421056simats-ctrl)  
**LinkedIn**: [dhiyanshu-dev-k-p-490579371](https://linkedin.com/in/dhiyanshu-dev-k-p-490579371)  

---

A comprehensive, production-ready web application suite featuring **10 standalone laboratory experiments** built exclusively with **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external frameworks or libraries). 

---

## 🌟 Key Features

- **Modern Glassmorphism UI**: Backdrop blur effects, vibrant dark/light theme gradients, rounded cards, subtle glowing shadows, and smooth CSS keyframe micro-animations.
- **100% Offline Functional**: Zero external dependencies, offline Canvas charting, and Web Audio API sound synthesis.
- **Responsive Layout**: Designed for seamless viewports across Desktop, Tablet, and Mobile devices using Flexbox & CSS Grid.
- **Unified Portal Launcher**: Central dashboard (`index.html`) featuring a collapsible sidebar, live experiment search, iframe viewer, and fullscreen mode.
- **Modular Codebase**: Every experiment resides in its own standalone directory containing `index.html`, `style.css`, and `script.js` with comprehensive inline comments.

---

## 📂 Folder Structure

```text
web tech exp2/
├── index.html                # Suite Portal & Hub Dashboard
├── style.css                 # Global glassmorphism design system & portal styles
├── script.js                # Portal logic, iframe launcher, live search & theme sync
├── README.md                 # Complete documentation for all experiments
│
├── experiment1/              # EXP 1: Responsive Student Profile Webpage
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment2/              # EXP 2: Student Registration Form with Validation
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment3/              # EXP 3: Interactive Scientific Calculator
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment4/              # EXP 4: Student Result Analysis System (Canvas Charts)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment5/              # EXP 5: Responsive College Website
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment6/              # EXP 6: Dynamic To-Do List (LocalStorage)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment7/              # EXP 7: Online Quiz Application (20 Questions)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment8/              # EXP 8: Digital Clock & Examination Countdown
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── experiment9/              # EXP 9: Shopping Cart & Billing System
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── experiment10/             # EXP 10: Interactive Debugging Demonstration
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🧪 Experiments Overview & Concepts

### Experiment 1: Responsive Student Profile Webpage
- **Description**: An interactive student profile card displaying personal details, academic metrics, animated skill progress bars, project showcases, and social media links.
- **Concepts Covered**: HTML5 Semantic Markup, CSS Flexbox/Grid, CSS Variables, Tab Navigation JS Engine, Light/Dark Mode toggle with LocalStorage.

### Experiment 2: Student Registration Form with Validation
- **Description**: A multi-section registration form with real-time field validation, email/phone regex matching, age calculation from DOB, password strength meter, and an animated submission modal.
- **Concepts Covered**: DOM Manipulations, Event Listeners, Regex Pattern Matching, Password Complexity Evaluation, Inline Feedback States.

### Experiment 3: Interactive Scientific Calculator
- **Description**: A high-precision calculator supporting basic math, scientific operations (`sin`, `cos`, `tan`, `sqrt`, `x²`, `x³`, `x^y`, `n!`, `%`, `mod`, `π`, `e`, `log`, `ln`, `abs`, `floor`, `ceil`, `round`, `random`), memory registers (`MC`, `MR`, `M+`, `M-`), history tracking, and full keyboard shortcuts.
- **Concepts Covered**: CSS Grid Keypad, Mathematical Expressions Parsing, Degree/Radian mode conversion, Memory State Registers, Keyboard Event Mapping.

### Experiment 4: Student Result Analysis System
- **Description**: A performance calculator taking student details and 5 subject scores to compute Total, Average, Highest/Lowest subject, Grade (S, A+, A, B, C, F), and Result status. Features custom-rendered HTML5 Canvas Bar & Doughnut charts built without libraries.
- **Concepts Covered**: JS Arrays & Objects, `Math.max()`, `Math.min()`, Canvas 2D Context Drawing, Arc Paths, Linear Gradients, Table Progress Indicators.

### Experiment 5: Responsive College Website
- **Description**: A multi-section single page portal for an academic institute featuring a sticky glassmorphism header, animated canvas particle hero background, department cards, filterable image gallery lightbox, placement statistics, and a back-to-top button.
- **Concepts Covered**: ScrollSpy Navigation, Mobile Hamburger Drawer, Canvas Particle Physics Animation, Lightbox Popup Modal, Responsive Breakpoints.

### Experiment 6: Dynamic To-Do List
- **Description**: A task management application allowing users to create, edit, delete, and mark tasks as complete. Features category tagging (Academic, Project, Exam, Personal), priority indicators (High, Medium, Low), due dates, real-time search/filters, and LocalStorage sync.
- **Concepts Covered**: CRUD Operations, Array Filtering & Searching, DOM Node Insertion/Removal, LocalStorage Persistence.

### Experiment 7: Online Quiz Application
- **Description**: A 20-question Web Technology & Computer Science MCQ quiz with a 15-minute countdown timer, question palette matrix, answer status tracking, automatic score calculation, and detailed question-by-question explanations.
- **Concepts Covered**: Array of Objects, Countdown Timers (`setInterval`), Question Navigation Matrix, Score Calculation, Review State Rendering.

### Experiment 8: Digital Clock & Examination Countdown
- **Description**: A real-time timekeeping suite featuring a digital clock, a Canvas-drawn smooth analog clock, an examination countdown timer (Start, Pause, Resume, Reset), and an offline alarm chime using Web Audio API sound synthesis.
- **Concepts Covered**: `Date` Object, Canvas Trigonometry for Clock Hands, Web Audio API `AudioContext` Sound Synthesis, Alarm Modal Triggers.

### Experiment 9: Shopping Cart & Billing System
- **Description**: An e-commerce store catalog featuring 6 tech products, quantity adjusters, item deletion, promo code discount system (`STUDENT10` / `WEBTECH20`), 18% GST tax calculation, and a printable invoice receipt modal.
- **Concepts Covered**: Shopping Cart State Machine, Promo Code Evaluation, Tax & Financial Computations, Modal Invoice Generation, CSS `@media print` Formatting.

### Experiment 10: Interactive Debugging Demonstration Lab
- **Description**: A dual-mode debugging sandbox comparing **Broken Code** (HTML unclosed tags, CSS syntax errors, JS `TypeError`/`ReferenceError`) against **Corrected Code**. Features an on-screen simulated DevTools console log interceptor and developer guide.
- **Concepts Covered**: Console Proxy Interception (`console.log`, `console.warn`, `console.error`), Window `onerror` Handling, `try...catch` Graceful Error Handling, DevTools Breakpoints Walkthrough.

---

## 🚀 How to Run

1. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari).
2. Use the **Left Sidebar** or **All Experiments Hub** cards to switch between any of the 10 experiments.
3. Every experiment can also be run independently by opening its respective `index.html` file directly inside its folder (`experiment1/index.html` .. `experiment10/index.html`).

---

## 🛠️ Tech Stack & Requirements

- **HTML5**: Semantic elements (`<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<footer>`).
- **CSS3**: Variables, Glassmorphism backdrop-filter, Flexbox, CSS Grid, Media Queries, Keyframe Animations.
- **Vanilla JavaScript**: ES6+ syntax, Modular Classes, DOM Operations, Canvas 2D API, Web Audio API, LocalStorage.
- **Zero External Dependencies**: Fully offline-capable!
