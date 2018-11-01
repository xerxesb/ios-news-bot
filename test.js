const app = require("./index.js");

const event = {
  "args": {
    "localTest": true,
    "testFile": "releases1.rss"
  }
}

const context = {
  done: function() { }
}

function callback(_, response) {
  console.log(response);
}

app.handler(event, context, callback);