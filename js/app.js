import { state }
from "./state.js";

import {
render
}
from "./renderer.js";

import {
saveData,
loadData
}
from "./storage.js";

import {
adminLogin,
applyChanges
}
from "./admin.js";

import "./interactions.js";


// =====================
// CREATE PATHWAY
// =====================

document
.getElementById(
"linearBtn"
)
.onclick=function(){

const mol1=
document
.getElementById(
"mol1"
).value;

const enzyme=
document
.getElementById(
"enzyme"
).value;

const mol2=
document
.getElementById(
"mol2"
).value;

const coIn=
document
.getElementById(
"coIn"
).value;

const coOut=
document
.getElementById(
"coOut"
).value;


// LEFT NODE

state.objects.push({

id:Date.now()+"a",

type:"metabolite",

label:mol1,

x:500,

y:
300 +
state.objects.length
*40,

width:220,

height:100,

fill:"#00d4ff"
  
shape:"rect",
  
});


// RIGHT NODE

state.objects.push({

id:Date.now()+"b",

type:"metabolite",

label:mol2,

x:1200,

y:
300 +
state.objects.length
*40,

width:220,

height:100,

fill:"#ff9800"
  
shape:"rect",
  
});


// ENZYME

state.objects.push({

id:Date.now()+"c",

type:"enzyme",

label:enzyme,

x:850,

y:
220 +
state.objects.length
*40,

fill:"#00ff88"

shape:"rect",

});


// COFACTOR INPUT

state.objects.push({

id:Date.now()+"d",

type:"cofactor",

label:coIn,

x:850,

y:
120 +
state.objects.length
*40,

width:180,

height:60,

fill:"#9c27b0"

shape:"rect",
  
});


// COFACTOR OUTPUT

state.objects.push({

id:Date.now()+"e",

type:"cofactor",

label:coOut,

x:850,

y:
450 +
state.objects.length
*40,

width:180,

height:60,

fill:"#673ab7"
  
shape:"rect",
  
});


render();

};


// BUTTONS

document
.getElementById(
"saveBtn"
)
.onclick=saveData;

document
.getElementById(
"loadBtn"
)
.onclick=loadData;

document
.getElementById(
"adminBtn"
)
.onclick=adminLogin;

document
.getElementById(
"applyBtn"
)
.onclick=applyChanges;
