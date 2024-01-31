import { JSDOM } from "jsdom";
import * as d3 from "d3";
import http from "http";

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dom Manipulator</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>something to do modify</p>
        <button id="btn">Click Me!</button>

        <script>
        // Client-side code to handle button click event
        document.getElementById("btn").addEventListener("click", () => {
            fetch("/modify").then((res) => res.text()).then((data) => document.body.innerHTML = data).catch((err) => console.log(err));
        })
        </script>
    </body>
    </html>
`;

const rect = `
<path d="M10 10 h80 v80 h-80 Z" stroke="red" fill="purple"></path>`;

//get the dom object by instantiating JSDOM
const dom = new JSDOM(htmlContent);
const document = dom.window.document;
const modifier = ([v1, v2, v3]) => {
  const h1 = document.createElement("h1");
  h1.textContent = "New Normal";
  document.body.appendChild(h1);

  //   const svg = document.createElement("svg");
  //   svg.innerHTML = rect;
  console.log(v1, v2, v3);
  const svg = generatePieChart(v1, v2, v3);
  document.body.appendChild(svg);

  return dom.serialize();
};

http
  .createServer((req, res) => {
    let values = [];
    if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon",
      });
      return res.end();
    }

    if (req.url === "/modify") {
      const modifiedHtml = modifier(values.map((v) => Number(v)));
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(modifiedHtml);
      return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    values = url.searchParams.get("values").split(",");
    console.log(
      values,
      values.map((v) => Number(v))
    );
    const cacheKeys = values.sort().join("");

    //when client connects send html
    res.write(htmlContent);
    res.end();
  })
  .listen(4040, () => {
    console.log("Server running at http://localhost:4040/");
  });

const generatePieChart = (v1, v2, v3) => {
  //generate pie chart using D3
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  //create svg canvas
  const pieSvg = d3
    .select(document.createElement("div"))
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  //create data
  const data = [v1, v2, v3];

  //create color scale
  const color = d3
    .scaleOrdinal()
    .domain(data)
    .range(["red", "orange", "yellow"]);

  //create pie
  const pie = d3.pie().value((d) => d);

  //create arc
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  //create arcs group
  const arcs = pieSvg
    .selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data));

  return pieSvg.node();
};
