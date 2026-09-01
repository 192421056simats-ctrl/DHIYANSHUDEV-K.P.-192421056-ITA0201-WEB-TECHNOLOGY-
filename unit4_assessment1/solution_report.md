# WEB TECHNOLOGY UNIT IV - REPRESENTING WEB DATA
## ASSESSMENT I: DATA INTERPRETATION - SOLUTION SHEET

**Duration**: 60 Minutes  
**Maximum Marks**: 30  
**Scenario**: University Course Enrollment Analysis  

---

### Question 1: Interpret the XML Structure (5 Marks)

#### a. Identify the root element.
- **Answer**: `<courses>`
- **Explanation**: `<courses>` is the top-level parent element that encloses all other elements in the XML document.

#### b. Identify the repeating record element.
- **Answer**: `<course>`
- **Explanation**: The `<course>` element is repeated multiple times inside the root element, with each instance representing an individual course record.

#### c. Identify the attribute used to uniquely identify each course.
- **Answer**: `id` attribute of the `<course>` element (e.g., `id="C101"`, `id="C102"`).

#### d. Identify the elements that represent numeric information.
- **Answer**: 
  1. `<students>` (represents student enrollment counts: 58, 72, 36, 64, 42)
  2. `<credits>` (represents academic credit weight: 4, 2, 3)

#### e. State whether the XML document is structurally well-formed and justify your answer.
- **Answer**: **Yes, the XML document is structurally well-formed.**
- **Justification**:
  1. **XML Declaration**: Starts with a valid XML declaration `<?xml version="1.0" encoding="UTF-8"?>`.
  2. **Single Root Element**: Contains exactly one root element (`<courses>`) encompassing all child nodes.
  3. **Matching Tags**: Every opening tag (e.g., `<name>`) has a corresponding closing tag (`</name>`).
  4. **Proper Nesting**: Elements are cleanly nested without overlapping (e.g., `<code>` is closed before `</course>`).
  5. **Quoted Attribute Values**: Attribute values are properly enclosed in double quotes (e.g., `id="C101"`).
  6. **Case Sensitivity**: Tag names consistently use lowercase matching pairs.

---

### Question 2: Apply XPath for Data Selection (10 Marks)

| Q# | Selection Requirement | Suitable XPath Expression | Matching Result(s) |
|---|---|---|---|
| **a** | All course records | `/courses/course` *(or `//course`)* | Elements `C101`, `C102`, `C103`, `C104`, `C105` |
| **b** | Names of all courses | `/courses/course/name` *(or `//name`)* | "Web Technology", "Artificial Intelligence", "Web Technology Laboratory", "Machine Learning", "Database Systems" |
| **c** | Courses having more than 50 students | `/courses/course[students > 50]` | `C101` (58), `C102` (72), `C104` (64) |
| **d** | Courses carrying 4 credits | `/courses/course[credits = 4]` | `C101`, `C102`, `C104` |
| **e** | Courses whose type is Theory | `/courses/course[type = 'Theory']` | `C101`, `C102`, `C104`, `C105` |
| **f** | Names of Theory courses having more than 50 students | `/courses/course[type = 'Theory' and students > 50]/name` | "Web Technology", "Artificial Intelligence", "Machine Learning" |
| **g** | Faculty members handling courses with at least 4 credits | `/courses/course[credits >= 4]/faculty` | "Dr. Arun", "Dr. Meena", "Dr. Priya" |
| **h** | The course whose id is C104 | `/courses/course[@id = 'C104']` | `<course id="C104">` (Machine Learning) |
| **i** | The first course available in the XML document | `/courses/course[1]` | `<course id="C101">` (Web Technology) |
| **j** | The last course available in the XML document | `/courses/course[last()]` | `<course id="C105">` (Database Systems) |

---

### Question 3: Apply XSLT for Data Presentation (10 Marks)

#### XSLT Stylesheet (`transform.xslt`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
        <head>
            <title>High Enrollment Courses</title>
            <style>
                body { font-family: sans-serif; background: #f8fafc; padding: 2rem; }
                .container { max-width: 900px; margin: 0 auto; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                h1 { color: #1e293b; font-size: 1.75rem; margin-bottom: 0.5rem; }
                table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; text-align: left; }
                th { background-color: #4f46e5; color: #ffffff; text-transform: uppercase; font-size: 0.85rem; }
                tr:nth-child(even) { background-color: #f8fafc; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Requirement c: Display suitable heading -->
                <h1>High Enrollment Courses</h1>
                <p>Courses having more than 40 enrolled students, sorted in descending order of student enrollment.</p>
                
                <!-- Requirement e: Produce valid HTML table -->
                <table>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Faculty</th>
                            <th>Students</th>
                            <th>Credits</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Requirement a & d: Filter courses with > 40 students using XPath predicate -->
                        <xsl:for-each select="courses/course[students &gt; 40]">
                            <!-- Requirement b: Sort in descending order of student enrollment -->
                            <xsl:sort select="students" data-type="number" order="descending"/>
                            <tr>
                                <td><code><xsl:value-of select="code"/></code></td>
                                <td><strong><xsl:value-of select="name"/></strong></td>
                                <td><xsl:value-of select="faculty"/></td>
                                <td><xsl:value-of select="students"/></td>
                                <td><xsl:value-of select="credits"/></td>
                                <td><xsl:value-of select="type"/></td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
```

#### Transformed HTML Output Preview:
| Course Code | Course Name | Faculty | Students | Credits | Type |
|---|---|---|---|---|---|
| `AI302` | **Artificial Intelligence** | Dr. Meena | **72** | 4 | Theory |
| `ML304` | **Machine Learning** | Dr. Priya | **64** | 4 | Theory |
| `WEB301` | **Web Technology** | Dr. Arun | **58** | 4 | Theory |
| `DB305` | **Database Systems** | Dr. Kumar | **42** | 3 | Theory |

*(Note: `WEB303` with 36 students is automatically excluded because $36 \le 40$.)*

---

### Question 4: Interpret the Extracted Data (5 Marks)

#### a. Identify the course with the highest enrollment.
- **Answer**: **Artificial Intelligence** (Code: `AI302`, ID: `C102`)
- **Details**: Enrolled students = **72**.

#### b. Identify the course with the lowest enrollment.
- **Answer**: **Web Technology Laboratory** (Code: `WEB303`, ID: `C103`)
- **Details**: Enrolled students = **36**.

#### c. Determine the number of Theory courses.
- **Answer**: **4 Theory courses**
- **Details**:
  1. `WEB301` – Web Technology
  2. `AI302` – Artificial Intelligence
  3. `ML304` – Machine Learning
  4. `DB305` – Database Systems

#### d. Identify all courses having exactly 4 credits.
- **Answer**: **3 courses** carry 4 credits:
  1. `WEB301` – Web Technology (ID: `C101`)
  2. `AI302` – Artificial Intelligence (ID: `C102`)
  3. `ML304` – Machine Learning (ID: `C104`)

#### e. If an additional teaching assistant is assigned to every course with more than 60 students, identify the courses that require additional support.
- **Answer**: **2 courses** require an additional teaching assistant:
  1. **Artificial Intelligence** (`AI302`) – **72 students** ($72 > 60$)
  2. **Machine Learning** (`ML304`) – **64 students** ($64 > 60$)
