import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Local Standalone Development Server for Experiment 2.
 * Allows running and demonstrating the Servlet Result Processing application 
 * directly without needing an external Tomcat installation.
 * 
 * Usage:
 *   java LocalDevServer.java
 * Then open: http://localhost:8080
 */
public class LocalDevServer {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        
        // Serve index.html static page
        server.createContext("/", new StaticFileHandler());
        
        // Serve Servlet endpoint
        server.createContext("/ResultServlet", new ServletSimHandler());

        server.setExecutor(null); // creates a default executor
        System.out.println("=================================================");
        System.out.println("🚀 Exp 2 Local Test Server started on port " + port);
        System.out.println("👉 Access in browser: http://localhost:8080");
        System.out.println("=================================================");
        server.start();
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) {
                path = "/index.html";
            }
            File file = new File("exp2" + path);
            if (!file.exists()) {
                file = new File("." + path);
            }

            if (file.exists() && !file.isDirectory()) {
                byte[] bytes = Files.readAllBytes(file.toPath());
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                exchange.sendResponseHeaders(200, bytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(bytes);
                os.close();
            } else {
                String response = "404 Not Found";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
    }

    static class ServletSimHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                InputStream is = exchange.getRequestBody();
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = is.read(buffer)) != -1) {
                    baos.write(buffer, 0, len);
                }
                String formData = new String(baos.toByteArray(), StandardCharsets.UTF_8);
                Map<String, String> params = parseFormData(formData);

                String studentName = params.getOrDefault("studentName", "");
                String regNumber = params.getOrDefault("regNumber", "");
                String m1Str = params.getOrDefault("mark1", "");
                String m2Str = params.getOrDefault("mark2", "");
                String m3Str = params.getOrDefault("mark3", "");

                // Perform Validation
                boolean hasError = false;
                StringBuilder errorMessages = new StringBuilder();

                if (studentName.trim().isEmpty()) {
                    hasError = true;
                    errorMessages.append("<li>Student Name is required.</li>");
                }
                if (regNumber.trim().isEmpty()) {
                    hasError = true;
                    errorMessages.append("<li>Register Number is required.</li>");
                }

                int mark1 = 0, mark2 = 0, mark3 = 0;
                try {
                    mark1 = Integer.parseInt(m1Str.trim());
                    if (mark1 < 0 || mark1 > 100) {
                        hasError = true;
                        errorMessages.append("<li>Subject 1 Mark (").append(mark1).append(") must be between 0 and 100.</li>");
                    }
                } catch (Exception e) {
                    hasError = true;
                    errorMessages.append("<li>Subject 1 Mark is required and must be an integer.</li>");
                }

                try {
                    mark2 = Integer.parseInt(m2Str.trim());
                    if (mark2 < 0 || mark2 > 100) {
                        hasError = true;
                        errorMessages.append("<li>Subject 2 Mark (").append(mark2).append(") must be between 0 and 100.</li>");
                    }
                } catch (Exception e) {
                    hasError = true;
                    errorMessages.append("<li>Subject 2 Mark is required and must be an integer.</li>");
                }

                try {
                    mark3 = Integer.parseInt(m3Str.trim());
                    if (mark3 < 0 || mark3 > 100) {
                        hasError = true;
                        errorMessages.append("<li>Subject 3 Mark (").append(mark3).append(") must be between 0 and 100.</li>");
                    }
                } catch (Exception e) {
                    hasError = true;
                    errorMessages.append("<li>Subject 3 Mark is required and must be an integer.</li>");
                }

                String responseHtml;
                if (hasError) {
                    responseHtml = renderErrorPage(errorMessages.toString());
                } else {
                    int total = mark1 + mark2 + mark3;
                    double average = total / 3.0;
                    int highest = Math.max(mark1, Math.max(mark2, mark3));
                    boolean isPassed = (mark1 >= 40 && mark2 >= 40 && mark3 >= 40);
                    String status = isPassed ? "PASSED" : "FAILED";

                    responseHtml = renderResultPage(studentName, regNumber, mark1, mark2, mark3, total, average, highest, status, isPassed);
                }

                byte[] responseBytes = responseHtml.getBytes(StandardCharsets.UTF_8);
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                exchange.sendResponseHeaders(200, responseBytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(responseBytes);
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1); // Method Not Allowed
            }
        }

        private Map<String, String> parseFormData(String formData) throws UnsupportedEncodingException {
            Map<String, String> map = new HashMap<>();
            String[] pairs = formData.split("&");
            for (String pair : pairs) {
                String[] kv = pair.split("=");
                if (kv.length == 2) {
                    String key = URLDecoder.decode(kv[0], "UTF-8");
                    String value = URLDecoder.decode(kv[1], "UTF-8");
                    map.put(key, value);
                }
            }
            return map;
        }

        private String renderErrorPage(String errorListHtml) {
            return "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Validation Error</title>" +
                   "<style>body { font-family: sans-serif; background: #fef2f2; color: #991b1b; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin:0; } " +
                   ".card { background:#fff; padding: 2rem; border-radius: 12px; border-left: 6px solid #dc2626; max-width: 500px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); } " +
                   ".btn { display:inline-block; margin-top: 1rem; padding: 0.6rem 1.2rem; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; font-weight:600; }</style></head>" +
                   "<body><div class='card'><h2>⚠️ Form Validation Error</h2><ul>" + errorListHtml + "</ul><a href='javascript:history.back()' class='btn'>← Go Back</a></div></body></html>";
        }

        private String renderResultPage(String name, String regNo, int m1, int m2, int m3, int total, double avg, int highest, String status, boolean isPassed) {
            String badgeBg = isPassed ? "#dcfce7" : "#fee2e2";
            String badgeColor = isPassed ? "#15803d" : "#b91c1c";
            return "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Result Summary</title>" +
                   "<style>@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600&display=swap');" +
                   "body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 1rem; }" +
                   ".result-card { background: #ffffff; border-radius: 20px; box-shadow: 0 20px 30px -10px rgba(0,0,0,0.08); width: 100%; max-width: 600px; padding: 2.5rem; border: 1px solid #e2e8f0; }" +
                   ".result-header { text-align: center; border-bottom: 2px dashed #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }" +
                   ".result-header h1 { font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin: 0 0 0.5rem 0; color: #0f172a; }" +
                   ".status-badge { display: inline-block; padding: 0.4rem 1.2rem; border-radius: 50px; font-weight: 700; font-size: 0.95rem; background-color: " + badgeBg + "; color: " + badgeColor + "; letter-spacing: 1px; }" +
                   ".info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background-color: #f8fafc; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; }" +
                   ".info-item label { display: block; font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }" +
                   ".info-item span { font-size: 1.05rem; font-weight: 700; color: #0f172a; }" +
                   "table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }" +
                   "th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }" +
                   "th { background-color: #f1f5f9; font-family: 'Outfit', sans-serif; font-weight: 600; color: #475569; font-size: 0.85rem; text-transform: uppercase; }" +
                   "td { font-size: 0.95rem; font-weight: 500; }" +
                   ".stats-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.75rem; }" +
                   ".stat-box { background: #f1f5f9; padding: 1rem; border-radius: 12px; text-align: center; }" +
                   ".stat-box .stat-val { font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 700; color: #4f46e5; }" +
                   ".stat-box .stat-lbl { font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; margin-top: 0.25rem; }" +
                   ".actions { text-align: center; }" +
                   ".btn-again { display: inline-block; padding: 0.8rem 1.75rem; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-family: 'Outfit', sans-serif; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); }</style></head>" +
                   "<body><div class='result-card'><div class='result-header'><h1>Academic Result Summary</h1><span class='status-badge'>" + status + "</span></div>" +
                   "<div class='info-grid'><div class='info-item'><label>Student Name</label><span>" + name + "</span></div><div class='info-item'><label>Register Number</label><span>" + regNo + "</span></div></div>" +
                   "<table><thead><tr><th>Subject</th><th>Mark Scored</th><th>Min Pass Mark</th><th>Status</th></tr></thead><tbody>" +
                   "<tr><td>Subject 1 (Web Tech)</td><td>" + m1 + " / 100</td><td>40</td><td>" + (m1 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr>" +
                   "<tr><td>Subject 2 (Data Structures)</td><td>" + m2 + " / 100</td><td>40</td><td>" + (m2 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr>" +
                   "<tr><td>Subject 3 (Database Systems)</td><td>" + m3 + " / 100</td><td>40</td><td>" + (m3 >= 40 ? "✅ Pass" : "❌ Fail") + "</td></tr></tbody></table>" +
                   "<div class='stats-container'><div class='stat-box'><div class='stat-val'>" + total + " / 300</div><div class='stat-lbl'>Total Marks</div></div>" +
                   "<div class='stat-box'><div class='stat-val'>" + String.format("%.2f", avg) + "%</div><div class='stat-lbl'>Average</div></div>" +
                   "<div class='stat-box'><div class='stat-val'>" + highest + "</div><div class='stat-lbl'>Highest Mark</div></div></div>" +
                   "<div class='actions'><a href='index.html' class='btn-again'>🔄 Calculate Another Result</a></div></div></body></html>";
        }
    }
}
