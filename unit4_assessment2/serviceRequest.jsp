<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IT Service Request Portal | MVC View Form</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --bg-page: #f8fafc;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
            --danger: #ef4444;
            --radius: 16px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-page);
            color: var(--text-dark);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
            background-image: 
                radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.08) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%);
        }

        .container {
            width: 100%;
            max-width: 650px;
            background: var(--card-bg);
            border-radius: var(--radius);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
            border: 1px solid var(--border-color);
            padding: 2.5rem;
        }

        .header { text-align: center; margin-bottom: 2rem; }

        .badge {
            display: inline-block;
            background: rgba(79, 70, 229, 0.1);
            color: var(--primary);
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 50px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.75rem;
        }

        .header h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.85rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 0.4rem;
        }

        .header p { color: var(--text-muted); font-size: 0.95rem; }

        .error-alert {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-left: 5px solid var(--danger);
            color: #991b1b;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }

        form { display: flex; flex-direction: column; gap: 1.25rem; }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        @media (max-width: 520px) {
            .form-row { grid-template-columns: 1fr; }
        }

        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }

        label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-dark);
        }

        label .req { color: var(--danger); }

        input[type="text"], select, textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            font-family: inherit;
            font-size: 0.95rem;
            border: 1.5px solid var(--border-color);
            border-radius: 8px;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            background-color: #ffffff;
        }

        input:focus, select:focus, textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }

        textarea { resize: vertical; min-height: 100px; }

        .priority-options {
            display: flex;
            gap: 1.5rem;
            margin-top: 0.25rem;
        }

        .priority-option {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
        }

        .priority-option input[type="radio"] { accent-color: var(--primary); }

        .btn-submit {
            margin-top: 1rem;
            background: var(--primary);
            color: #ffffff;
            font-family: 'Outfit', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.85rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.1s;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-submit:hover {
            background: var(--primary-hover);
            transform: translateY(-1px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <span class="badge">MVC Architecture • View Component</span>
            <h1>IT Service Request Portal</h1>
            <p>Submit your technical issue to the IT Helpdesk</p>
        </div>

        <%-- Display Error Message if Validation Failed --%>
        <%
            String errorMessage = (String) request.getAttribute("errorMessage");
            if (errorMessage != null && !errorMessage.isEmpty()) {
        %>
            <div class="error-alert">
                <strong>⚠️ Validation Failed:</strong> <%= errorMessage %>
            </div>
        <%
            }
        %>

        <%-- Question 1: HTML/JSP Form Submitting via POST to ServiceRequestServlet --%>
        <form action="ServiceRequestServlet" method="POST">
            
            <div class="form-row">
                <!-- Employee ID -->
                <div class="form-group">
                    <label for="employeeId">Employee ID <span class="req">*</span></label>
                    <input type="text" id="employeeId" name="employeeId" 
                           value="<%= request.getAttribute("empId") != null ? request.getAttribute("empId") : "" %>" 
                           placeholder="e.g. EMP-4092" required>
                </div>

                <!-- Employee Name -->
                <div class="form-group">
                    <label for="employeeName">Employee Name <span class="req">*</span></label>
                    <input type="text" id="employeeName" name="employeeName" 
                           value="<%= request.getAttribute("empName") != null ? request.getAttribute("empName") : "" %>" 
                           placeholder="e.g. Alex Mercer" required>
                </div>
            </div>

            <!-- Department -->
            <div class="form-group">
                <label for="department">Department <span class="req">*</span></label>
                <select id="department" name="department" required>
                    <option value="" disabled selected>-- Select Department --</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance & Operations">Finance & Operations</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                </select>
            </div>

            <div class="form-row">
                <!-- Problem Category -->
                <div class="form-group">
                    <label for="problemCategory">Problem Category <span class="req">*</span></label>
                    <select id="problemCategory" name="problemCategory" required>
                        <option value="" disabled selected>-- Select Category --</option>
                        <option value="Network">Network</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Account">Account</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <!-- Priority -->
                <div class="form-group">
                    <label>Priority Level <span class="req">*</span></label>
                    <div class="priority-options">
                        <label class="priority-option">
                            <input type="radio" name="priority" value="Low" required> Low
                        </label>
                        <label class="priority-option">
                            <input type="radio" name="priority" value="Medium" checked> Medium
                        </label>
                        <label class="priority-option">
                            <input type="radio" name="priority" value="High"> High
                        </label>
                    </div>
                </div>
            </div>

            <!-- Problem Description (Multi-line text area) -->
            <div class="form-group">
                <label for="problemDescription">Problem Description <span class="req">*</span></label>
                <textarea id="problemDescription" name="problemDescription" 
                          placeholder="Provide detailed description of the technical issue encountered..." required><%= request.getAttribute("description") != null ? request.getAttribute("description") : "" %></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-submit">
                📩 Submit Service Request
            </button>
        </form>
    </div>
</body>
</html>
