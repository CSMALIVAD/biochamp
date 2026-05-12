import { state }
from "./state.js";

const canvas=
document.getElementById(
"canvas"
);

export function render(){

canvas.innerHTML="";

renderConnections();

renderObjects();

updateTransform();

}


function renderConnections(){

const metabolites=
state.objects.filter(
o=>o.type==="metabolite"
);

for(let i=0;i<metabolites.length-1;i+=2){

const left=
metabolites[i];

const right=
metabolites[i+1];

if(!left || !right)
continue;

canvas.innerHTML += `

<line

x1="${left.x+left.width/2}"

y1="${left.y}"

x2="${right.x-right.width/2}"

y2="${right.y}"

class="arrow"

/>

`;

}

}


function renderObjects(){

state.objects.forEach(obj=>{

// METABOLITE

if(obj.type==="metabolite"){

canvas.innerHTML += `

<rect

x="${obj.x-obj.width/2}"

y="${obj.y-obj.height/2}"

width="${obj.width}"

height="${obj.height}"

rx="20"

fill="${obj.fill}"

class="node"

data-id="${obj.id}"

onclick="selectObject('${obj.id}')"

/>

<text

x="${obj.x}"

y="${obj.y+10}"

class="label"

>

${obj.label}

</text>

`;

}


// COFACTOR

if(obj.type==="cofactor"){

canvas.innerHTML += `

<rect

x="${obj.x-obj.width/2}"

y="${obj.y-obj.height/2}"

width="${obj.width}"

height="${obj.height}"

rx="12"

fill="${obj.fill}"

stroke="white"

stroke-width="2"

class="node"

data-id="${obj.id}"

onclick="selectObject('${obj.id}')"

/>

<text

x="${obj.x}"

y="${obj.y+8}"

class="label"

>

${obj.label}

</text>

`;

}


// ENZYME

if(obj.type==="enzyme"){

canvas.innerHTML += `

<text

x="${obj.x}"

y="${obj.y}"

fill="${obj.fill}"

font-size="26"

text-anchor="middle"

class="node"

data-id="${obj.id}"

onclick="selectObject('${obj.id}')"

>

${obj.label}

</text>

`;

}

});

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
