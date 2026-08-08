/**
 * Experiment 7: Online Quiz Application Engine
 * Contains 20 Complete Questions, Countdown Timer, Question Matrix & Detailed Reviews
 */

const questionBank = [
    {
        question: "Which HTML5 semantic element is most appropriate for containing tangential content like a sidebar or pull quotes?",
        options: ["<section>", "<article>", "<aside>", "<div>"],
        correct: 2,
        explanation: "<aside> is specifically intended for content that is indirectly related to the main content around it."
    },
    {
        question: "What CSS layout model provides 2-dimensional grid-based layout control for rows and columns simultaneously?",
        options: ["Flexbox", "CSS Grid", "Float Layout", "Position Sticky"],
        correct: 1,
        explanation: "CSS Grid is a 2D layout engine (rows + columns), whereas Flexbox is primarily a 1D layout engine."
    },
    {
        question: "In Vanilla JavaScript ES6+, which variable declaration statement creates a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correct: 2,
        explanation: "const creates a read-only reference to a value within block scope."
    },
    {
        question: "Which DOM method is used to attach an event handler without overwriting existing event handlers on the same element?",
        options: ["element.setAttribute()", "element.addEventListener()", "element.onclick = fn", "element.attach()"],
        correct: 1,
        explanation: "addEventListener allows binding multiple independent listeners to the same target event."
    },
    {
        question: "What is the purpose of the CSS property 'backdrop-filter: blur(16px)'?",
        options: ["Blurs the element's background color", "Blurs content rendered behind the glass element", "Blurs all child text inside the element", "Blurs the document scrollbar"],
        correct: 1,
        explanation: "backdrop-filter applies graphical effects (like blurs) to the area directly behind an element (key to glassmorphism)."
    },
    {
        question: "Which HTTP status code signifies a successful '200 OK' response?",
        options: ["200", "301", "404", "500"],
        correct: 0,
        explanation: "200 indicates that the HTTP request successfully succeeded."
    },
    {
        question: "What does the JavaScript array method '.reduce()' return?",
        options: ["A filtered array", "A single accumulated result value", "A mapped array", "A boolean value"],
        correct: 1,
        explanation: ".reduce() executes a reducer function on each element, resulting in a single output value."
    },
    {
        question: "Which HTML5 attribute ensures an input field cannot be left blank prior to form submission?",
        options: ["validate", "required", "mandatory", "important"],
        correct: 1,
        explanation: "The 'required' attribute specifies that the user must fill in a value before submitting."
    },
    {
        question: "How do you select all <p> elements inside a <div> using querySelectorAll?",
        options: ["document.querySelectorAll('div p')", "document.getElements('div > p')", "document.find('div p')", "document.select('p')"],
        correct: 0,
        explanation: "document.querySelectorAll('div p') returns a static NodeList of all matching paragraphs within divs."
    },
    {
        question: "What is the primary function of window.localStorage in web browsers?",
        options: ["Temporary session cache deleted on tab close", "Persistent client-side key-value storage with no expiration date", "Server-side database storage", "Cookie session tracking"],
        correct: 1,
        explanation: "localStorage persists data in the browser even after the browser window is closed and reopened."
    },
    {
        question: "In CSS, what does the box-sizing property value 'border-box' do?",
        options: ["Adds extra margin around borders", "Includes padding and border in the element's total width and height", "Excludes padding from layout width", "Makes borders transparent"],
        correct: 1,
        explanation: "border-box ensures width = content + padding + border, preventing layout overflow calculations."
    },
    {
        question: "Which JavaScript Math method returns the smallest integer greater than or equal to a given number?",
        options: ["Math.floor()", "Math.round()", "Math.ceil()", "Math.abs()"],
        correct: 2,
        explanation: "Math.ceil() rounds a number UPWARDS to the nearest integer."
    },
    {
        question: "What format does JSON stand for?",
        options: ["Java Server Object Notation", "JavaScript Object Notation", "JS Oriented Network", "Java System Online Node"],
        correct: 1,
        explanation: "JSON stands for JavaScript Object Notation."
    },
    {
        question: "What is the difference between '==' and '===' in JavaScript?",
        options: ["== compares types only, === compares values only", "== allows type coercion, === checks strict value and type equality", "No difference", "=== is for numbers only"],
        correct: 1,
        explanation: "=== is the strict equality operator which checks both value and data type without type coercion."
    },
    {
        question: "Which CSS Flexbox property aligns flex items along the cross axis?",
        options: ["justify-content", "align-items", "flex-direction", "grid-gap"],
        correct: 1,
        explanation: "align-items aligns items along the cross axis, while justify-content aligns along the main axis."
    },
    {
        question: "What does event.preventDefault() accomplish in an event handler?",
        options: ["Stops event bubbling", "Prevents the default browser action for that event", "Removes the event listener", "Cancels JavaScript execution"],
        correct: 1,
        explanation: "event.preventDefault() stops the default browser action (such as submitting a form or navigating a hyperlink)."
    },
    {
        question: "Which web API enables drawing 2D shapes, charts, and animations dynamically via JavaScript?",
        options: ["HTML5 Canvas API", "SVG Direct API", "WebGL Audio", "DOM Parser"],
        correct: 0,
        explanation: "HTML5 Canvas API provides a 2D rendering context for bitmap drawing."
    },
    {
        question: "What is the purpose of the async script attribute in HTML?",
        options: ["Loads script synchronously", "Downloads script in background and executes as soon as available without blocking HTML parsing", "Delays execution until page load finishes", "Enables multithreading"],
        correct: 1,
        explanation: "async fetches the script asynchronously and executes it immediately when downloaded."
    },
    {
        question: "Which CSS pseudo-class targets an element when the user hovers their mouse pointer over it?",
        options: [":active", ":focus", ":hover", ":visited"],
        correct: 2,
        explanation: ":hover applies styles when the cursor hovers over an element."
    },
    {
        question: "What is the result of typeof NaN in JavaScript?",
        options: ["'number'", "'nan'", "'undefined'", "'object'"],
        correct: 0,
        explanation: "In JavaScript, NaN (Not a Number) is technically a numeric data type."
    }
];

