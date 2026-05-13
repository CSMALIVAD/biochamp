const canvas = document.getElementById("canvas");
const svg = document.getElementById("viewer");


// ======================
// STATE
// ======================

let objects = [];

let connections = [];

let selectedObject = null;

let adminMode = false;

let scale = 1;

let panX = 0;
let panY = 0;

let draggingCanvas = false;

let dragObject = null;

let resizeObject = null;

let startX = 0;
let startY = 0;


// ======================
// CREATE CONNECTION
// ======================

function connect(from,to){

connections.push({

id:"conn"+Date.now(),

from,
to

});

}


// ======================
// CREATE LINEAR
// ======================

document.getElementById(
"linearBtn"
).onclick = function(){

const pathwayId =
"linear"+Date.now();

const mol1 =
document.getElementById("mol1").value;

const enzyme =
document.getElementById("enzyme").value;

const mol2 =
document.getElementById("mol2").value;

const coIn =
document.getElementById("coIn").value;

const coOut =
document.getElementById("coOut").value;


// LEFT

const left = {

id:"a"+Date.now(),

pathwayId,

type:"metabolite",

label:mol1,

x:500,

y:300 + objects.length*40,

width:220,

height:100,

fill:"#00d4ff",

shape:"rect"

};


// RIGHT

const right = {

id:"b"+Date.now(),

pathwayId,

type:"metabolite",

label:mol2,

x:1200,

y:300 + objects.length*40,

width:220,

height:100,

fill:"#ff9800",

shape:"rect"

};


// ENZYME

const enz = {

id:"c"+Date.now(),

pathwayId,

type:"enzyme",

label:enzyme,

x:850,

y:220 + objects.length*40,

fill:"#00ff88"

};


// COFACTOR INPUT

const cin = {

id:"d"+Date.now(),

pathwayId,

type:"cofactor",

label:coIn,

x:850,

y:120 + objects.length*40,

width:180,

height:60,

fill:"#9c27b0",

shape:"pill"

};


// COFACTOR OUTPUT

const cout = {

id:"e"+Date.now(),

pathwayId,

type:"cofactor",

label:coOut,

x:850,

y:450 + objects.length*40,

width:180,

height:60,

fill:"#673ab7",

shape:"pill"

};


objects.push(left);
objects.push(right);
objects.push(enz);
objects.push(cin);
objects.push(cout);


// CONNECTIONS

connect(left.id,right.id);

render();

};


// ======================
// CREATE CIRCULAR
// ======================

document.getElementById(
"circleBtn"
).onclick = function(){

const pathwayId =
"circle"+Date.now();

const names = [

document.getElementById("mol1").value,
document.getElementById("enzyme").value,
document.getElementById("mol2").value,
document.getElementById("coIn").value,
document.getElementById("coOut").value

].filter(
n=>n.trim()!==""
);

const centerX = 900;
const centerY = 500;
const radius = 320;

const created = [];


names.forEach((name,index)=>{

const angle =
(index/names.length)
*
Math.PI
*
2;

const x =
centerX +
Math.cos(angle)
*
radius;

const y =
centerY +
Math.sin(angle)
*
radius;

const obj = {

id:"circle"+Date.now()+index,

pathwayId,

type:"metabolite",

label:name,

x,

y,

width:220,

height:100,

fill:"#2196f3",

shape:"pill"

};

objects.push(obj);

created.push(obj);

});


// CONNECT CIRCLE

for(
let i=0;
i<created.length;
i++
){

connect(

created[i].id,

created[
(i+1)%created.length
].id

);

}

render();

};


// ======================
// RENDER
// ======================

