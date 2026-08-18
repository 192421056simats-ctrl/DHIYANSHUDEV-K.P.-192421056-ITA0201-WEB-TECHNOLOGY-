# Experiment 2: Servlet-Based Student Result Processing

## Overview
This application accepts a student's Name, Register Number, and marks in three subjects via an HTML form using the `POST` method. The form data is sent to a Java Servlet (`ResultServlet.java`), which performs validation, calculates the **Total**, **Average**, **Highest Mark**, and **Pass/Fail Status**, and dynamically generates an HTML result page.

---

## Technical Concepts Assessed
1. **Servlet Architecture & `doPost()`**: Handles HTTP POST requests securely.
2. **Parameter Handling**: Uses `request.getParameter()` to extract student data and subject marks.
3. **Dynamic Content Generation**: Uses `PrintWriter` to stream formatted HTML responses back to the client browser.
4. **Data Validation**: Checks for missing fields and enforces mark boundaries ($0 \le \text{mark} \le 100$).
5. **Servlet Concurrency Awareness**: Employs method-local variables inside `doPost()` to guarantee thread safety across concurrent requests.

---

## Application Structure
```
exp2/
├── index.html                    # HTML Form with POST method
├── LocalDevServer.java           # Standalone Java Dev Server (Run without Tomcat)
└── WEB-INF/
    ├── web.xml                   # Deployment Descriptor (Servlet Mapping)
    └── src/
        └── ResultServlet.java    # Java Servlet Implementation
```

---

## Option 1: Running on Apache Tomcat (Standard Servlet Deployment)

### Step 1: Directory Setup in Tomcat
Copy or copy-link the `exp2` directory into Apache Tomcat's `webapps` folder:
```
<TOMCAT_HOME>/webapps/exp2/
├── index.html
└── WEB-INF/
    ├── web.xml
    └── classes/
        └── com/
            └── college/
                └── servlet/
                    └── ResultServlet.class
```

### Step 2: Compile `ResultServlet.java`
Open terminal and navigate to the project directory:
```bash
# Compile using javac (Include Tomcat servlet-api.jar in classpath)
javac -cp "<TOMCAT_HOME>/lib/servlet-api.jar" -d WEB-INF/classes WEB-INF/src/ResultServlet.java
```

### Step 3: Start Apache Tomcat
- **Windows**: Run `<TOMCAT_HOME>\bin\startup.bat`
- **Linux / macOS**: Run `<TOMCAT_HOME>/bin/startup.sh`

### Step 4: Open in Browser
Access the application at:
`http://localhost:8080/exp2/index.html`

---

## Option 2: Running via Standalone Local Server (No Tomcat Setup Required)

For quick demonstration and testing without installing Tomcat:

```bash
# Run the included Java dev server
java LocalDevServer.java
```

Then open your browser to:
`http://localhost:8080`
