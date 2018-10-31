exports.handler = function(e, c) {
  const libxslt = require('libxslt');
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

  var stylesheet = libxslt.parse(xsltString);
  var result = stylesheet.apply(xmlString);

  c.succeed(result);
} 