// function to generate a pie svg using D3.js
import * as d3 from "d3";
import { JSDOM } from "jsdom";
import fs from "fs";

const generatePieChart = (values) => {
  const width = 800;
  const height = 600;
  const radius = Math.min(width, height) / 2;
  const { document } = new JSDOM().window;
  const colorPalette = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];

  //create svg canvas
  const pieSVG = d3
    .select(document.body)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  //create data
  const data = values;

  //create color scale
  const color = d3.scaleOrdinal().domain(data).range(colorPalette);

  //create pie generator
  const pie = d3.pie().value((d) => d);

  //create arc generator
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  //create arcs group
  const arcs = pieSVG
    .selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data));

  return pieSVG.node().parentElement.outerHTML;
};

// console.log(generatePieChart([1, 2, 3, 5]));
//<svg width="500" height="500"><g class="arc"><path d="M-216.506,-125A250,250,0,0,1,0,-250L0,0Z" fill="red"></path></g><g class="arc"><path d="M0,250A250,250,0,0,1,-216.506,-125L0,0Z" fill="yellow"></path></g><g class="arc"><path d="M0,-250A250,250,0,1,1,0,250L0,0Z" fill="blue"></path></g></svg>

export default generatePieChart;
