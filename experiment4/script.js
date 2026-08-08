/**
 * Experiment 4: Student Result Analysis System
 * JavaScript Logic: Arrays, Objects, Math methods, & Pure Canvas Chart Rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    initResultAnalysis();
    initThemeToggle();
});

const subjectCatalog = [
    { id: 'sub1', code: 'CS601', title: 'Web Technology' },
    { id: 'sub2', code: 'CS602', title: 'Data Structures' },
    { id: 'sub3', code: 'CS603', title: 'Operating Systems' },
    { id: 'sub4', code: 'CS604', title: 'Database Management' },
    { id: 'sub5', code: 'CS605', title: 'Computer Networks' }
];

function initResultAnalysis() {
    const form = document.getElementById('resultForm');
    const loadSampleBtn = document.getElementById('loadSampleBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAndRenderResults();
    });

    loadSampleBtn.addEventListener('click', () => {
        document.getElementById('studentName').value = 'Dhiyanshu Dev K.P.';
        document.getElementById('rollNumber').value = '192421056';
        document.getElementById('sub1').value = 92;
        document.getElementById('sub2').value = 89;
        document.getElementById('sub3').value = 94;
        document.getElementById('sub4').value = 86;
        document.getElementById('sub5').value = 82;
        calculateAndRenderResults();
    });

    // Initial calculation on page load
    calculateAndRenderResults();
}

/**
 * Calculates metrics using JS Arrays, Loops, & Math built-ins
 */
function calculateAndRenderResults() {
    const studentName = document.getElementById('studentName').value || 'Student';
    const rollNumber = document.getElementById('rollNumber').value || 'N/A';

    // 1. Gather Marks into an Array of Objects
    const resultsData = subjectCatalog.map(sub => {
        const inputVal = parseFloat(document.getElementById(sub.id).value) || 0;
        const mark = Math.min(100, Math.max(0, inputVal)); // Clamp between 0 and 100
        return {
            code: sub.code,
            title: sub.title,
            mark: mark,
            grade: calculateGrade(mark)
        };
    });

    // 2. Perform Calculations using JS Array methods & Math functions
    const marksArray = resultsData.map(item => item.mark);
    
    // Total calculation via Loop
    let total = 0;
    for (let i = 0; i < marksArray.length; i++) {
        total += marksArray[i];
    }

    const average = total / marksArray.length;
    const percentage = (total / (marksArray.length * 100)) * 100;
    
    // Math.max and Math.min usage
    const highestMark = Math.max(...marksArray);
    const lowestMark = Math.min(...marksArray);

    const highestSubject = resultsData.find(item => item.mark === highestMark);
    const lowestSubject = resultsData.find(item => item.mark === lowestMark);

    const overallGrade = calculateGrade(average);
    const isPassed = marksArray.every(mark => mark >= 40);

    // 3. Update DOM Metrics
    document.getElementById('totalMarksVal').textContent = `${total} / ${resultsData.length * 100}`;
    document.getElementById('avgPercentageVal').textContent = `${average.toFixed(1)}%`;
    document.getElementById('highestMarkVal').textContent = `${highestMark} (${highestSubject.code})`;
    document.getElementById('lowestMarkVal').textContent = `${lowestMark} (${lowestSubject.code})`;
    document.getElementById('overallGradeVal').textContent = `Grade ${overallGrade}`;
    
    const resultEl = document.getElementById('resultStatusVal');
    resultEl.textContent = isPassed ? 'PASSED' : 'FAILED';
    resultEl.className = `m-val result-badge ${isPassed ? 'pass' : 'fail'}`;

    // 4. Populate Table
    const tableBody = document.getElementById('marksTableBody');
    tableBody.innerHTML = resultsData.map(item => `
        <tr>
            <td><strong>${item.code}</strong></td>
            <td>${item.title}</td>
            <td>100</td>
            <td><strong>${item.mark}</strong></td>
            <td><span class="badge">${item.grade}</span></td>
            <td>
                <div class="tbl-progress-bg">
                    <div class="tbl-progress-fill" style="width: ${item.mark}%;"></div>
                </div>
                <span>${item.mark}%</span>
            </td>
        </tr>
    `).join('');

    // 5. Draw Canvas Charts
    renderBarChart('barChartCanvas', resultsData);
    renderDoughnutChart('doughnutChartCanvas', resultsData);
}

/**
 * Grade evaluation helper
 */
function calculateGrade(score) {
    if (score >= 90) return 'S';
    if (score >= 80) return 'A+';
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'F';
}

/**
 * Pure Vanilla HTML5 Canvas Bar Chart Renderer
 */
function renderBarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Padding & dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length - 20;

    // Draw Grid Lines & Y-Axis Labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '11px sans-serif';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
        const yVal = 100 - i * 20;
        const yPos = padding + (chartHeight / 5) * i;
        
        ctx.beginPath();
        ctx.moveTo(padding, yPos);
        ctx.lineTo(width - padding, yPos);
        ctx.stroke();

        ctx.fillText(yVal.toString(), 12, yPos + 4);
    }

    // Draw Bars
    data.forEach((item, index) => {
        const xPos = padding + index * (barWidth + 20) + 10;
        const barH = (item.mark / 100) * chartHeight;
        const yPos = height - padding - barH;

        // Gradient Bar
        const gradient = ctx.createLinearGradient(0, yPos, 0, height - padding);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#a855f7');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(xPos, yPos, barWidth, barH, [6, 6, 0, 0]);
        ctx.fill();

        // Draw Value Label on top of bar
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.mark, xPos + barWidth / 2, yPos - 8);

        // Draw Subject Code on X-axis
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '11px sans-serif';
        ctx.fillText(item.code, xPos + barWidth / 2, height - 15);
    });
}

/**
 * Pure Vanilla HTML5 Canvas Doughnut Chart Renderer
 */
function renderDoughnutChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 3 + 20;
    const centerY = height / 2;
    const outerRadius = 90;
    const innerRadius = 55;

    const totalMarks = data.reduce((acc, curr) => acc + curr.mark, 0);

    const colors = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'];

    let startAngle = -Math.PI / 2;

    // Draw Doughnut Slices
    data.forEach((item, index) => {
        const sliceAngle = (item.mark / totalMarks) * (2 * Math.PI);
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();

        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        startAngle = endAngle;
    });

    // Inner Circle Hole Text (Percentage Average)
    const avgScore = (totalMarks / data.length).toFixed(1);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${avgScore}%`, centerX, centerY + 6);

    // Draw Legend on the right side
    const legendX = width / 1.6;
    let legendY = 60;

    data.forEach((item, index) => {
        // Color box
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(legendX, legendY, 14, 14);

        // Text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.code}: ${item.mark} marks`, legendX + 22, legendY + 11);

        legendY += 35;
    });
}

function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        calculateAndRenderResults(); // Re-render canvas for theme contrast
    });
}
