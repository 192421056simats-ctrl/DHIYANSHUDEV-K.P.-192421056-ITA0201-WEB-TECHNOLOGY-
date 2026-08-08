/**
 * Experiment 8: Digital Clock & Examination Countdown Engine
 * Canvas Analog Clock & Web Audio API Offline Alarm Synthesizer
 */

class ClockApp {
    constructor() {
        this.timerInterval = null;
        this.remainingSeconds = 15 * 60; // Default 15 mins
        this.isTimerRunning = false;
        this.audioCtx = null; // Web Audio API context

        this.initDOM();
        this.bindEvents();
        this.startClocks();
    }

    initDOM() {
        this.digitalTimeEl = document.getElementById('digitalTime');
        this.digitalDateEl = document.getElementById('digitalDate');
        this.timezoneValEl = document.getElementById('timezoneVal');

        this.canvas = document.getElementById('analogClockCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.cdHoursEl = document.getElementById('cdHours');
        this.cdMinutesEl = document.getElementById('cdMinutes');
        this.cdSecondsEl = document.getElementById('cdSeconds');

        this.examPreset = document.getElementById('examPreset');
        this.startBtn = document.getElementById('startTimerBtn');
        this.pauseBtn = document.getElementById('pauseTimerBtn');
        this.resumeBtn = document.getElementById('resumeTimerBtn');
        this.resetBtn = document.getElementById('resetTimerBtn');
        this.testAlarmBtn = document.getElementById('testAlarmBtn');

        this.alarmModal = document.getElementById('alarmModal');
        this.dismissAlarmBtn = document.getElementById('dismissAlarmBtn');
    }

    bindEvents() {
        this.examPreset.addEventListener('change', () => {
            const mins = parseInt(this.examPreset.value);
            if (!isNaN(mins)) {
                this.remainingSeconds = mins * 60;
                this.updateCountdownUI();
            }
        });

        this.startBtn.addEventListener('click', () => this.startCountdown());
        this.pauseBtn.addEventListener('click', () => this.pauseCountdown());
        this.resumeBtn.addEventListener('click', () => this.resumeCountdown());
        this.resetBtn.addEventListener('click', () => this.resetCountdown());
        this.testAlarmBtn.addEventListener('click', () => this.triggerAlarm());

        this.dismissAlarmBtn.addEventListener('click', () => {
            this.alarmModal.classList.remove('active');
        });

        document.getElementById('themeToggleBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }

    startClocks() {
        // Update Digital & Analog Clocks every second
        setInterval(() => {
            this.updateDigitalClock();
            this.drawAnalogClock();
        }, 1000);

        this.updateDigitalClock();
        this.drawAnalogClock();
        this.updateCountdownUI();
    }

    updateDigitalClock() {
        const now = new Date();
        
        // Time HH:MM:SS AM/PM
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeStr = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

        // Date String
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString(undefined, options);

        // Timezone
        const timezoneStr = Intl.DateTimeFormat().resolvedOptions().timeZone;

        this.digitalTimeEl.textContent = timeStr;
        this.digitalDateEl.textContent = dateStr;
        this.timezoneValEl.textContent = timezoneStr;
    }

    drawAnalogClock() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const radius = width / 2 - 10;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, width, height);

        // Clock Outer Ring & Glass Dial
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#6366f1';
        ctx.stroke();

        // Ticks for Hours
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const tickStartX = centerX + Math.cos(angle) * (radius - 12);
            const tickStartY = centerY + Math.sin(angle) * (radius - 12);
            const tickEndX = centerX + Math.cos(angle) * (radius - 4);
            const tickEndY = centerY + Math.sin(angle) * (radius - 4);

            ctx.beginPath();
            ctx.moveTo(tickStartX, tickStartY);
            ctx.lineTo(tickEndX, tickEndY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.stroke();
        }

        // Current Time
        const now = new Date();
        const hr = now.getHours() % 12;
        const min = now.getMinutes();
        const sec = now.getSeconds();

        // Angles
        const hrAngle = (hr * Math.PI) / 6 + (min * Math.PI) / (6 * 60);
        const minAngle = (min * Math.PI) / 30 + (sec * Math.PI) / (30 * 60);
        const secAngle = (sec * Math.PI) / 30;

        // Draw Hour Hand
        this.drawHand(ctx, centerX, centerY, hrAngle, radius * 0.5, 5, '#ffffff');

        // Draw Minute Hand
        this.drawHand(ctx, centerX, centerY, minAngle, radius * 0.7, 3, '#818cf8');

        // Draw Second Hand
        this.drawHand(ctx, centerX, centerY, secAngle, radius * 0.82, 2, '#ef4444');

        // Center Pin Dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
    }

    drawHand(ctx, cx, cy, angle, length, width, color) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle - Math.PI / 2) * length, cy + Math.sin(angle - Math.PI / 2) * length);
        ctx.stroke();
    }

    /* Countdown Timer Handlers */
    startCountdown() {
        if (this.isTimerRunning) return;
        this.isTimerRunning = true;

        this.startBtn.classList.add('hidden');
        this.pauseBtn.classList.remove('hidden');

        this.timerInterval = setInterval(() => {
            if (this.remainingSeconds > 0) {
                this.remainingSeconds--;
                this.updateCountdownUI();
            } else {
                clearInterval(this.timerInterval);
                this.isTimerRunning = false;
                this.triggerAlarm();
            }
        }, 1000);
    }

    pauseCountdown() {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        this.pauseBtn.classList.add('hidden');
        this.resumeBtn.classList.remove('hidden');
    }

    resumeCountdown() {
        this.resumeBtn.classList.add('hidden');
        this.startCountdown();
    }

    resetCountdown() {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        this.startBtn.classList.remove('hidden');
        this.pauseBtn.classList.add('hidden');
        this.resumeBtn.classList.add('hidden');

        const mins = parseInt(this.examPreset.value) || 15;
        this.remainingSeconds = mins * 60;
        this.updateCountdownUI();
    }

    updateCountdownUI() {
        const hrs = Math.floor(this.remainingSeconds / 3600);
        const mins = Math.floor((this.remainingSeconds % 3600) / 60);
        const secs = this.remainingSeconds % 60;

        this.cdHoursEl.textContent = String(hrs).padStart(2, '0');
        this.cdMinutesEl.textContent = String(mins).padStart(2, '0');
        this.cdSecondsEl.textContent = String(secs).padStart(2, '0');
    }

    /* Offline Web Audio API Alarm Synthesizer */
    triggerAlarm() {
        this.alarmModal.classList.add('active');

        try {
            // Synthesize offline beep tone using Web Audio API
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            this.audioCtx = new AudioContext();
            
            // Beep pattern
            const playBeep = (freq, delay, duration) => {
                setTimeout(() => {
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();

                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);

                    osc.start();
                    osc.stop(this.audioCtx.currentTime + duration);
                }, delay);
            };

            // Play 3 consecutive alarm chimes
            playBeep(880, 0, 0.2);
            playBeep(880, 300, 0.2);
            playBeep(1046.5, 600, 0.4);
        } catch (e) {
            console.log('Audio Context Error:', e);
        }
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ClockApp();
});