class QuizApp {
    constructor() {
        this.questions = questionBank;
        this.currentIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.timerSeconds = 15 * 60; // 15 Minutes
        this.timerInterval = null;

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.startScreen = document.getElementById('startScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');

        this.startQuizBtn = document.getElementById('startQuizBtn');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.currentQuestionNum = document.getElementById('currentQuestionNum');
        this.progressFill = document.getElementById('quizProgressFill');

        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('optionsContainer');

        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.clearOptionBtn = document.getElementById('clearOptionBtn');
        this.submitQuizBtn = document.getElementById('submitQuizBtn');
        this.questionPalette = document.getElementById('questionPalette');

        this.restartQuizBtn = document.getElementById('restartQuizBtn');
    }

    bindEvents() {
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        this.clearOptionBtn.addEventListener('click', () => this.clearChoice());
        this.submitQuizBtn.addEventListener('click', () => this.submitQuiz());
        this.restartQuizBtn.addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');

        this.startTimer();
        this.renderQuestion();
        this.renderPalette();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            const mins = Math.floor(this.timerSeconds / 60);
            const secs = this.timerSeconds % 60;
            this.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

            if (this.timerSeconds <= 0) {
                clearInterval(this.timerInterval);
                this.submitQuiz();
            }
        }, 1000);
    }

    renderQuestion() {
        const q = this.questions[this.currentIndex];
        this.currentQuestionNum.textContent = this.currentIndex + 1;
        this.questionText.textContent = `${this.currentIndex + 1}. ${q.question}`;

        // Progress bar percentage
        const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;

        // Render Options
        const prefixes = ['A', 'B', 'C', 'D'];
        this.optionsContainer.innerHTML = q.options.map((opt, idx) => `
            <div class="option-card ${this.userAnswers[this.currentIndex] === idx ? 'selected' : ''}" onclick="quiz.selectOption(${idx})">
                <span class="opt-prefix">${prefixes[idx]}</span>
                <span>${opt}</span>
            </div>
        `).join('');

        // Navigation controls state
        this.prevBtn.disabled = this.currentIndex === 0;

        if (this.currentIndex === this.questions.length - 1) {
            this.nextBtn.classList.add('hidden');
            this.submitQuizBtn.classList.remove('hidden');
        } else {
            this.nextBtn.classList.remove('hidden');
            this.submitQuizBtn.classList.add('hidden');
        }

        this.updatePaletteUI();
    }

    selectOption(idx) {
        this.userAnswers[this.currentIndex] = idx;
        this.renderQuestion();
    }

    clearChoice() {
        this.userAnswers[this.currentIndex] = null;
        this.renderQuestion();
    }

    navigate(step) {
        this.currentIndex += step;
        this.renderQuestion();
    }

    jumpToQuestion(idx) {
        this.currentIndex = idx;
        this.renderQuestion();
    }

    renderPalette() {
        this.questionPalette.innerHTML = this.questions.map((_, idx) => `
            <button class="palette-pill" onclick="quiz.jumpToQuestion(${idx})">${idx + 1}</button>
        `).join('');
        this.updatePaletteUI();
    }

    updatePaletteUI() {
        const pills = this.questionPalette.querySelectorAll('.palette-pill');
        pills.forEach((pill, idx) => {
            pill.className = 'palette-pill';
            if (idx === this.currentIndex) pill.classList.add('current');
            else if (this.userAnswers[idx] !== null) pill.classList.add('answered');
        });
    }

    submitQuiz() {
        clearInterval(this.timerInterval);
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');

        // Calculate score
        let correctCount = 0;
        this.questions.forEach((q, idx) => {
            if (this.userAnswers[idx] === q.correct) {
                correctCount++;
            }
        });

        const total = this.questions.length;
        const percentage = Math.round((correctCount / total) * 100);
        const wrongCount = total - correctCount;

        document.getElementById('finalScoreVal').textContent = `${correctCount} / ${total}`;
        document.getElementById('percentageVal').textContent = `${percentage}%`;
        document.getElementById('correctAnswersVal').textContent = correctCount;
        document.getElementById('wrongAnswersVal').textContent = wrongCount;

        const trophyIcon = document.getElementById('scoreTrophyIcon');
        const title = document.getElementById('resultTitle');

        if (percentage >= 70) {
            trophyIcon.textContent = '🏆';
            title.textContent = 'Congratulations! You Passed!';
        } else {
            trophyIcon.textContent = '📊';
            title.textContent = 'Keep Learning & Try Again!';
        }

        // Detailed review list
        const reviewList = document.getElementById('reviewList');
        reviewList.innerHTML = this.questions.map((q, idx) => {
            const userChoice = this.userAnswers[idx];
            const isCorrect = userChoice === q.correct;
            const prefixes = ['A', 'B', 'C', 'D'];

            return `
                <div class="review-item ${isCorrect ? 'correct' : 'wrong'}">
                    <h4>Q${idx + 1}: ${q.question}</h4>
                    <p><strong>Your Answer:</strong> ${userChoice !== null ? `${prefixes[userChoice]}: ${q.options[userChoice]}` : '<em>Skipped / Not Answered</em>'}</p>
                    <p><strong>Correct Answer:</strong> ${prefixes[q.correct]}: ${q.options[q.correct]}</p>
                    <div class="exp-box">💡 <strong>Explanation:</strong> ${q.explanation}</div>
                </div>
            `;
        }).join('');
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.timerSeconds = 15 * 60;
        this.resultScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }
}

let quiz;
document.addEventListener('DOMContentLoaded', () => {
    quiz = new QuizApp();
});
