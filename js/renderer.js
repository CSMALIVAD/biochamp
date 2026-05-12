import { state }
from "./state.js";

import {
getBoxWidth
}
from "./utils.js";


const canvas =
document.getElementById("canvas");


// ========================
// UPDATE VIEW
// ========================

export function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${state.panX},${state.panY})
scale(${state.scale})
`

);

}



// ========================
// MAIN RENDER
// ========================

export function render(){

canvas.innerHTML = "";

renderReactions();

renderNodes();

updateTransform();

}



// ========================
// RENDER NODES
// ========================

function renderNodes(){

state.graph.nodes.forEach(node=>{

const width =
getBoxWidth(node.label);

canvas.innerHTML += `

<rect

x="${node.x - width/2}"

y="${node.y - 40}"

width="${width}"

height="80"

rx="14"

fill="${node.fill}"

stroke="${node.stroke}"

stroke-width="2"

class="node"

data-node="${node.id}"

/>

<text

x="${node.x}"

y="${node.y+5}"

class="label"

>

${node.label}

</text>

`;

});

}



// ========================
// RENDER REACTIONS
// ========================

function renderReactions(){

state.graph.reactions.forEach(r=>{

const source =
state.graph.nodes.find(
n => n.id === r.source
);

const target =
state.graph.nodes.find(
n => n.id === r.target
);

if(!source || !target) return;


const width1 =
getBoxWidth(source.label);

const width2 =
getBoxWidth(target.label);


canvas.innerHTML += `

<line

x1="${source.x + width1/2}"

y1="${source.y}"

x2="${target.x - width2/2}"

y2="${target.y}"

stroke="${r.color}"

stroke-width="${r.thickness}"

class="arrow"

/>

<text

x="${(source.x+target.x)/2}"

y="${(source.y+target.y)/2 - 30}"

class="enzyme"

>

${r.enzyme}

</text>

`;

});

}
