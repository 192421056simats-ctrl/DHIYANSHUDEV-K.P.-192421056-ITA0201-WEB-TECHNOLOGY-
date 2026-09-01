<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.itsupport.model.ServiceRequest" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Acknowledgement | IT Service Management</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4f46e5;
            --success: #10b981;
            --success-bg: #dcfce7;
            --success-text: #15803d;
            --bg-page: #f8fafc;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --radius: 20px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-page);
            color: var(--text-dark);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem 1rem;
        }

        .ack-container {
            width: 100%;
            max-width: 680px;
            background: #ffffff;
            border-radius: var(--radius);
            box-shadow: 0 20px 30px -10px rgba(0,0,0,0.08);
            border: 1px solid var(--border-color);
            padding: 2.5rem;
        }

        .header { text-align: center; margin-bottom: 2rem; }

        .status-badge {
            display: inline-block;
            padding: 0.4rem 1.2rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.9rem;
            background-color: var(--success-bg);
            color: var(--success-text);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.75rem;
        }

        .header h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.85rem;
            color: var(--text-dark);
            margin-bottom: 0.3rem;
        }

        .req-no-box {
            background: linear-gradient(135deg, #1e1b4b, #312e81);
            color: #ffffff;
            padding: 1.25rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 1.75rem;
        }

        .req-no-box .num {
            font-family: 'Outfit', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: #a855f7;
        }

        .req-no-box .lbl {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #c7d2fe;
        }

        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            background: #f8fafc;
            padding: 1.25rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 1.5rem;
        }

        .detail-item label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .detail-item span {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-dark);
        }

        .desc-box {
            background: #f8fafc;
            padding: 1.25rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            margin-bottom: 2rem;
        }

        .desc-box label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            margin-bottom: 0.3rem;
        }

        .desc-box p { font-size: 0.95rem; line-height: 1.5; color: var(--text-dark); }

        /* MVC Architecture Explanation Box */
        .mvc-explanation-card {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 2rem;
        }

        .mvc-explanation-card h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem;
            color: #166534;
            margin-bottom: 0.75rem;
        }

        .mvc-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
            font-size: 0.85rem;
        }

        .mvc-table th, .mvc-table td {
            padding: 0.6rem 0.8rem;
            text-align: left;
            border-bottom: 1px solid #dcfce7;
        }

        .mvc-table th { background: #dcfce7; color: #166534; text-transform: uppercase; }

        .flow-steps { font-size: 0.875rem; color: #15803d; line-height: 1.6; }
        .flow-steps ol { padding-left: 1.2rem; }

        .btn-new {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--primary);
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
    </style>
</head>
<body>
    <div class="ack-container">
        
        <%-- Retrieve Request Attributes set by Controller Servlet --%>
        <%
            ServiceRequest reqObj = (ServiceRequest) request.getAttribute("serviceRequest");
            String reqNum = (String) request.getAttribute("requestNumber");
        %>

        <div class="header">
            <span class="status-badge">✅ Request Submitted Successfully</span>
            <h1>Service Request Acknowledgement</h1>
            <p>Your IT issue has been logged and assigned to the support desk</p>
        </div>

        <div class="req-no-box">
            <div class="num"><%= reqNum != null ? reqNum : "SR-1001" %></div>
            <div class="lbl">Service Request Ticket Number</div>
        </div>

        <% if (reqObj != null) { %>
        <div class="details-grid">
            <div class="detail-item">
                <label>Employee ID</label>
                <span><%= reqObj.getEmployeeId() %></span>
            </div>
            <div class="detail-item">
                <label>Employee Name</label>
                <span><%= reqObj.getEmployeeName() %></span>
            </div>
            <div class="detail-item">
                <label>Department</label>
                <span><%= reqObj.getDepartment() %></span>
            </div>
            <div class="detail-item">
                <label>Problem Category</label>
                <span><%= reqObj.getProblemCategory() %></span>
            </div>
            <div class="detail-item">
                <label>Priority Level</label>
                <span><%= reqObj.getPriority() %></span>
            </div>
            <div class="detail-item">
                <label>Ticket Status</label>
                <span>OPEN / ASSIGNED</span>
            </div>
        </div>

        <div class="desc-box">
            <label>Problem Description</label>
            <p><%= reqObj.getProblemDescription() %></p>
        </div>
        <% } %>

        <!-- Question 4c & 4d: MVC Component Mapping & Architecture Explanation -->
        <div class="mvc-explanation-card">
            <h3>📐 MVC Architecture Component Mapping &amp; Request Flow</h3>
            
            <table class="mvc-table">
                <thead>
                    <tr><th>MVC Role</th><th>Application Component</th><th>Responsibility</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Model</strong></td><td><code>ServiceRequest.java</code></td><td>Holds service request state &amp; data attributes without UI code.</td></tr>
                    <tr><td><strong>View</strong></td><td><code>serviceRequest.jsp</code> &amp; <code>acknowledgement.jsp</code></td><td>Presents HTML form inputs and renders processing results.</td></tr>
                    <tr><td><strong>Controller</strong></td><td><code>ServiceRequestServlet.java</code></td><td>Intercepts POST request, validates input, updates Model, forwards view.</td></tr>
                </tbody>
            </table>

            <div class="flow-steps">
                <strong>Execution Flow Explanation:</strong>
                <ol>
                    <li><strong>Form Submission (View)</strong>: Employee fills inputs on <code>serviceRequest.jsp</code> and posts to <code>ServiceRequestServlet</code>.</li>
                    <li><strong>Request Processing (Controller)</strong>: Servlet receives POST request in <code>doPost()</code> and reads parameters via <code>request.getParameter()</code>.</li>
                    <li><strong>Server-Side Validation</strong>: Servlet validates mandatory fields; if invalid, forwards back to form with error messages.</li>
                    <li><strong>Model Instantiation (Model)</strong>: Servlet instantiates a <code>ServiceRequest</code> Java object and populates its properties.</li>
                    <li><strong>Request Attribute Binding</strong>: Servlet generates ticket ID (e.g. <code>SR-1001</code>) and attaches Model object to <code>HttpServletRequest</code> attributes.</li>
                    <li><strong>View Forwarding (Result View)</strong>: Servlet invokes <code>RequestDispatcher.forward()</code> to stream <code>acknowledgement.jsp</code> output back to browser.</li>
                </ol>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="serviceRequest.jsp" class="btn-new">➕ Submit Another Service Request</a>
        </div>

    </div>
</body>
</html>
