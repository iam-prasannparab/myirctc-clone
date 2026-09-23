import JSZip from 'jszip';

export interface WarGeneratorOptions {
  appName: string; // e.g. "irctc" or "ROOT"
  tomcatVersion: 'tomcat9' | 'tomcat10' | 'tomcat11';
  enableSpaRewrite: boolean;
  contextPath: string; // e.g. "/irctc" or "/"
}

export function generateWebXml(options: WarGeneratorOptions): string {
  const isJakarta = options.tomcatVersion !== 'tomcat9';
  const namespace = isJakarta ? 'https://jakarta.ee/xml/ns/jakartaee' : 'http://xmlns.jcp.org/xml/ns/javaee';
  const schemaLocation = isJakarta 
    ? 'https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd'
    : 'http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd';
  const version = isJakarta ? '5.0' : '4.0';

  return `<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="${namespace}"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="${schemaLocation}"
         version="${version}">

    <display-name>IRCTC NextGen Web Portal</display-name>
    <description>
        Indian Railways Catering and Tourism Corporation (IRCTC) Portal
        Configured for Apache Tomcat (${options.tomcatVersion.toUpperCase()})
        Target Context: ${options.contextPath}
    </description>

    <!-- Welcome File List -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
    </welcome-file-list>

    ${options.enableSpaRewrite ? `<!-- Single Page App Client-Side Routing Fallback (for direct URLs like /pnr, /running-status) -->
    <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>` : ''}

    <!-- MIME Type Mappings for Modern Web Assets -->
    <mime-mapping>
        <extension>html</extension>
        <mime-type>text/html;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>js</extension>
        <mime-type>application/javascript;charset=UTF-8</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>mjs</extension>
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
        <extension>webp</extension>
        <mime-type>image/webp</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>ico</extension>
        <mime-type>image/x-icon</mime-type>
    </mime-mapping>
    <mime-mapping>
        <extension>woff2</extension>
        <mime-type>font/woff2</mime-type>
    </mime-mapping>

    <!-- Session Configuration -->
    <session-config>
        <session-timeout>30</session-timeout>
        <cookie-config>
            <http-only>true</http-only>
            <secure>false</secure>
        </cookie-config>
        <tracking-mode>COOKIE</tracking-mode>
    </session-config>

</web-app>
`;
}

export function generateManifest(options: WarGeneratorOptions): string {
  return `Manifest-Version: 1.0
Created-By: IRCTC NextGen Tomcat WAR Exporter
Built-By: Apache Tomcat Web Deployment Tool
Build-Jdk: 17.0.9
Specification-Title: IRCTC NextGen Web Portal
Specification-Version: 2.5
Implementation-Title: ${options.appName}
Implementation-Version: 1.0.0
Implementation-Vendor: CRIS (Centre for Railway Information Systems)
`;
}

/**
 * Creates and downloads a real Tomcat .war archive in the client's browser
 */
export async function downloadTomcatWar(options: WarGeneratorOptions): Promise<{ filename: string; sizeKb: number }> {
  const zip = new JSZip();

  // 1. Generate WEB-INF/web.xml and META-INF/MANIFEST.MF
  const webXml = generateWebXml(options);
  const manifest = generateManifest(options);

  zip.folder('WEB-INF')?.file('web.xml', webXml);
  zip.folder('META-INF')?.file('MANIFEST.MF', manifest);

  // 2. Fetch or capture current document HTML and bundle current page assets
  const htmlContent = document.documentElement.outerHTML;
  zip.file('index.html', `<!DOCTYPE html>\n${htmlContent}`);

  // 3. Add Tomcat Context Configuration file (META-INF/context.xml)
  const contextXml = `<?xml version="1.0" encoding="UTF-8"?>
<Context reloadable="true" docBase="${options.appName}">
    <JarScanner scanManifest="false"/>
</Context>`;
  zip.folder('META-INF')?.file('context.xml', contextXml);

  // 4. Add a README.txt inside the WAR for operators
  const readme = `=======================================================
IRCTC NextGen Web Application Archive (.war)
=======================================================

Deployed Target: Apache Tomcat (Version 9.x, 10.x, 11.x)
Context Path: ${options.contextPath}

DEPLOYMENT INSTRUCTIONS:
1. Copy "${options.appName}.war" to your Tomcat "webapps" directory:
   e.g.:
   - Linux: /opt/tomcat/webapps/${options.appName}.war
   - Windows: C:\\apache-tomcat\\webapps\\${options.appName}.war
   - Docker: /usr/local/tomcat/webapps/${options.appName}.war

2. Start Apache Tomcat:
   - Linux: bin/startup.sh
   - Windows: bin\\startup.bat

3. Access the portal in your browser:
   - If deployed as ROOT.war: http://localhost:8080/
   - If deployed as irctc.war: http://localhost:8080/irctc/

CENTER FOR RAILWAY INFORMATION SYSTEMS (CRIS) & IRCTC
`;
  zip.file('TOMCAT-DEPLOY-README.txt', readme);

  // 5. Generate WAR (standard ZIP format with .war extension)
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const filename = `${options.appName.trim() || 'irctc'}.war`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return {
    filename,
    sizeKb: Number((blob.size / 1024).toFixed(2)),
  };
}
