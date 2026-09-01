import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.File;

public class XsltRunner {
    public static void main(String[] args) {
        try {
            File xmlFile = new File("courses.xml");
            File xsltFile = new File("transform.xslt");
            File outputFile = new File("output.html");

            TransformerFactory factory = TransformerFactory.newInstance();
            Source xslt = new StreamSource(xsltFile);
            Transformer transformer = factory.newTransformer(xslt);

            Source xml = new StreamSource(xmlFile);
            transformer.transform(xml, new StreamResult(outputFile));

            System.out.println("✅ XSLT Transformation successful! Generated output.html");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
