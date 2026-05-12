const canvas =
document.getElementById("canvas");

const svg =
document.getElementById("viewer");


// =====================
// STATE
// =====================

let adminMode=false;

let selectedObject=null;

let objects=[];

let scale=1;

let panX=0;

let panY=0;

let draggingCanvas=false;

let dragObject=null;

let startX=0;

let startY=0;


// =====================
// CREATE PATHWAY
// =====================

document
.getElementById("linearBtn")
.onclick=function(){

const mol1=
document
.getElementById("mol1")
.value;

const enzyme=
document
.getElementById("enzyme")
.value;

const mol2=
document
.getElementById("mol2")
.value;

const coIn=
document
.getElementById("coIn")
.value;

const coOut=
document
.getElementById("coOut")
.value;


// LEFT NODE

objects.push({

id:"a"+Date.now(),

type:"metabolite",

label:mol1,

x:500,

y:300+objects.length*40,

width:220,

height:100,

fill:"#00d4ff",

shape:"rect"

});


// RIGHT NODE

objects.push({

id:"b"+Date.now(),

type:"metabolite",

label:mol2,

x:1200,

y:300+objects.length*40,

width:220,

height:100,

fill:"#ff9800",

shape:"rect"

});


// ENZYME

objects.push({

id:"c"+Date.now(),

type:"enzyme",

label:enzyme,

x:850,

y:220+objects.length*40,

fill:"#00ff88",

shape:"rect"

});


// COFACTOR INPUT

objects.push({

id:"d"+Date.now(),

type:"cofactor",

label:coIn,

x:850,

y:120+objects.length*40,

width:180,

height:60,

fill:"#9c27b0",

shape:"rect"

});


// COFACTOR OUTPUT

objects.push({

id:"e"+Date.now(),

type:"cofactor",

label:coOut,

x:850,

y:450+objects.length*40,

width:180,

height:60,

fill:"#673ab7",

shape:"rect"

});

render();

};


// =====================
// RENDER
// =====================

function render(){

canvas.innerHTML="";


// CONNECTIONS

const metabolites=
objects.filter(
o=>o.type==="metabolite"
);

for(
let i=0;
i<metabolites.length-1;
i+=2
){

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

stroke="white"

stroke-width="4"

marker-end="url(#arrowhead)"

/>

`;

}


// OBJECTS

objects.forEach(obj=>{


// ENZYME

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

>

${obj.label}

</text>

`;

return;

}


// SHAPE SYSTEM

let rx=20;

if(obj.shape==="circle"){

rx=1000;

}

if(obj.shape==="pill"){

rx=60;

}


// OBJECT

canvas.innerHTML += `

<rect

x="${obj.x-obj.width/2}"

y="${obj.y-obj.height/2}"

width="${obj.width}"

height="${obj.height}"

rx="${rx}"

fill="${obj.fill}"

stroke="white"

stroke-width="2"

class="node"

data-id="${obj.id}"

/>

<text

x="${obj.x}"

y="${obj.y+8}"

fill="white"

font-size="20"

text-anchor="middle"

>

${obj.label}

</text>

`;

});


updateTransform();

}


// =====================
// ADMIN LOGIN
// =====================

document
.getElementById("adminBtn")
.onclick=function(){

const pass=
prompt(
"Enter Password"
);

if(pass==="biochamp"){

adminMode=true;

document
.getElementById(
"adminBar"
)
.style.display="block";

alert(
"Admin Mode Enabled"
);

}

};


// =====================
// SELECT OBJECT
// =====================

svg.addEventListener(
"click",
(e)=>{

if(!adminMode)
return;

const id=
e.target.dataset.id;

if(!id) return;

selectedObject=
objects.find(
o=>o.id===id
);

if(!selectedObject)
return;

document
.getElementById(
"editLabel"
)
.value=
selectedObject.label;

document
.getElementById(
"editColor"
)
.value=
selectedObject.fill;

document
.getElementById(
"editShape"
)
.value=
selectedObject.shape;

}
);


// =====================
// APPLY CHANGES
// =====================

document
.getElementById(
"applyBtn"
)
.onclick=function(){

if(!selectedObject)
return;

selectedObject.label=

document
.getElementById(
"editLabel"
)
.value;

selectedObject.fill=

document
.getElementById(
"editColor"
)
.value;

selectedObject.shape=

document
.getElementById(
"editShape"
)
.value;

render();

};


// =====================
// SAVE
// =====================

document
.getElementById(
"saveBtn"
)
.onclick=function(){

localStorage.setItem(

"biochamp",

JSON.stringify(objects)

);

alert("Saved");

};


// =====================
// LOAD
// =====================

document
.getElementById(
"loadBtn"
)
.onclick=function(){

const data=
localStorage.getItem(
"biochamp"
);

if(data){

objects=
JSON.parse(data);

render();

alert("Loaded");

}

};


// =====================
// ZOOM
// =====================

svg.addEventListener(
"wheel",
(e)=>{

e.preventDefault();

if(e.deltaY<0){

scale*=1.1;

}
else{

scale*=0.9;

}

updateTransform();

}
);


// =====================
// DRAG START
// =====================

svg.addEventListener(
"mousedown",
(e)=>{

const id=
e.target.dataset.id;

if(id){

dragObject=id;

return;

}

draggingCanvas=true;

startX=
e.clientX-panX;

startY=
e.clientY-panY;

}
);


// =====================
// DRAG END
// =====================

window.addEventListener(
"mouseup",
()=>{

dragObject=null;

draggingCanvas=false;

}
);


// =====================
// DRAG MOVE
// =====================

window.addEventListener(
"mousemove",
(e)=>{


// OBJECT DRAG

if(dragObject){

const obj=
objects.find(
o=>o.id===dragObject
);

if(obj){

obj.x=
(e.clientX-panX)
/scale;

obj.y=
(e.clientY-panY)
/scale;

render();

}

return;

}


// CANVAS PAN

if(!draggingCanvas)
return;

panX=
e.clientX-startX;

panY=
e.clientY-startY;

updateTransform();

}
);


// =====================
// UPDATE VIEW
// =====================

function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${panX},${panY})
scale(${scale})
`

);

}
