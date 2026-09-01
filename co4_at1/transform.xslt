<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
        <head>
            <title>High Enrollment Courses - CO4 AT-1</title>
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; padding: 1.5rem; color: #0f172a; }
                .container { max-width: 900px; margin: 0 auto; background: #ffffff; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                h1 { font-family: 'Outfit', sans-serif; font-size: 1.8rem; color: #1e293b; margin-bottom: 0.5rem; }
                p.subtitle { color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; }
                table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
                th, td { padding: 0.85rem 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { background-color: #4f46e5; color: #ffffff; font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                tr:nth-child(even) { background-color: #f8fafc; }
                .badge-theory { background: #e0e7ff; color: #4338ca; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 50px; font-size: 0.8rem; }
                .badge-practical { background: #fef3c7; color: #b45309; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 50px; font-size: 0.8rem; }
                .students-count { font-weight: 700; color: #0f172a; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>High Enrollment Courses</h1>
                <p class="subtitle">Courses having more than 40 enrolled students, sorted in descending order of student enrollment.</p>
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
                        <xsl:for-each select="courses/course[students &gt; 40]">
                            <xsl:sort select="students" data-type="number" order="descending"/>
                            <tr>
                                <td><code><xsl:value-of select="code"/></code></td>
                                <td><strong><xsl:value-of select="name"/></strong></td>
                                <td><xsl:value-of select="faculty"/></td>
                                <td class="students-count"><xsl:value-of select="students"/></td>
                                <td><xsl:value-of select="credits"/></td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="type = 'Theory'">
                                            <span class="badge-theory">Theory</span>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <span class="badge-practical"><xsl:value-of select="type"/></span>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
