/**
 * Experiment 3: Interactive Scientific Calculator Engine
 * Clean Modular JavaScript with Keyboard Shortcuts & Memory Registers
 */

class ScientificCalculator {
    constructor() {
        this.currentDisplay = '0';
        this.previousExpr = '';
        this.memoryValue = 0;
        this.isDegMode = true; // true = Degree, false = Radian
        this.history = [];
        this.shouldResetDisplay = false;

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.currentDisplayEl = document.getElementById('currentDisplay');
        this.previousExprEl = document.getElementById('previousExpression');
        this.degRadBtn = document.getElementById('degRadMode');
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');
    }

    bindEvents() {
        // Keypad buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleButtonClick(btn));
        });

        // Memory buttons
        document.querySelectorAll('.mem-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleMemoryAction(e.target.dataset.action));
        });

        // Toggle history & theme
        document.getElementById('toggleHistoryBtn').addEventListener('click', () => {
            this.historyPanel.classList.toggle('hidden');
        });

        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.history = [];
            this.updateHistoryUI();
        });

        this.degRadBtn.addEventListener('click', () => {
            this.isDegMode = !this.isDegMode;
            this.degRadBtn.textContent = this.isDegMode ? 'DEG' : 'RAD';
        });

        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });

        // Keyboard listener
        window.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    handleButtonClick(btn) {
        const num = btn.dataset.num;
        const op = btn.dataset.op;
        const func = btn.dataset.func;
        const action = btn.dataset.action;

        if (num !== undefined) this.appendNumber(num);
        else if (op !== undefined) this.appendOperator(op);
        else if (func !== undefined) this.executeFunction(func);
        else if (action !== undefined) this.executeAction(action);

        this.updateDisplay();
    }

    appendNumber(num) {
        if (this.currentDisplay === '0' || this.shouldResetDisplay) {
            if (num === '.') {
                this.currentDisplay = '0.';
            } else {
                this.currentDisplay = num;
            }
            this.shouldResetDisplay = false;
        } else {
            if (num === '.' && this.currentDisplay.includes('.')) return;
            this.currentDisplay += num;
        }
    }

    appendOperator(op) {
        if (this.shouldResetDisplay) this.shouldResetDisplay = false;
        const lastChar = this.currentDisplay.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            this.currentDisplay = this.currentDisplay.slice(0, -1) + op;
        } else {
            this.currentDisplay += ` ${op} `;
        }
    }

    executeFunction(func) {
        let val = parseFloat(this.currentDisplay);

        switch (func) {
            case 'sin':
                val = this.isDegMode ? Math.sin(val * Math.PI / 180) : Math.sin(val);
                this.recordHistory(`sin(${this.currentDisplay})`, val);
                break;
            case 'cos':
                val = this.isDegMode ? Math.cos(val * Math.PI / 180) : Math.cos(val);
                this.recordHistory(`cos(${this.currentDisplay})`, val);
                break;
            case 'tan':
                val = this.isDegMode ? Math.tan(val * Math.PI / 180) : Math.tan(val);
                this.recordHistory(`tan(${this.currentDisplay})`, val);
                break;
            case 'sqrt':
                val = Math.sqrt(val);
                this.recordHistory(`√(${this.currentDisplay})`, val);
                break;
            case 'square':
                val = Math.pow(val, 2);
                this.recordHistory(`(${this.currentDisplay})²`, val);
                break;
            case 'cube':
                val = Math.pow(val, 3);
                this.recordHistory(`(${this.currentDisplay})³`, val);
                break;
            case 'power':
                this.currentDisplay += ' ^ ';
                this.updateDisplay();
                return;
            case 'factorial':
                val = this.factorial(val);
                this.recordHistory(`${this.currentDisplay}!`, val);
                break;
            case 'log':
                val = Math.log10(val);
                this.recordHistory(`log(${this.currentDisplay})`, val);
                break;
            case 'ln':
                val = Math.log(val);
                this.recordHistory(`ln(${this.currentDisplay})`, val);
                break;
            case 'abs':
                val = Math.abs(val);
                this.recordHistory(`|${this.currentDisplay}|`, val);
                break;
            case 'percent':
                val = val / 100;
                break;
            case 'floor':
                val = Math.floor(val);
                break;
            case 'ceil':
                val = Math.ceil(val);
                break;
            case 'round':
                val = Math.round(val);
                break;
            case 'random':
                val = Math.random();
                break;
            case 'pi':
                val = Math.PI;
                break;
            case 'e':
                val = Math.E;
                break;
            case 'degRad':
                this.isDegMode = !this.isDegMode;
                this.degRadBtn.textContent = this.isDegMode ? 'DEG' : 'RAD';
                return;
        }

        this.currentDisplay = String(this.formatResult(val));
        this.shouldResetDisplay = true;
    }

    executeAction(action) {
        if (action === 'clear') {
            this.currentDisplay = '0';
            this.previousExpr = '';
        } else if (action === 'delete') {
            if (this.currentDisplay.length > 1) {
                this.currentDisplay = this.currentDisplay.trim().slice(0, -1).trim();
                if (this.currentDisplay === '') this.currentDisplay = '0';
            } else {
                this.currentDisplay = '0';
            }
        } else if (action === 'equals') {
            this.evaluateExpression();
        }
    }

    evaluateExpression() {
        try {
            let expr = this.currentDisplay.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Handle power ^ operator
            if (expr.includes('^')) {
                const parts = expr.split('^');
                if (parts.length === 2) {
                    const result = Math.pow(parseFloat(parts[0]), parseFloat(parts[1]));
                    this.recordHistory(expr, result);
                    this.previousExpr = `${expr} =`;
                    this.currentDisplay = String(this.formatResult(result));
                    this.shouldResetDisplay = true;
                    return;
                }
            }

            // Safe calculation evaluation using Function constructor
            const sanitizedExpr = expr.replace(/[^0-9\+\-\*\/\%\.\s]/g, '');
            const result = new Function(`return ${sanitizedExpr}`)();

            if (isNaN(result) || !isFinite(result)) {
                this.currentDisplay = 'Error';
            } else {
                this.recordHistory(this.currentDisplay, result);
                this.previousExpr = `${this.currentDisplay} =`;
                this.currentDisplay = String(this.formatResult(result));
            }
        } catch (err) {
            this.currentDisplay = 'Error';
        }
        this.shouldResetDisplay = true;
    }

    handleMemoryAction(action) {
        const val = parseFloat(this.currentDisplay) || 0;
        switch (action) {
            case 'mc':
                this.memoryValue = 0;
                this.memoryIndicator.classList.add('hidden');
                break;
            case 'mr':
                this.currentDisplay = String(this.memoryValue);
                this.shouldResetDisplay = true;
                break;
            case 'm-plus':
                this.memoryValue += val;
                this.memoryIndicator.classList.remove('hidden');
                this.shouldResetDisplay = true;
                break;
            case 'm-minus':
                this.memoryValue -= val;
                this.memoryIndicator.classList.remove('hidden');
                this.shouldResetDisplay = true;
                break;
        }
        this.updateDisplay();
    }

    handleKeyboardInput(e) {
        if (e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
        else if (e.key === '.') this.appendNumber('.');
        else if (['+', '-', '*', '/'].includes(e.key)) this.appendOperator(e.key);
        else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); this.evaluateExpression(); }
        else if (e.key === 'Backspace') this.executeAction('delete');
        else if (e.key === 'Escape') this.executeAction('clear');
        else if (e.key.toLowerCase() === 's') this.executeFunction('sin');
        else if (e.key.toLowerCase() === 'c') this.executeFunction('cos');
        else if (e.key.toLowerCase() === 't') this.executeFunction('tan');
        
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    formatResult(num) {
        if (Number.isInteger(num)) return num;
        return parseFloat(num.toFixed(8));
    }

    recordHistory(expr, result) {
        this.history.unshift({ expr, result: this.formatResult(result) });
        if (this.history.length > 20) this.history.pop();
        this.updateHistoryUI();
    }

    updateHistoryUI() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p class="empty-msg">No calculation history yet.</p>';
            return;
        }

        this.historyList.innerHTML = this.history.map(item => `
            <div class="history-item" onclick="calc.useHistoryResult('${item.result}')">
                <div class="hist-expr">${item.expr}</div>
                <div class="hist-res">= ${item.result}</div>
            </div>
        `).join('');
    }

    useHistoryResult(val) {
        this.currentDisplay = val;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentDisplayEl.textContent = this.currentDisplay;
        this.previousExprEl.textContent = this.previousExpr;
    }
}

// Global instance for inline onclick access
let calc;
document.addEventListener('DOMContentLoaded', () => {
    calc = new ScientificCalculator();
});
