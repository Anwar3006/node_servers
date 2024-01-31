const { JSDOM } = require("jsdom");

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Work with JSDOM</title>
    </head>
    <body>
        <h1>Bomboclat!</h1>
        <p>Hi, I'm Bomboclat!</p>
    </body>
    </html>
`;

//get the dom object by instantiating JSDOM
const dom = new JSDOM(htmlContent);
//retreive the document object
const document = dom.window.document;

//get the h1 element and modify it
const h1 = document.querySelector("h1");
h1.textContent = "Bombo_modified";

//get the p element and modify it and reassign
const p = document.querySelector("p");
p.textContent = "Bombomodified spoke at lenght";

console.log(dom.serialize());
