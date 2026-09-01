/**
 * CO4 AT-1 | XML & XPath Interactive Workbench Script
 * Handles XML DOM parsing, dynamic CRUD operations (Add, Edit, Delete course records),
 * live XPath evaluation, and dynamic XSLT transformation rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial XML Data string
    const defaultXmlString = `<?xml version="1.0" encoding="UTF-8"?>
<courses>
    <course id="C101">
        <code>WEB301</code>
        <name>Web Technology</name>
        <faculty>Dr. Arun</faculty>
        <students>58</students>
        <credits>4</credits>
        <type>Theory</type>
    </course>
    <course id="C102">
        <code>AI302</code>
        <name>Artificial Intelligence</name>
        <faculty>Dr. Meena</faculty>
        <students>72</students>
        <credits>4</credits>
        <type>Theory</type>
    </course>
    <course id="C103">
        <code>WEB303</code>
        <name>Web Technology Laboratory</name>
        <faculty>Dr. Ravi</faculty>
        <students>36</students>
        <credits>2</credits>
        <type>Practical</type>
    </course>
    <course id="C104">
        <code>ML304</code>
        <name>Machine Learning</name>
        <faculty>Dr. Priya</faculty>
        <students>64</students>
        <credits>4</credits>
        <type>Theory</type>
    </course>
    <course id="C105">
        <code>DB305</code>
        <name>Database Systems</name>
        <faculty>Dr. Kumar</faculty>
        <students>42</students>
        <credits>3</credits>
        <type>Theory</type>
    </course>
</courses>`;

    // Active XML DOM Document
    let xmlDoc = parseXml(defaultXmlString);

    // DOM References
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Form elements
    const courseForm = document.getElementById('courseForm');
    const editCourseIdInput = document.getElementById('editCourseId');
    const courseIdInput = document.getElementById('courseId');
    const courseCodeInput = document.getElementById('courseCode');
    const courseNameInput = document.getElementById('courseName');
    const facultyNameInput = document.getElementById('facultyName');
    const studentCountInput = document.getElementById('studentCount');
    const creditWeightInput = document.getElementById('creditWeight');
    const courseTypeSelect = document.getElementById('courseType');

    const formTitle = document.getElementById('formTitle');
    const editModeBadge = document.getElementById('editModeBadge');
    const saveCourseBtn = document.getElementById('saveCourseBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const resetXmlBtn = document.getElementById('resetXmlBtn');

    // Display elements
    const xmlCourseTableBody = document.getElementById('xmlCourseTableBody');
    const rawXmlDisplay = document.getElementById('rawXmlDisplay');
    const recordCountBadge = document.getElementById('recordCountBadge');
    const copyXmlBtn = document.getElementById('copyXmlBtn');

    // XPath elements
    const xpathInput = document.getElementById('xpathInput');
    const evaluateXpathBtn = document.getElementById('evaluateXpathBtn');
    const xpathOutputView = document.getElementById('xpathOutputView');
    const xpathResultCount = document.getElementById('xpathResultCount');
    const presetButtons = document.querySelectorAll('.btn-preset');

    // XSLT elements
    const filterStudentsThreshold = document.getElementById('filterStudentsThreshold');
    const thresholdValDisplay = document.getElementById('thresholdValDisplay');
    const sortOrderSelect = document.getElementById('sortOrderSelect');
    const applyXsltBtn = document.getElementById('applyXsltBtn');
    const xsltRenderOutput = document.getElementById('xsltRenderOutput');

    // 1. Navigation Tab Switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Trigger updates if tab requires fresh view
            if (tabId === 'tab-xpath') evaluateXPath();
            if (tabId === 'tab-xslt') renderXsltView();
        });
    });

    // 2. Parse XML String into DOM Document
    function parseXml(xmlStr) {
        const parser = new DOMParser();
        return parser.parseFromString(xmlStr, "application/xml");
    }

    // 3. Serialize XML DOM back to String
    function serializeXml(doc) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
    }

    // Format XML String cleanly
    function formatXml(xmlStr) {
        let formatted = '';
        let indent = '';
        const tab = '    ';
        xmlStr.split(/>\s*</).forEach(node => {
            if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
            formatted += indent + '<' + node + '>\n';
            if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith("?")) indent += tab;
        });
        return formatted.substring(1, formatted.length - 2);
    }

    // 4. Render Table and Code Display
    function renderXmlViews() {
        const courses = xmlDoc.getElementsByTagName('course');
        recordCountBadge.textContent = `${courses.length} Records`;

        // Render Table Body
        xmlCourseTableBody.innerHTML = '';
        Array.from(courses).forEach(course => {
            const id = course.getAttribute('id') || '';
            const code = getTagValue(course, 'code');
            const name = getTagValue(course, 'name');
            const faculty = getTagValue(course, 'faculty');
            const students = getTagValue(course, 'students');
            const credits = getTagValue(course, 'credits');
            const type = getTagValue(course, 'type');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code>${id}</code></td>
                <td><code>${code}</code></td>
                <td><strong>${name}</strong></td>
                <td>${faculty}</td>
                <td><strong>${students}</strong></td>
                <td>${credits}</td>
                <td><span class="badge ${type === 'Theory' ? 'badge-accent' : 'badge-primary'}">${type}</span></td>
                <td>
                    <div class="action-btns">
                        <button type="button" class="btn-edit-row" data-id="${id}">✏️ Edit</button>
                        <button type="button" class="btn-delete-row" data-id="${id}">🗑️ Delete</button>
                    </div>
                </td>
            `;
            xmlCourseTableBody.appendChild(tr);
        });

        // Attach action handlers
        document.querySelectorAll('.btn-edit-row').forEach(b => {
            b.addEventListener('click', (e) => editCourseRecord(e.target.getAttribute('data-id')));
        });
        document.querySelectorAll('.btn-delete-row').forEach(b => {
            b.addEventListener('click', (e) => deleteCourseRecord(e.target.getAttribute('data-id')));
        });

        // Display formatted raw XML
        rawXmlDisplay.textContent = formatXml(serializeXml(xmlDoc));
    }

    function getTagValue(parent, tagName) {
        const node = parent.getElementsByTagName(tagName)[0];
        return node ? node.textContent : '';
    }

    // 5. Add / Update Course Record
    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const editId = editCourseIdInput.value;
        const idVal = courseIdInput.value.trim();
        const codeVal = courseCodeInput.value.trim();
        const nameVal = courseNameInput.value.trim();
        const facultyVal = facultyNameInput.value.trim();
        const studentsVal = studentCountInput.value.trim();
        const creditsVal = creditWeightInput.value.trim();
        const typeVal = courseTypeSelect.value;

        if (!idVal || !codeVal || !nameVal || !facultyVal || !studentsVal || !creditsVal) {
            alert('Please fill out all required fields.');
            return;
        }

        if (editId) {
            // Update existing node
            const courseNode = xmlDoc.querySelector(`course[id="${editId}"]`);
            if (courseNode) {
                courseNode.setAttribute('id', idVal);
                setTagValue(courseNode, 'code', codeVal);
                setTagValue(courseNode, 'name', nameVal);
                setTagValue(courseNode, 'faculty', facultyVal);
                setTagValue(courseNode, 'students', studentsVal);
                setTagValue(courseNode, 'credits', creditsVal);
                setTagValue(courseNode, 'type', typeVal);
            }
        } else {
            // Add new <course> element
            const newCourse = xmlDoc.createElement('course');
            newCourse.setAttribute('id', idVal);

            const codeNode = xmlDoc.createElement('code');
            codeNode.textContent = codeVal;
            const nameNode = xmlDoc.createElement('name');
            nameNode.textContent = nameVal;
            const facultyNode = xmlDoc.createElement('faculty');
            facultyNode.textContent = facultyVal;
            const studentsNode = xmlDoc.createElement('students');
            studentsNode.textContent = studentsVal;
            const creditsNode = xmlDoc.createElement('credits');
            creditsNode.textContent = creditsVal;
            const typeNode = xmlDoc.createElement('type');
            typeNode.textContent = typeVal;

            newCourse.appendChild(codeNode);
            newCourse.appendChild(nameNode);
            newCourse.appendChild(facultyNode);
            newCourse.appendChild(studentsNode);
            newCourse.appendChild(creditsNode);
            newCourse.appendChild(typeNode);

            xmlDoc.querySelector('courses').appendChild(newCourse);
        }

        resetFormState();
        renderXmlViews();
    });

    function setTagValue(parent, tagName, val) {
        let node = parent.getElementsByTagName(tagName)[0];
        if (!node) {
            node = xmlDoc.createElement(tagName);
            parent.appendChild(node);
        }
        node.textContent = val;
    }

    function editCourseRecord(id) {
        const courseNode = xmlDoc.querySelector(`course[id="${id}"]`);
        if (!courseNode) return;

        editCourseIdInput.value = id;
        courseIdInput.value = id;
        courseCodeInput.value = getTagValue(courseNode, 'code');
        courseNameInput.value = getTagValue(courseNode, 'name');
        facultyNameInput.value = getTagValue(courseNode, 'faculty');
        studentCountInput.value = getTagValue(courseNode, 'students');
        creditWeightInput.value = getTagValue(courseNode, 'credits');
        courseTypeSelect.value = getTagValue(courseNode, 'type');

        formTitle.innerHTML = '<span>✏️</span> Edit Course Record';
        editModeBadge.classList.remove('hidden');
        cancelEditBtn.classList.remove('hidden');
        saveCourseBtn.innerHTML = '<span>💾</span> Save Changes';
    }

    function deleteCourseRecord(id) {
        if (confirm(`Are you sure you want to delete course ${id}?`)) {
            const courseNode = xmlDoc.querySelector(`course[id="${id}"]`);
            if (courseNode) {
                courseNode.parentNode.removeChild(courseNode);
                renderXmlViews();
            }
        }
    }

    cancelEditBtn.addEventListener('click', resetFormState);

    function resetFormState() {
        courseForm.reset();
        editCourseIdInput.value = '';
        formTitle.innerHTML = '<span>➕</span> Add New Course Record';
        editModeBadge.classList.add('hidden');
        cancelEditBtn.classList.add('hidden');
        saveCourseBtn.innerHTML = '<span>✨</span> Add Course to XML';
    }

    resetXmlBtn.addEventListener('click', () => {
        if (confirm('Reset XML document back to default dataset?')) {
            xmlDoc = parseXml(defaultXmlString);
            resetFormState();
            renderXmlViews();
        }
    });

    copyXmlBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(rawXmlDisplay.textContent);
        alert('XML copied to clipboard!');
    });

    // 6. XPath Evaluator Implementation
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            xpathInput.value = btn.getAttribute('data-xpath');
            evaluateXPath();
        });
    });

    evaluateXpathBtn.addEventListener('click', evaluateXPath);

    function evaluateXPath() {
        const expression = xpathInput.value.trim();
        xpathOutputView.innerHTML = '';

        if (!expression) {
            xpathResultCount.textContent = '0 Matches';
            return;
        }

        try {
            const evaluator = new XPathEvaluator();
            const result = evaluator.evaluate(expression, xmlDoc, null, XPathResult.ANY_TYPE, null);

            let node = result.iterateNext();
            let count = 0;

            while (node) {
                count++;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('xpath-node-item');

                if (node.nodeType === Node.ELEMENT_NODE) {
                    itemDiv.textContent = serializeXml(node);
                } else {
                    itemDiv.textContent = node.textContent;
                }

                xpathOutputView.appendChild(itemDiv);
                node = result.iterateNext();
            }

            xpathResultCount.textContent = `${count} ${count === 1 ? 'Match' : 'Matches'}`;

            if (count === 0) {
                xpathOutputView.innerHTML = `<div class="xpath-node-item" style="color: var(--text-muted);">No nodes matched expression "${expression}".</div>`;
            }
        } catch (err) {
            xpathResultCount.textContent = 'Error';
            xpathOutputView.innerHTML = `<div class="xpath-node-item" style="border-left-color: var(--danger); color: var(--danger);"><strong>XPath Syntax Error:</strong> ${err.message}</div>`;
        }
    }

    // 7. XSLT Dynamic Renderer Emulation
    filterStudentsThreshold.addEventListener('input', (e) => {
        thresholdValDisplay.textContent = e.target.value;
        renderXsltView();
    });

    sortOrderSelect.addEventListener('change', renderXsltView);
    applyXsltBtn.addEventListener('click', renderXsltView);

    function renderXsltView() {
        const threshold = parseInt(filterStudentsThreshold.value, 10);
        const sortVal = sortOrderSelect.value;

        const courses = Array.from(xmlDoc.getElementsByTagName('course'));

        // Filter: students > threshold
        const filtered = courses.filter(c => {
            const count = parseInt(getTagValue(c, 'students'), 10);
            return count > threshold;
        });

        // Sort
        filtered.sort((a, b) => {
            const sA = parseInt(getTagValue(a, 'students'), 10);
            const sB = parseInt(getTagValue(b, 'students'), 10);
            const cA = parseInt(getTagValue(a, 'credits'), 10);
            const cB = parseInt(getTagValue(b, 'credits'), 10);
            const codeA = getTagValue(a, 'code');
            const codeB = getTagValue(b, 'code');

            if (sortVal === 'students-desc') return sB - sA;
            if (sortVal === 'students-asc') return sA - sB;
            if (sortVal === 'credits-desc') return cB - cA;
            if (sortVal === 'code-asc') return codeA.localeCompare(codeB);
            return 0;
        });

        // Render HTML Table
        let tableHtml = `
            <div style="padding: 1.5rem;">
                <h3 style="font-family: var(--font-heading); color: var(--text-primary); margin-bottom: 0.25rem;">Transformed High Enrollment Courses Table</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Displaying courses with &gt; ${threshold} students (${filtered.length} matching)</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #4f46e5; color: #fff;">
                            <th style="padding: 0.75rem 1rem; text-align: left;">Course Code</th>
                            <th style="padding: 0.75rem 1rem; text-align: left;">Course Name</th>
                            <th style="padding: 0.75rem 1rem; text-align: left;">Faculty</th>
                            <th style="padding: 0.75rem 1rem; text-align: left;">Students</th>
                            <th style="padding: 0.75rem 1rem; text-align: left;">Credits</th>
                            <th style="padding: 0.75rem 1rem; text-align: left;">Type</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        if (filtered.length === 0) {
            tableHtml += `<tr><td colspan="6" style="padding: 2rem; text-align: center; color: var(--text-muted);">No courses meet the criteria (students &gt; ${threshold}).</td></tr>`;
        } else {
            filtered.forEach(c => {
                const code = getTagValue(c, 'code');
                const name = getTagValue(c, 'name');
                const faculty = getTagValue(c, 'faculty');
                const students = getTagValue(c, 'students');
                const credits = getTagValue(c, 'credits');
                const type = getTagValue(c, 'type');

                tableHtml += `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.75rem 1rem;"><code>${code}</code></td>
                        <td style="padding: 0.75rem 1rem;"><strong>${name}</strong></td>
                        <td style="padding: 0.75rem 1rem;">${faculty}</td>
                        <td style="padding: 0.75rem 1rem; font-weight: 700;">${students}</td>
                        <td style="padding: 0.75rem 1rem;">${credits}</td>
                        <td style="padding: 0.75rem 1rem;"><span class="badge ${type === 'Theory' ? 'badge-accent' : 'badge-primary'}">${type}</span></td>
                    </tr>
                `;
            });
        }

        tableHtml += `</tbody></table></div>`;
        xsltRenderOutput.innerHTML = tableHtml;
    }

    // Initial Render
    renderXmlViews();
    evaluateXPath();
    renderXsltView();
});
