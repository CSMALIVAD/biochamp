// =====================================================
// creators.js
// BioChamp Pathway Creation Engine
// =====================================================


// =========================
// CREATE OBJECT
// =========================

window.createNode = function(config){

const node = {

id:
config.id ||
("node_" + Date.now() + Math.random()),

pathwayId:
config.pathwayId || "default",

type:
config.type || "metabolite",

label:
config.label || "Node",

x:
config.x || 500,

y:
config.y || 500,

width:
config.width || 220,

height:
config.height || 100,

fill:
config.fill || "#2196f3",

shape:
config.shape || "rect"

};

window.objects.push(node);

return node;

};


// =========================
// CREATE LINEAR PATHWAY
// =========================

window.createLinearPathway = function(){

const pathwayId =
"linear_" + Date.now();

const mol1 =
document.getElementById(
"mol1"
).value;

const enzyme =
document.getElementById(
"enzyme"
).value;

const mol2 =
document.getElementById(
"mol2"
).value;

const coIn =
document.getElementById(
"coIn"
).value;

const coOut =
document.getElementById(
"coOut"
).value;


// LEFT METABOLITE

const left =
window.createNode({

pathwayId,

type:"metabolite",

label:mol1,

x:500,

y:300,

fill:"#00d4ff",

shape:"rect"

});


// RIGHT METABOLITE

const right =
window.createNode({

pathwayId,

type:"metabolite",

label:mol2,

x:1200,

y:300,

fill:"#ff9800",

shape:"rect"

});


// ENZYME

window.createNode({

pathwayId,

type:"enzyme",

label:enzyme,

x:850,

y:220,

fill:"#00ff88",

shape:"rect"

});


// COFACTOR INPUT

window.createNode({

pathwayId,

type:"cofactor",

label:coIn,

x:850,

y:120,

width:180,

height:60,

fill:"#9c27b0",

shape:"pill"

});


// COFACTOR OUTPUT

window.createNode({

pathwayId,

type:"cofactor",

label:coOut,

x:850,

y:450,

width:180,

height:60,

fill:"#673ab7",

shape:"pill"

});


// CONNECTION

window.createConnection(
left.id,
right.id
);


window.renderScene();

};


// =========================
// CREATE CIRCULAR PATHWAY
// =========================

window.createCircularPathway = function(){

const pathwayId =
"circle_" + Date.now();

const names = [

document.getElementById("mol1").value,

document.getElementById("enzyme").value,

document.getElementById("mol2").value,

document.getElementById("coIn").value,

document.getElementById("coOut").value

].filter(
n => n.trim() !== ""
);


const centerX = 900;

const centerY = 500;

const radius = 300;

const created = [];


names.forEach((name,index)=>{

const angle =

(index / names.length)
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


const node =
window.createNode({

pathwayId,

type:"metabolite",

label:name,

x,

y,

fill:"#2196f3",

shape:"pill"

});


created.push(node);

});


// CIRCULAR CONNECTIONS

for(
let i=0;
i<created.length;
i++
){

window.createConnection(

created[i].id,

created[
(i+1) % created.length
].id

);

}


window.renderScene();

};


// =========================
// BUTTON EVENTS
// =========================

document.getElementById(
"linearBtn"
).onclick = function(){

window.createLinearPathway();

};


document.getElementById(
"circleBtn"
).onclick = function(){

window.createCircularPathway();

};
