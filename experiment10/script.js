/**
 * Experiment 10: Interactive Web Debugging Lab Engine
 * Console Proxy Interceptor, Exception Trap, & Broken vs Fixed Mode Switcher
 */

class DebuggingLab {
    constructor() {
        this.isBrokenMode = true; // Default to Broken Mode

        this.initDOM();
        this.interceptConsoleLogs();
        this.bindEvents();
        this.renderMode();
    }

    initDOM() {
        this.modeLabel = document.getElementById('modeLabel');
        this.setBrokenBtn = document.getElementById('setBrokenModeBtn');
        this.setFixedBtn = document.getElementById('setFixedModeBtn');

        this.calcBtn = document.getElementById('triggerCalcBtn');
        this.errorBtn = document.getElementById('triggerErrorBtn');
        this.calcOutput = document.getElementById('calcOutput');

        this.consoleList = document.getElementById('consoleOutputList');
        this.clearConsoleBtn = document.getElementById('clearConsoleBtn');

        this.tabs = document.querySelectorAll('.console-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
    }

    /**
     * Console Interceptor Proxy: Captures all native console methods
     * and streams them into the simulated DevTools window on screen!
     */
    interceptConsoleLogs() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;

        console.log = (...args) => {
            originalLog.apply(console, args);
            this.appendConsoleLog('info', args.join(' '));
        };

        console.warn = (...args) => {
            originalWarn.apply(console, args);
            this.appendConsoleLog('warn', args.join(' '));
        };

        console.error = (...args) => {
            originalError.apply(console, args);
            this.appendConsoleLog('error', args.join(' '));
        };

        // Window Global Error Handler
        window.onerror = (message, source, lineno, colno, error) => {
            this.appendConsoleLog('error', `Uncaught ${message} at line ${lineno}:${colno}`);
            return true; // Prevents browser alert popups
        };
    }

    appendConsoleLog(type, text) {
        if (!this.consoleList) return;
        const time = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `<strong>[${time}] ${type.toUpperCase()}:</strong> ${this.escapeHtml(text)}`;
        this.consoleList.appendChild(entry);
        this.consoleList.scrollTop = this.consoleList.scrollHeight;
    }

    bindEvents() {
        this.setBrokenBtn.addEventListener('click', () => {
            this.isBrokenMode = true;
            this.renderMode();
        });

        this.setFixedBtn.addEventListener('click', () => {
            this.isBrokenMode = false;
            this.renderMode();
        });

        this.calcBtn.addEventListener('click', () => this.handleCalculate());
        this.errorBtn.addEventListener('click', () => this.handleTriggerError());

        this.clearConsoleBtn.addEventListener('click', () => {
            this.consoleList.innerHTML = '';
            console.log('Console window cleared.');
        });

        // Tab Switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.tabs.forEach(t => t.classList.remove('active'));
                this.tabContents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }

    renderMode() {
        this.consoleList.innerHTML = '';

        if (this.isBrokenMode) {
            this.modeLabel.textContent = 'BROKEN CODE MODE (ERRORS ACTIVE)';
            this.modeLabel.className = 'mode-status broken';
            this.setBrokenBtn.classList.add('active');
            this.setFixedBtn.classList.remove('active');

            console.warn('Sandbox loaded in BROKEN CODE mode.');
            console.warn('HTML: Duplicate IDs present.');
            console.warn('JS: Event handlers contain unhandled type exceptions.');
            this.calcOutput.textContent = 'Result will appear here... (Errors active)';
        } else {
            this.modeLabel.textContent = 'CORRECTED CODE MODE (STABLE)';
            this.modeLabel.className = 'mode-status fixed';
            this.setFixedBtn.classList.add('active');
            this.setBrokenBtn.classList.remove('active');

            console.log('Sandbox loaded in CORRECTED CODE mode.');
            console.log('All input listeners wrapped in try...catch blocks with null checking.');
            this.calcOutput.textContent = 'Result will appear here... (Fixed mode ready)';
        }
    }

    handleCalculate() {
        if (this.isBrokenMode) {
            // BROKEN CODE EXECUTION: Accessing non-existent element causes TypeError!
            try {
                console.log('Attempting grade calculation in Broken Mode...');
                // DELIBERATE BUG: Accessing value property of null element with typo in ID 'studentMarkInp'
                const rawVal = document.getElementById('studentMarkInp').value; 
                this.calcOutput.textContent = `Grade: ${rawVal}`;
            } catch (err) {
                console.error(`TypeError: Cannot read properties of null (reading 'value')`);
                console.error(`Stack trace: handleCalculate() at experiment10/script.js:112`);
                this.calcOutput.textContent = '❌ Execution Failed: TypeError (Check Console Log)';
            }
        } else {
            // CORRECTED CODE EXECUTION: Safe element retrieval with validation & try...catch
            try {
                console.log('Running safe grade calculation in Corrected Mode...');
                const inputEl = document.getElementById('studentMarkInput');
                if (!inputEl) throw new Error('Target input element not found');

                const score = parseFloat(inputEl.value);
                if (isNaN(score)) throw new Error('Invalid score value provided');

                let grade = 'F';
                if (score >= 90) grade = 'S';
                else if (score >= 80) grade = 'A+';
                else if (score >= 70) grade = 'A';
                else if (score >= 60) grade = 'B';

                console.log(`Calculation Success! Score: ${score}, Calculated Grade: ${grade}`);
                this.calcOutput.textContent = `✅ Calculated Grade: ${grade} (Score: ${score}/100)`;
            } catch (err) {
                console.error(`Handled Exception: ${err.message}`);
            }
        }
    }

    handleTriggerError() {
        if (this.isBrokenMode) {
            console.log('Triggering deliberate uncaught ReferenceError...');
            // DELIBERATE BUG: Referencing non-existent variable
            eval('nonExistentVariableCall()');
        } else {
            console.log('Triggering safe try...catch error handler demo...');
            try {
                // Safe handling of error using try...catch block
                throw new Error('Demonstrating Graceful Error Catching with try...catch block');
            } catch (err) {
                console.warn(`Caught Error in try...catch: ${err.message}`);
                this.calcOutput.textContent = `⚠️ Caught Exception handled safely: "${err.message}"`;
            }
        }
    }

    escapeHtml(str) {
        return String(str).replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
}

let debugLab;
document.addEventListener('DOMContentLoaded', () => {
    debugLab = new DebuggingLab();
});
