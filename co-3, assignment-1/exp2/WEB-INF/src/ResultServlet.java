package com.college.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Experiment 2: Servlet-Based Student Result Processing
 * 
 * Concepts Assessed: Servlet architecture, doPost(), parameter handling, 
 * dynamic content generation, validation, request/response objects, 
 * basic servlet concurrency awareness (thread safety using local variables).
 */
@WebServlet("/ResultServlet")
public class ResultServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * Handles HTTP POST requests submitted from the HTML student mark entry form.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Set response content type to HTML with UTF-8 encoding
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        /* 
         * THREAD SAFETY / CONCURRENCY NOTE:
         * Servlets in Servlet containers (like Tomcat) are singletons per mapping 
         * and execute concurrently across multiple threads.
         * By storing all student data, inputs, and calculated results in LOCAL 
         * variables inside doPost(), each request maintains its own stack frame.
         * No shared instance variables are mutated, ensuring strict thread safety.
         */

        // 1. Read Request Parameters using request.getParameter()
        String studentName = request.getParameter("studentName");
        String regNumber = request.getParameter("regNumber");
        String m1Str = request.getParameter("mark1");
        String m2Str = request.getParameter("mark2");
        String m3Str = request.getParameter("mark3");

        // Local data structures for validation
        boolean hasError = false;
        StringBuilder errorMessages = new StringBuilder();

        // 2. Perform Server-Side Validation for Missing Values
        if (studentName == null || studentName.trim().isEmpty()) {
            hasError = true;
            errorMessages.append("<li>Student Name is required.</li>");
        } else {
            studentName = studentName.trim();
        }

        if (regNumber == null || regNumber.trim().isEmpty()) {
            hasError = true;
            errorMessages.append("<li>Register Number is required.</li>");
        } else {
            regNumber = regNumber.trim();
        }

        int mark1 = 0, mark2 = 0, mark3 = 0;

        // Parse and validate Mark 1
        try {
            if (m1Str == null || m1Str.trim().isEmpty()) {
                hasError = true;
                errorMessages.append("<li>Subject 1 Mark is required.</li>");
            } else {
                mark1 = Integer.parseInt(m1Str.trim());
                if (mark1 < 0 || mark1 > 100) {
                    hasError = true;
                    errorMessages.append("<li>Subject 1 Mark (").append(mark1).append(") must be between 0 and 100.</li>");
                }
            }
        } catch (NumberFormatException e) {
            hasError = true;
            errorMessages.append("<li>Subject 1 Mark must be a valid integer number.</li>");
        }

        // Parse and validate Mark 2
        try {
            if (m2Str == null || m2Str.trim().isEmpty()) {
                hasError = true;
                errorMessages.append("<li>Subject 2 Mark is required.</li>");
            } else {
                mark2 = Integer.parseInt(m2Str.trim());
                if (mark2 < 0 || mark2 > 100) {
                    hasError = true;
                    errorMessages.append("<li>Subject 2 Mark (").append(mark2).append(") must be between 0 and 100.</li>");
                }
            }
        } catch (NumberFormatException e) {
            hasError = true;
            errorMessages.append("<li>Subject 2 Mark must be a valid integer number.</li>");
        }

        // Parse and validate Mark 3
        try {
            if (m3Str == null || m3Str.trim().isEmpty()) {
                hasError = true;
                errorMessages.append("<li>Subject 3 Mark is required.</li>");
            } else {
                mark3 = Integer.parseInt(m3Str.trim());
                if (mark3 < 0 || mark3 > 100) {
                    hasError = true;
                    errorMessages.append("<li>Subject 3 Mark (").append(mark3).append(") must be between 0 and 100.</li>");
                }
            }
        } catch (NumberFormatException e) {
            hasError = true;
            errorMessages.append("<li>Subject 3 Mark must be a valid integer number.</li>");
        }

        // Handle Validation Errors Page Output
        if (hasError) {
            renderErrorPage(out, errorMessages.toString());
            return;
        }

        // 3. Perform Calculations (Total, Average, Highest, Pass/Fail)
        int total = mark1 + mark2 + mark3;
        double average = total / 3.0;
        int highestMark = Math.max(mark1, Math.max(mark2, mark3));

        // Pass condition: Minimum 40 marks required in each subject
        boolean isPassed = (mark1 >= 40 && mark2 >= 40 && mark3 >= 40);
        String status = isPassed ? "PASSED" : "FAILED";

        // 4. Generate Dynamic HTML Output using PrintWriter
        renderResultPage(out, studentName, regNumber, mark1, mark2, mark3, total, average, highestMark, status, isPassed);
    }

    /**
     * Renders a styled Validation Error response page.
     */
    private void renderErrorPage(PrintWriter out, String errorListHtml) {
        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'><title>Validation Error | Student Result</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fef2f2; color: #991b1b; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }");
        out.println(".error-card { background: #ffffff; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-left: 6px solid #dc2626; max-width: 500px; width: 90%; }");
        out.println("h2 { color: #dc2626; margin-top: 0; font-size: 1.5rem; }");
        out.println("ul { padding-left: 1.2rem; line-height: 1.6; }");
        out.println("li { margin-bottom: 0.5rem; }");
        out.println(".btn-back { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background-color: #dc2626; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; transition: background-color 0.2s; }");
        out.println(".btn-back:hover { background-color: #b91c1c; }");
        out.println("</style>");
        out.println("</head>");
        out.println("body>");
        out.println("<div class='error-card'>");
        out.println("<h2>⚠️ Form Validation Failed</h2>");
        out.println("<p>Please fix the following error(s) before submitting:</p>");
        out.println("<ul>" + errorListHtml + "</ul>");
        out.println("<a href='javascript:history.back()' class='btn-back'>← Go Back & Correct Form</a>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    /**
     * Renders a dynamic, styled Student Performance Result page.
     */
    private void renderResultPage(PrintWriter out, String name, String regNo, 
                                  int m1, int m2, int m3, int total, double avg, 
                                  int highest, String status, boolean isPassed) {
        
        String badgeBg = isPassed ? "#dcfce7" : "#fee2e2";
        String badgeColor = isPassed ? "#15803d" : "#b91c1c";

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'><title>Student Performance Result | " + name + "</title>");
        out.println("<style>");
        out.println("@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');");
        out.println("body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #1e293b; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }");
        out.println(".result-card { background: #ffffff; border-radius: 20px; box-shadow: 0 20px 30px -10px rgba(0,0,0,0.08); width: 100%; max-width: 600px; padding: 2.5rem; border: 1px solid #e2e8f0; }");
        out.println(".result-header { text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }");
        out.println(".result-header h1 { font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin: 0 0 0.5rem 0; color: #0f172a; }");
        out.println(".status-badge { display: inline-block; padding: 0.4rem 1.2rem; border-radius: 50px; font-weight: 700; font-size: 0.95rem; background-color: " + badgeBg + "; color: " + badgeColor + "; letter-spacing: 1px; }");
        out.println(".info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background-color: #f8fafc; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; }");
        out.println(".info-item label { display: block; font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }");
        out.println(".info-item span { font-size: 1.05rem; font-weight: 700; color: #0f172a; }");
        out.println("table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }");
        out.println("th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }");
        out.println("th { background-color: #f1f5f9; font-family: 'Outfit', sans-serif; font-weight: 600; color: #475569; font-size: 0.85rem; text-transform: uppercase; }");
        out.println("td { font-size: 0.95rem; font-weight: 500; }");
        out.println(".stats-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.75rem; }");
        out.println(".stat-box { background: #f1f5f9; padding: 1rem; border-radius: 12px; text-align: center; }");
        out.println(".stat-box .stat-val { font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 700; color: #4f46e5; }");
        out.println(".stat-box .stat-lbl { font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; margin-top: 0.25rem; }");
        out.println(".actions { text-align: center; }");
        out.println(".btn-again { display: inline-block; padding: 0.8rem 1.75rem; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-family: 'Outfit', sans-serif; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); transition: transform 0.2s; }");
        out.println(".btn-again:hover { transform: translateY(-2px); }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='result-card'>");
        out.println("  <div class='result-header'>");
        out.println("    <h1>Academic Result Summary</h1>");
        out.println("    <span class='status-badge'>" + status + "</span>");
        out.println("  </div>");
        out.println("  <div class='info-grid'>");
        out.println("    <div class='info-item'><label>Student Name</label><span>" + name + "</span></div>");
        out.println("    <div class='info-item'><label>Register Number</label><span>" + regNo + "</span></div>");
        out.println("  </div>");
        out.println("  <table>");
        out.println("    <thead><tr><th>Subject</th><th>Mark Scored</th><th>Min Pass Mark</th><th>Status</th></tr></thead>");
        out.println("    <tbody>");
        out.println("      <tr><td>Subject 1 (Web Tech)</td><td>" + m1 + " / 100</td><td>40</td><td>" + (m1 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr>");
        out.println("      <tr><td>Subject 2 (Data Structures)</td><td>" + m2 + " / 100</td><td>40</td><td>" + (m2 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr>");
        out.println("      <tr><td>Subject 3 (Database Systems)</td><td>" + m3 + " / 100</td><td>40</td><td>" + (m3 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr>");
        out.println("    </tbody>");
        out.println("  </table>");
        out.println("  <div class='stats-container'>");
        out.println("    <div class='stat-box'><div class='stat-val'>" + total + " / 300</div><div class='stat-lbl'>Total Marks</div></div>");
        out.println("    <div class='stat-box'><div class='stat-val'>" + String.format("%.2f", avg) + "%</div><div class='stat-lbl'>Average</div></div>");
        out.println("    <div class='stat-box'><div class='stat-val'>" + highest + "</div><div class='stat-lbl'>Highest Mark</div></div>");
        out.println("  </div>");
        out.println("  <div class='actions'>");
        out.println("    <a href='index.html' class='btn-again'>🔄 Calculate Another Result</a>");
        out.println("  </div>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