function render(){

canvas.innerHTML = "";


// ======================
// DRAW CONNECTIONS
// ======================

connections.forEach(conn=>{

const left =
objects.find(
o=>o.id===conn.from
);

const right =
objects.find(
o=>o.id===conn.to
);

if(!left || !right)
return;

drawArrow(left,right);

});


// ======================
// DRAW OBJECTS
// ======================

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


// SHAPES

let rx = 20;

if(obj.shape==="circle"){
rx = 1000;
}

if(obj.shape==="pill"){
rx = 60;
}


// SELECTED

let selectedClass = "";

if(
selectedObject &&
selectedObject.id===obj.id
){
selectedClass = "selected";
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

class="node ${selectedClass}"

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


${selectedObject &&
selectedObject.id===obj.id
? `

<circle

cx="${obj.x + obj.width/2}"

cy="${obj.y + obj.height/2}"

r="10"

fill="#00ff88"

data-resize="${obj.id}"

/>

`
: ""}

`;

});


updateTransform();

}


// ======================
// DRAW ARROW
// ======================

function drawArrow(left,right){

const startX =
left.x + left.width/2;

const startY =
left.y;

const endX =
right.x - right.width/2;

const endY =
right.y;

const curveX =
(startX + endX)/2;

const curveY =
(startY + endY)/2 - 120;


canvas.innerHTML += `

<path

d="

M ${startX} ${startY}

Q ${curveX} ${curveY}

${endX} ${endY}

"

stroke="white"

stroke-width="4"

fill="none"

marker-end="url(#arrowhead)"

/>

`;

}


// ======================
// ADMIN LOGIN
// ======================

document.getElementById(
"adminBtn"
).onclick = function(){

const pass =
prompt(
"Enter Password"
);

if(pass==="biochamp"){

adminMode = true;

document.getElementById(
"adminBar"
).style.display = "block";

alert(
"Admin Enabled"
);

}

};


// ======================
// SELECT OBJECT
// ======================

svg.addEventListener(
"click",
function(e){

if(!adminMode)
return;

const id =
e.target.dataset.id;

if(!id)
return;

selectedObject =
objects.find(
o=>o.id===id
);

if(!selectedObject)
return;

document.getElementById(
"editLabel"
).value =
selectedObject.label;

document.getElementById(
"editColor"
).value =
selectedObject.fill;

document.getElementById(
"editShape"
).value =
selectedObject.shape;

render();

}
);


// ======================
// APPLY
// ======================

document.getElementById(
"applyBtn"
).onclick = function(){

if(!selectedObject)
return;

selectedObject.label =
document.getElementById(
"editLabel"
).value;

selectedObject.fill =
document.getElementById(
"editColor"
).value;

selectedObject.shape =
document.getElementById(
"editShape"
).value;

render();

};


// ======================
// DELETE
// ======================

document.getElementById(
"deleteBtn"
).onclick = function(){

if(!selectedObject)
return;


// REMOVE CONNECTIONS

connections = connections.filter(
c =>
c.from !== selectedObject.id &&
c.to !== selectedObject.id
);


// REMOVE OBJECT

objects = objects.filter(
o=>o.id!==selectedObject.id
);

selectedObject = null;

render();

};


// ======================
// DUPLICATE
// ======================

document.getElementById(
"duplicateBtn"
).onclick = function(){

if(!selectedObject)
return;

const copy = {

...selectedObject,

id:"copy"+Date.now(),

x:selectedObject.x+80,

y:selectedObject.y+80

};

objects.push(copy);

render();

};


// ======================
// SAVE
// ======================

document.getElementById(
"saveBtn"
).onclick = function(){

localStorage.setItem(
"biochamp_objects",
JSON.stringify(objects)
);

localStorage.setItem(
"biochamp_connections",
JSON.stringify(connections)
);

alert("Saved");

};


// ======================
// LOAD
// ======================

document.getElementById(
"loadBtn"
).onclick = function(){

const objData =
localStorage.getItem(
"biochamp_objects"
);

const connData =
localStorage.getItem(
"biochamp_connections"
);

if(objData){

objects = JSON.parse(objData);

}

if(connData){

connections = JSON.parse(connData);

}

render();

alert("Loaded");

};


// ======================
// ZOOM
// ======================

svg.addEventListener(
"wheel",
function(e){

e.preventDefault();

if(e.deltaY<0){
scale*=1.1;
}else{
scale*=0.9;
}

updateTransform();

}
);


// ======================
// MOUSE DOWN
// ======================

svg.addEventListener(
"mousedown",
function(e){

const resizeId =
e.target.dataset.resize;

if(resizeId){

resizeObject = resizeId;

return;

}

const id =
e.target.dataset.id;

if(id){

dragObject = id;

return;

}

draggingCanvas = true;

startX =
e.clientX - panX;

startY =
e.clientY - panY;

}
);


// ======================
// MOUSE UP
// ======================

window.addEventListener(
"mouseup",
function(){

dragObject = null;

resizeObject = null;

draggingCanvas = false;

}
);


// ======================
// MOUSE MOVE
// ======================

window.addEventListener(
"mousemove",
function(e){

// RESIZE

if(resizeObject){

const obj =
objects.find(
o=>o.id===resizeObject
);

if(obj){

obj.width = Math.max(
80,
((e.clientX-panX)/scale)
-
obj.x
+
obj.width/2
);

obj.height = Math.max(
40,
((e.clientY-panY)/scale)
-
obj.y
+
obj.height/2
);

render();

}

return;

}


// DRAG

if(dragObject){

const obj =
objects.find(
o=>o.id===dragObject
);

if(obj){

obj.x =
(e.clientX-panX)
/scale;

obj.y =
(e.clientY-panY)
/scale;

render();

}

return;

}


// PAN

if(!draggingCanvas)
return;

panX =
e.clientX-startX;

panY =
e.clientY-startY;

updateTransform();

}
);


// ======================
// UPDATE VIEW
// ======================

function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${panX},${panY})
scale(${scale})
`

);

}


// ======================
// KEYBOARD
// ======================

window.addEventListener(
"keydown",
function(e){

// DELETE

if(e.key==="Delete"){

if(!selectedObject)
return;

connections = connections.filter(
c =>
c.from !== selectedObject.id &&
c.to !== selectedObject.id
);

objects = objects.filter(
o=>o.id!==selectedObject.id
);

selectedObject = null;

render();

}


// DUPLICATE

if(
e.ctrlKey &&
e.key==="d"
){

e.preventDefault();

if(!selectedObject)
return;

const copy = {

...selectedObject,

id:"copy"+Date.now(),

x:selectedObject.x+80,

y:selectedObject.y+80

};

objects.push(copy);

render();

}

}
);
