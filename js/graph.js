import { state }
from "./state.js";


// ========================
// FIND EXISTING NODE
// ========================

export function getNodeByLabel(label){

return state.graph.nodes.find(

node =>

node.label.toLowerCase()
===
label.toLowerCase()

);

}


// ========================
// CREATE NODE
// ========================

export function createNode(

label,
x,
y

){

// reuse node if exists

const existing =
getNodeByLabel(label);

if(existing){

return existing.id;

}


// unique id

const id =

label
.toLowerCase()
.replaceAll(" ","_");


// create node object

state.graph.nodes.push({

id,

label,

x,
y,

width:180,
height:80,

shape:"rect",

fill:"#00d4ff",

stroke:"#ffffff",

fontSize:18,

type:"metabolite",

draggable:true,

editable:true

});

return id;

}



// ========================
// CREATE REACTION
// ========================

export function createReaction(

sourceLabel,
targetLabel,
enzyme,
coIn,
coOut

){

// source node

const sourceId =
createNode(

sourceLabel,

250,

250 +
state.graph.nodes.length
* 140

);


// target node

const targetId =
createNode(

targetLabel,

700,

250 +
state.graph.nodes.length
* 140

);


// reaction object

state.graph.reactions.push({

id:
"reaction_" +
Date.now(),

source:sourceId,

target:targetId,

enzyme,

reversible:false,

arrowType:"straight",

thickness:4,

color:"#ffffff",

cofactors:[

{
input:coIn,
output:coOut
}

]

});

}
