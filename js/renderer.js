import { state }
from "./state.js";

import {
getBoxWidth
}
from "./utils.js";

const canvas=
document.getElementById(
"canvas"
);

export function render(){

canvas.innerHTML="";

state.pathways.forEach((p,index)=>{

const leftWidth=
getBoxWidth(p.mol1);

const rightWidth=
getBoxWidth(p.mol2);

canvas.innerHTML += `

<!-- ARROW -->

<line

x1="${p.x1+leftWidth/2}"

y1="${p.y1}"

x2="${p.x2-rightWidth/2}"

y2="${p.y2}"

class="arrow"

/>


<!-- LEFT NODE -->

<rect

x="${p.x1-leftWidth/2}"

y="${p.y1-50}"

width="${leftWidth}"

height="100"

rx="20"

fill="${p.leftColor}"

class="node"

data-side="left"

data-index="${index}"

onclick="selectObject('left',${index})"

/>

<text

x="${p.x1}"

y="${p.y1+10}"

class="label"

>

${p.mol1}

</text>


<!-- RIGHT NODE -->

<rect

x="${p.x2-rightWidth/2}"

y="${p.y2-50}"

width="${rightWidth}"

height="100"

rx="20"

fill="${p.rightColor}"

class="node"

data-side="right"

data-index="${index}"

onclick="selectObject('right',${index})"

/>

<text

x="${p.x2}"

y="${p.y2+10}"

class="label"

>

${p.mol2}

</text>


<!-- ENZYME -->

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1-70}"

class="enzyme"

>

${p.enzyme}

</text>


<!-- COFACTOR INPUT -->

<rect

x="${((p.x1+p.x2)/2)-80}"

y="${p.y1-180}"

width="160"

height="60"

rx="12"

fill="#9c27b0"

stroke="white"

stroke-width="2"

/>

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1-142}"

class="label"

>

${p.coIn}

</text>


<!-- COFACTOR OUTPUT -->

<rect

x="${((p.x1+p.x2)/2)-80}"

y="${p.y1+120}"

width="160"

height="60"

rx="12"

fill="#673ab7"

stroke="white"

stroke-width="2"

/>

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1+158}"

class="label"

>

${p.coOut}

</text>

`;

});

updateTransform();

}

export function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${state.panX},${state.panY})
scale(${state.scale})
`

);

}
