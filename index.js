exports.handler = function(event, context, callback) {
  const args = getArgs(event);
  executeHandler(args)
    .then(result => { 
      callback(null, result); // args: (err: {}, res)
    })
}

function getArgs(e) {
  return e != null ? e.args : { "localTest": false };
}

async function executeHandler(args) {
  let inputFeed = await getNewsFeed(args);
  let outputFeed = filterFeedToOnlyIncludeiOS(inputFeed);
  var response = generateResponse(outputFeed);
  return response;
}

async function getNewsFeed(args) {
  if (args != null && args.localTest) {
    const fs = require("fs");
    return fs.readFileSync("./testdata/" + args.testFile).toString();
  } else {
    const feedUrl = "https://developer.apple.com/news/releases/rss/releases.rss";
    const fetch = require("node-fetch");
    const response = await fetch(feedUrl);
    const body = await response.text();
    return body;
  }
}

function filterFeedToOnlyIncludeiOS(inputFeed) {
  const libxslt = require('libxslt');
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
  return stylesheet.apply(inputFeed);  
}

function generateResponse(outputFeed) {
  return {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/rss+xml"
    },
    "body": outputFeed,
    "isBase64Encoded": false
  };
}