//import { xsltProcess, xmlParse } from "xslt-processor"

const xsltProcess = require("xslt-processor").xsltProcess;
const xmlParse = require("xslt-processor").xmlParse;

const fs = require("fs");
let xmlString = fs.readFileSync("./testdata/releases1.rss").toString();

let xsltString = `<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  version="1.0"> 

  <xsl:output omit-xml-declaration="no" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <!-- Copy the input -->
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

  <!-- Strip out all items not matching our criteria -->
  <xsl:template match="item[not(contains(./title/text(),'iOS'))]" />

</xsl:stylesheet>`

const xml = xmlParse(xmlString); // xmlString: string of xml file contents
const xslt = xmlParse(xsltString); // xsltString: string of xslt file contents
const outXmlString = xsltProcess(xml, xslt); // outXmlString: output xml string.

console.log(outXmlString);