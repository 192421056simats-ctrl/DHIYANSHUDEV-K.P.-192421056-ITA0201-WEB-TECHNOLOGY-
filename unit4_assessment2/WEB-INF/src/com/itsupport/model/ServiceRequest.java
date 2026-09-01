package com.itsupport.model;

import java.io.Serializable;

/**
 * Question 2: Model Class - ServiceRequest.java
 * Represents the IT Service Request data structure in the MVC architecture.
 * Contains no presentation-specific code.
 */
public class ServiceRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    // Model Fields
    private String employeeId;
    private String employeeName;
    private String department;
    private String problemCategory;
    private String problemDescription;
    private String priority;

    // Default No-Arg Constructor
    public ServiceRequest() {
    }

    // Parameterized Constructor
    public ServiceRequest(String employeeId, String employeeName, String department, 
                          String problemCategory, String problemDescription, String priority) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.department = department;
        this.problemCategory = problemCategory;
        this.problemDescription = problemDescription;
        this.priority = priority;
    }

    // Getter and Setter Methods
    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProblemCategory() {
        return problemCategory;
    }

    public void setProblemCategory(String problemCategory) {
        this.problemCategory = problemCategory;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
