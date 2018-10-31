const app = require("./index.js");

function callback(_, response) {
    console.log(response);
}

app.handler({}, {}, callback);