import React, { useState } from 'react';
import { 
  PackageCheck, 
  DownloadCloud, 
  Terminal, 
  FileCode, 
  Server, 
  CheckCircle2, 
  Copy, 
  HelpCircle, 
  Layers, 
  FileText,
  AlertCircle,
  Box,
  FolderTree,
  Hammer
} from 'lucide-react';
import { downloadTomcatWar, generateWebXml, generateManifest, WarGeneratorOptions } from '../utils/warPackager';

export const TomcatWarCenter: React.FC = () => {
  const [appName, setAppName] = useState('irctc');
  const [tomcatVersion, setTomcatVersion] = useState<'tomcat10' | 'tomcat9' | 'tomcat11'>('tomcat10');
  const [enableSpaRewrite, setEnableSpaRewrite] = useState(true);
  const [isPackaging, setIsPackaging] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<{ filename: string; sizeKb: number } | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'GENERATOR' | 'MAVEN' | 'WEB_XML' | 'DEPLOY_GUIDE' | 'DOCKER'>('MAVEN');

  const contextPath = appName.toLowerCase() === 'root' ? '/' : `/${appName.toLowerCase().replace(/[^a-z0-9_-]/g, '')}`;

  const currentOptions: WarGeneratorOptions = {
    appName: appName || 'irctc',
    tomcatVersion,
    enableSpaRewrite,
    contextPath,
  };

  const currentWebXml = generateWebXml(currentOptions);
  const currentManifest = generateManifest(currentOptions);

  const handleDownload = async () => {
    setIsPackaging(true);
    setDownloadSuccess(null);
    try {
      const res = await downloadTomcatWar(currentOptions);
      setDownloadSuccess(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPackaging(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const dockerSnippet = `FROM tomcat:10.1-jdk17-temurin-jammy

# Remove default ROOT application (optional)
RUN rm -rf /usr/local/tomcat/webapps/ROOT /usr/local/tomcat/webapps/ROOT.war

# Copy generated IRCTC WAR as ROOT application or subcontext
COPY ${appName}.war /usr/local/tomcat/webapps/${appName === 'ROOT' ? 'ROOT.war' : appName + '.war'}

EXPOSE 8080

CMD ["catalina.sh", "run"]`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-[#08284c] text-white p-6 rounded-t-xl border-b-4 border-emerald-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <PackageCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Apache Tomcat WAR Deployment Suite
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Servlet 5.0 / 6.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Package and download the complete IRCTC portal as a standard <strong className="text-emerald-300">.war</strong> file for instant deployment on Apache Tomcat 9, 10 & 11
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={handleDownload}
            disabled={isPackaging}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {isPackaging ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Packaging WAR...</span>
              </>
            ) : (
              <>
                <DownloadCloud className="w-4 h-4" />
                <span>DOWNLOAD {appName}.WAR</span>
              </>
            )}
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 mt-6 border-t border-slate-700 pt-3 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('GENERATOR')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'GENERATOR'
                ? 'bg-white text-[#08284c]'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>WAR Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('MAVEN')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'MAVEN'
                ? 'bg-emerald-400 text-[#08284c] font-bold'
                : 'text-emerald-300 hover:bg-white/10'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Maven Archetype (mvn)</span>
          </button>

          <button
            onClick={() => setActiveTab('WEB_XML')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'WEB_XML'
                ? 'bg-white text-[#08284c]'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>WEB-INF/web.xml</span>
          </button>

          <button
            onClick={() => setActiveTab('DEPLOY_GUIDE')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'DEPLOY_GUIDE'
                ? 'bg-white text-[#08284c]'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Tomcat Deployment Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('DOCKER')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'DOCKER'
                ? 'bg-white text-[#08284c]'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Docker & CI/CD</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-50 border-x border-b border-emerald-200 p-4 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">
                Success! "{downloadSuccess.filename}" ({downloadSuccess.sizeKb} KB) has been downloaded.
              </p>
              <p className="text-emerald-700">
                Drop this file into Tomcat's <code className="font-mono font-bold bg-emerald-100 px-1 rounded">webapps/</code> directory and restart Tomcat!
              </p>
            </div>
          </div>
          <button
            onClick={() => setDownloadSuccess(null)}
            className="text-emerald-800 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Body */}
      <div className="bg-white border-x border-b border-slate-200 p-6 rounded-b-xl shadow-sm">
        
        {/* Tab 1: WAR Generator & Configurator */}
        {activeTab === 'GENERATOR' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Form Controls (Col 7) */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  1. Configure Application Archive Settings
                </h3>

                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      WAR File / Application Name:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                        placeholder="e.g. irctc or ROOT"
                        className="w-full px-3 py-2 font-mono font-bold text-sm border border-slate-300 rounded focus:ring-2 focus:ring-[#213d77] outline-none"
                      />
                      <span className="font-mono text-xs font-bold text-slate-500">.war</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Tip: Name it <code className="font-bold text-[#213d77]">ROOT</code> to serve directly at <code className="font-bold">http://localhost:8080/</code>, or <code className="font-bold text-[#213d77]">irctc</code> for <code className="font-bold">http://localhost:8080/irctc/</code>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Target Apache Tomcat Version:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTomcatVersion('tomcat10')}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          tomcatVersion === 'tomcat10'
                            ? 'border-[#213d77] bg-blue-50 text-[#213d77] font-bold ring-1 ring-[#213d77]'
                            : 'border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <p className="font-bold">Tomcat 10.x</p>
                        <p className="text-[10px] text-slate-500">Jakarta EE 9 / 10</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTomcatVersion('tomcat11')}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          tomcatVersion === 'tomcat11'
                            ? 'border-[#213d77] bg-blue-50 text-[#213d77] font-bold ring-1 ring-[#213d77]'
                            : 'border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <p className="font-bold">Tomcat 11.x</p>
                        <p className="text-[10px] text-slate-500">Jakarta EE 11</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTomcatVersion('tomcat9')}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          tomcatVersion === 'tomcat9'
                            ? 'border-[#213d77] bg-blue-50 text-[#213d77] font-bold ring-1 ring-[#213d77]'
                            : 'border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <p className="font-bold">Tomcat 9.x</p>
                        <p className="text-[10px] text-slate-500">Java EE 8 (javax)</p>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableSpaRewrite}
                        onChange={(e) => setEnableSpaRewrite(e.target.checked)}
                        className="mt-0.5 rounded text-[#213d77]"
                      />
                      <div>
                        <span className="font-bold text-slate-800">
                          Enable SPA 404 Rewrite in web.xml
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Maps HTTP 404 errors back to <code className="font-mono">/index.html</code> so deep URLs (like <code className="font-mono">/pnr</code> or <code className="font-mono">/running</code>) resolve correctly in Tomcat without server 404s.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Primary Download Button */}
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-emerald-950 text-xs">
                      Ready to build {appName}.war?
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Standard ZIP container with valid Java Servlet descriptor.
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={isPackaging}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    <span>Download {appName}.war</span>
                  </button>
                </div>
              </div>

              {/* Package Anatomy Explorer (Col 5) */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  2. WAR Directory Structure
                </h3>

                <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs shadow-inner space-y-1">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 text-[11px]">
                    <span>Archive Contents</span>
                    <span>ZIP DEFLATE</span>
                  </div>
                  <p className="text-white font-bold">{appName}.war</p>
                  <p className="pl-3 text-slate-400">├── META-INF/</p>
                  <p className="pl-6 text-amber-300">├── MANIFEST.MF</p>
                  <p className="pl-6 text-amber-300">└── context.xml</p>
                  <p className="pl-3 text-slate-400">├── WEB-INF/</p>
                  <p className="pl-6 text-emerald-300 font-bold">└── web.xml (Servlet Config)</p>
                  <p className="pl-3 text-slate-400">├── assets/</p>
                  <p className="pl-6 text-slate-300">├── index.js</p>
                  <p className="pl-6 text-slate-300">└── index.css</p>
                  <p className="pl-3 text-blue-300 font-bold">├── index.html</p>
                  <p className="pl-3 text-slate-400">└── TOMCAT-DEPLOY-README.txt</p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Also available via CLI:</span>
                    <p className="mt-0.5 font-mono text-slate-800 bg-white p-1 rounded border border-blue-200">
                      npm run build:war
                    </p>
                    <p className="mt-1 text-slate-600">
                      Compiles Vite assets and produces <code className="font-mono">dist/{appName}.war</code> automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Maven Archetype (mvn) & Project Structure */}
        {activeTab === 'MAVEN' && (
          <div className="space-y-6 text-xs text-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <Box className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Maven Webapp Archetype (<code className="font-mono text-emerald-700">maven-archetype-webapp</code>)
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Standard Apache Maven archetype command to generate a Java Web Application directory structure for Apache Tomcat
                  </p>
                </div>
              </div>
            </div>

            {/* 1. The Exact Command Box */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 font-mono space-y-3 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-[11px] font-bold text-emerald-400">Standard Maven Archetype Command</span>
                <button
                  onClick={() => copyToClipboard(
                    `mvn archetype:generate \\\n  -DgroupId=com.irctc.portal \\\n  -DartifactId=irctc-webapp \\\n  -DarchetypeArtifactId=maven-archetype-webapp \\\n  -DarchetypeVersion=1.4 \\\n  -DinteractiveMode=false`,
                    'mvn-archetype'
                  )}
                  className="hover:text-white flex items-center gap-1.5 text-[11px] bg-slate-800 px-2.5 py-1 rounded transition-colors"
                >
                  {copiedSnippet === 'mvn-archetype' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Command</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="text-emerald-300 text-xs sm:text-sm overflow-x-auto leading-relaxed">
{`mvn archetype:generate \\
  -DgroupId=com.irctc.portal \\
  -DartifactId=irctc-webapp \\
  -DarchetypeArtifactId=maven-archetype-webapp \\
  -DarchetypeVersion=1.4 \\
  -DinteractiveMode=false`}
              </pre>
            </div>

            {/* 2. Flag & Parameter Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#213d77]" />
                <span>Command Parameters Breakdown</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-[#213d77] block mb-1">
                    -DgroupId=com.irctc.portal
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Identifies your project uniquely across all projects. Follows reverse domain package naming convention (e.g. <code className="font-mono">com.yourcompany.app</code>).
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-[#213d77] block mb-1">
                    -DartifactId=irctc-webapp
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    The name of your project directory and default base name of the generated WAR archive (<code className="font-mono">irctc-webapp.war</code>).
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-emerald-700 block mb-1">
                    -DarchetypeArtifactId=maven-archetype-webapp
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    The official Apache Maven archetype template that creates the Java Webapp directory skeleton with <code className="font-mono">src/main/webapp/WEB-INF/web.xml</code>.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-[#213d77] block mb-1">
                    -DinteractiveMode=false
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Non-interactive execution flag. Prevents Maven from pausing to prompt for user input, scaffolding the project immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Directory Layout Explorer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: Standard Archetype Output */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <FolderTree className="w-4 h-4 text-amber-600" />
                  <span>A. Raw Archetype Output Structure</span>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-[11px] space-y-1">
                  <p className="text-amber-400 font-bold">irctc-webapp/</p>
                  <p className="pl-3 text-emerald-400">├── pom.xml</p>
                  <p className="pl-3 text-slate-400">└── src/</p>
                  <p className="pl-6 text-slate-400">└── main/</p>
                  <p className="pl-9 text-slate-400">└── webapp/</p>
                  <p className="pl-12 text-slate-400">├── WEB-INF/</p>
                  <p className="pl-15 text-blue-300 font-bold">└── web.xml</p>
                  <p className="pl-12 text-slate-400">└── index.jsp</p>
                </div>
                <p className="text-[11px] text-slate-500">
                  The default archetype comes with a placeholder <code className="font-mono">index.jsp</code>.
                </p>
              </div>

              {/* Right: Modern Production Layout for IRCTC */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <FolderTree className="w-4 h-4 text-emerald-600" />
                  <span>B. Production IRCTC Webapp Layout</span>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-[11px] space-y-1">
                  <p className="text-white font-bold">irctc-webapp/</p>
                  <p className="pl-3 text-emerald-400">├── pom.xml (frontend + war plugins)</p>
                  <p className="pl-3 text-slate-400">├── package.json (React + Vite)</p>
                  <p className="pl-3 text-amber-300">├── dist/ (compiled SPA bundle)</p>
                  <p className="pl-3 text-slate-400">└── src/</p>
                  <p className="pl-6 text-slate-400">└── main/</p>
                  <p className="pl-9 text-slate-400">├── java/ (optional backend servlets)</p>
                  <p className="pl-9 text-slate-400">└── webapp/</p>
                  <p className="pl-12 text-slate-400">├── WEB-INF/</p>
                  <p className="pl-15 text-blue-300 font-bold">└── web.xml (SPA 404 rewrite)</p>
                  <p className="pl-12 text-slate-400">└── assets/</p>
                </div>
                <p className="text-[11px] text-slate-500">
                  Vite builds into <code className="font-mono">dist/</code> and Maven bundles everything into <code className="font-mono">target/irctc.war</code>.
                </p>
              </div>
            </div>

            {/* 4. Complete pom.xml snippet */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    Production pom.xml for Automated Frontend + WAR Packaging
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    Includes <code className="font-mono text-emerald-700">frontend-maven-plugin</code> and <code className="font-mono text-emerald-700">maven-war-plugin</code> (also available at root <code className="font-mono">/pom.xml</code>)
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(
                    `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.irctc.portal</groupId>
    <artifactId>irctc-webapp</artifactId>
    <version>1.0.0</version>
    <packaging>war</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <failOnMissingWebXml>false</failOnMissingWebXml>
    </properties>

    <dependencies>
        <dependency>
            <groupId>jakarta.servlet</groupId>
            <artifactId>jakarta.servlet-api</artifactId>
            <version>5.0.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>irctc</finalName>
        <plugins>
            <!-- 1. Auto-build frontend -->
            <plugin>
                <groupId>com.github.eirslett</groupId>
                <artifactId>frontend-maven-plugin</artifactId>
                <version>1.15.0</version>
                <executions>
                    <execution>
                        <id>install node and npm</id>
                        <goals><goal>install-node-and-npm</goal></goals>
                        <phase>generate-resources</phase>
                        <configuration>
                            <nodeVersion>v20.11.0</nodeVersion>
                            <npmVersion>10.2.4</npmVersion>
                        </configuration>
                    </execution>
                    <execution>
                        <id>npm install</id>
                        <goals><goal>npm</goal></goals>
                        <phase>generate-resources</phase>
                        <configuration><arguments>install</arguments></configuration>
                    </execution>
                    <execution>
                        <id>npm run build</id>
                        <goals><goal>npm</goal></goals>
                        <phase>compile</phase>
                        <configuration><arguments>run build</arguments></configuration>
                    </execution>
                </executions>
            </plugin>

            <!-- 2. Package into irctc.war -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <warName>irctc</warName>
                    <webResources>
                        <resource>
                            <directory>dist</directory>
                            <targetPath>/</targetPath>
                        </resource>
                        <resource>
                            <directory>src/main/webapp</directory>
                            <targetPath>/</targetPath>
                        </resource>
                    </webResources>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`,
                    'pom-xml'
                  )}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSnippet === 'pom-xml' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy pom.xml</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-72">
{`<!-- Key plugins inside pom.xml -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>3.4.0</version>
    <configuration>
        <warName>irctc</warName>
        <webResources>
            <resource>
                <directory>dist</directory>
                <targetPath>/</targetPath>
            </resource>
            <resource>
                <directory>src/main/webapp</directory>
                <targetPath>/</targetPath>
            </resource>
        </webResources>
    </configuration>
</plugin>`}
              </pre>
            </div>

            {/* 5. Execution Workflow Steps */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-emerald-950 text-xs uppercase flex items-center gap-1.5">
                <Hammer className="w-4 h-4 text-emerald-700" />
                <span>Standard Maven Lifecycle Commands</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                  <span className="font-mono font-bold text-emerald-800">1. Generate Archetype</span>
                  <p className="text-slate-600">Run the <code className="font-mono">mvn archetype:generate</code> command above in your terminal.</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                  <span className="font-mono font-bold text-emerald-800">2. Build WAR Package</span>
                  <p className="text-slate-600">Run <code className="font-mono font-bold">mvn clean package</code>. Generates <code className="font-mono">target/irctc.war</code>.</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                  <span className="font-mono font-bold text-emerald-800">3. Deploy to Tomcat</span>
                  <p className="text-slate-600">Run <code className="font-mono font-bold">cp target/irctc.war $CATALINA_HOME/webapps/</code> and restart Tomcat!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: WEB-INF/web.xml Inspector */}
        {activeTab === 'WEB_XML' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  WEB-INF/web.xml Deployment Descriptor
                </h3>
                <p className="text-xs text-slate-500">
                  Standard Jakarta Servlet configuration bundled inside the WAR archive.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(currentWebXml, 'xml')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSnippet === 'xml' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy XML</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-96">
              <code>{currentWebXml}</code>
            </pre>
          </div>
        )}

        {/* Tab 3: Step-by-step Tomcat Deployment Guide */}
        {activeTab === 'DEPLOY_GUIDE' && (
          <div className="space-y-6 text-xs text-slate-700">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                How to Deploy {appName}.war on Apache Tomcat
              </h3>
              <p className="text-slate-500">
                Follow these 3 quick steps on your local server, virtual machine, or cloud instance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#213d77] text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Download WAR</h4>
                <p className="text-slate-600 text-xs">
                  Click the <strong>Download {appName}.war</strong> button or run <code className="font-mono bg-slate-200 px-1 rounded">npm run build:war</code> in terminal.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#213d77] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Copy to webapps/</h4>
                <p className="text-slate-600 text-xs">
                  Place the file into your Tomcat installation directory under the <code className="font-mono bg-slate-200 px-1 rounded">webapps/</code> folder.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="w-6 h-6 rounded-full bg-[#213d77] text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Start Tomcat</h4>
                <p className="text-slate-600 text-xs">
                  Execute <code className="font-mono bg-slate-200 px-1 rounded">bin/startup.sh</code> (or <code className="font-mono bg-slate-200 px-1 rounded">startup.bat</code> on Windows). Tomcat will auto-expand the archive!
                </p>
              </div>
            </div>

            {/* Terminal Commands Card */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 font-mono space-y-3 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-[11px] font-bold">Linux / macOS Terminal Deployment Commands</span>
                <button
                  onClick={() => copyToClipboard(`cp ${appName}.war /opt/tomcat/webapps/\ncd /opt/tomcat/bin\n./startup.sh`, 'bash')}
                  className="hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSnippet === 'bash' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-500"># 1. Copy WAR to Tomcat webapps directory</p>
                <p className="text-emerald-400">cp {appName}.war /opt/tomcat/webapps/</p>
                <p className="text-slate-500 pt-1"># 2. Navigate to Tomcat bin directory</p>
                <p className="text-emerald-400">cd /opt/tomcat/bin</p>
                <p className="text-slate-500 pt-1"># 3. Start Apache Tomcat Server</p>
                <p className="text-emerald-400">./startup.sh</p>
                <p className="text-slate-500 pt-1"># 4. Open in browser:</p>
                <p className="text-amber-300 font-bold">http://localhost:8080{contextPath}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Docker & CI/CD */}
        {activeTab === 'DOCKER' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Docker Deployment with Official Tomcat Image
                </h3>
                <p className="text-xs text-slate-500">
                  One-liner Dockerfile to run IRCTC WAR in a container.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(dockerSnippet, 'docker')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSnippet === 'docker' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Dockerfile</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{dockerSnippet}</code>
            </pre>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800">To build and run with Docker:</p>
              <div className="bg-slate-900 text-emerald-400 p-3 rounded font-mono space-y-1">
                <p>docker build -t irctc-tomcat .</p>
                <p>docker run -d -p 8080:8080 --name my-irctc irctc-tomcat</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
