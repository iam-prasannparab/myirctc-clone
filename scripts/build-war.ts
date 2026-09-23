import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function buildWar() {
  console.log('📦 Starting Apache Tomcat WAR build process...');
  const distDir = path.resolve(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: "dist" folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  const zip = new JSZip();

  // 1. Recursive helper to add dist contents
  function addDirectoryToZip(dirPath: string, zipFolder: JSZip) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        if (subFolder) {
          addDirectoryToZip(fullPath, subFolder);
        }
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }

  // Add all static files from dist
  addDirectoryToZip(distDir, zip);

  // 2. Ensure WEB-INF/web.xml is included for Tomcat
  const webXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                             https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0">

    <display-name>IRCTC NextGen Multi-Page Portal</display-name>
    <description>
        Indian Railways Catering and Tourism Corporation (IRCTC) Web Application
        Optimized for Apache Tomcat 9, 10, and 11
    </description>

    <!-- Welcome File List -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
    </welcome-file-list>

    <!-- Single Page App & Client Routing Fallback for 404 -->
    <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>

    <!-- Standard MIME Type Mappings -->
    <mime-mapping>
        <extension>html</extension>
        <mime-type>text/html;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>js</extension>
        <mime-type>application/javascript;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>css</extension>
        <mime-type>text/css;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>json</extension>
        <mime-type>application/json;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>svg</extension>
        <mime-type>image/svg+xml</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>png</extension>
        <mime-type>image/png</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>ico</extension>
        <mime-type>image/x-icon</mime-type>
    </mime-mapping>

</web-app>
`;

  // 3. Add META-INF/MANIFEST.MF
  const manifestContent = `Manifest-Version: 1.0
Created-By: IRCTC WAR Packaging Suite
Built-By: Apache Tomcat Web Deployment Tool
Build-Jdk: 17.0.2
Specification-Title: IRCTC NextGen Web Portal
Specification-Version: 2.4
Implementation-Title: irctc
Implementation-Version: 1.0.0
`;

  zip.folder('WEB-INF')?.file('web.xml', webXmlContent);
  zip.folder('META-INF')?.file('MANIFEST.MF', manifestContent);

  // 4. Generate WAR archive
  console.log('⚙️ Compressing files into WAR archive...');
  const warBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const outputWarPath = path.resolve(distDir, 'irctc.war');
  fs.writeFileSync(outputWarPath, warBuffer);

  const sizeKb = (warBuffer.length / 1024).toFixed(2);
  console.log(`✅ Success! Apache Tomcat WAR file generated at:`);
  console.log(`   👉 ${outputWarPath} (${sizeKb} KB)`);
  console.log(`💡 To deploy: copy "irctc.war" to "$CATALINA_HOME/webapps/" or rename to "ROOT.war"`);
}

buildWar().catch((err) => {
  console.error('❌ WAR build failed:', err);
  process.exit(1);
});
