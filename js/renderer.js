import { state }
from "./state.js";

const canvas =
document.getElementById(
"canvas"
);


// ======================
// MAIN RENDER
// ======================

export function render(){

canvas.innerHTML = "";

renderConnections();

renderObjects();

updateTransform();

}


// ======================
// CONNECTIONS
// ======================

function renderConnections(){

const metabolites =
state.objects.filter(
o => o.type === "metabolite"
);

for(
let i=0;
i<metabolites.length-1;
i+=2
){

const left =
metabolites[i];

const right =
metabolites[i+1];

if(!left || !right)
continue;

canvas.innerHTML += `

<line

x1="${left.x + left.width/2}"

y1="${left.y}"

x2="${right.x - right.width/2}"

y2="${right.y}"

class="arrow"

/>

`;

}

}


// ======================
// OBJECTS
// ======================

function renderObjects(){

state.objects.forEach(obj=>{


// ===================
// ENZYME TEXT
// ===================

if(obj.type==="enzyme"){

canvas.innerHTML += `

<text

x="${obj.x}"

y="${obj.y}"

fill="${obj.fill}"

font-size="28"

text-anchor="middle"

class="node"

data-id="${obj.id}"

onclick="selectObject('${obj.id}')"

>

${obj.label}

</text>

`;

return;

}


// ===================
// SHAPE LOGIC
// ===================

let rx = 20;

if(obj.shape === "circle"){

rx = 1000;

}

if(obj.shape === "pill"){

rx = 60;

}


// ===================
// DRAW OBJECT
// ===================

canvas.innerHTML += `

<rect

x="${obj.x - obj.width/2}"

y="${obj.y - obj.height/2}"

width="${obj.width}"

height="${obj.height}"

rx="${rx}"

fill="${obj.fill}"

stroke="white"

stroke-width="2"

class="node"

data-id="${obj.id}"

onclick="selectObject('${obj.id}')"

/>

<text

x="${obj.x}"

y="${obj.y + 8}"

class="label"

>

${obj.label}

</text>

`;

});

}


// ======================
// UPDATE VIEW
// ======================

export function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${state.panX},${state.panY})
scale(${state.scale})
`

);

}
