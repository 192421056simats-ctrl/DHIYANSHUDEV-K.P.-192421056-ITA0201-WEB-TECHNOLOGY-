package com.itsupport.controller;

import com.itsupport.model.ServiceRequest;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Question 3: Controller Servlet - ServiceRequestServlet.java
 * Manages HTTP POST request processing, server-side validation, Model creation, 
 * request attribute binding, and view forwarding to acknowledgement.jsp.
 * 
 * Concurrency Awareness: Uses method-local variables inside doPost() 
 * to ensure thread safety across concurrent user requests.
 */
@WebServlet("/ServiceRequestServlet")
public class ServiceRequestServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Atomic Counter for generating unique request numbers safely across threads
    private static final AtomicInteger requestCounter = new AtomicInteger(1001);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        /* 
         * CONCURRENCY & THREAD SAFETY NOTE:
         * All request-specific data variables are declared strictly inside the 
         * local stack scope of doPost(). No request data is stored in instance fields.
         */

        // 1. Read Form Parameters using request.getParameter()
        String empId = request.getParameter("employeeId");
        String empName = request.getParameter("employeeName");
        String dept = request.getParameter("department");
        String category = request.getParameter("problemCategory");
        String description = request.getParameter("problemDescription");
        String priority = request.getParameter("priority");

        // Local validation tracking
        boolean hasError = false;
        StringBuilder errorMsg = new StringBuilder();

        // 2. Perform Server-Side Validation on Mandatory Fields
        if (empId == null || empId.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Employee ID is required. ");
        } else {
            empId = empId.trim();
        }

        if (empName == null || empName.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Employee Name is required. ");
        } else {
            empName = empName.trim();
        }

        if (dept == null || dept.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Department is required. ");
        } else {
            dept = dept.trim();
        }

        if (category == null || category.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Problem Category must be selected. ");
        } else {
            category = category.trim();
        }

        if (description == null || description.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Problem Description is required. ");
        } else {
            description = description.trim();
        }

        if (priority == null || priority.trim().isEmpty()) {
            hasError = true;
            errorMsg.append("Priority level must be selected. ");
        } else {
            priority = priority.trim();
        }

        // Handle Validation Failure
        if (hasError) {
            request.setAttribute("errorMessage", errorMsg.toString());
            // Preserve user inputs to re-populate form
            request.setAttribute("empId", empId);
            request.setAttribute("empName", empName);
            request.setAttribute("dept", dept);
            request.setAttribute("category", category);
            request.setAttribute("description", description);
            request.setAttribute("priority", priority);

            // Forward back to form view
            request.getRequestDispatcher("serviceRequest.jsp").forward(request, response);
            return;
        }

        // 3. Create Model Object using Validated Parameters
        ServiceRequest serviceRequestModel = new ServiceRequest(empId, empName, dept, category, description, priority);

        // 4. Generate Unique Request Number (Format: SR-1001)
        String requestNumber = "SR-" + requestCounter.getAndIncrement();

        // 5. Set Attributes in Request Scope for the View Component
        request.setAttribute("serviceRequest", serviceRequestModel);
        request.setAttribute("requestNumber", requestNumber);

        // 6. Forward Request to Result View (acknowledgement.jsp)
        request.getRequestDispatcher("acknowledgement.jsp").forward(request, response);
    }
}
