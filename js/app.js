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

const linearBtn=
document.getElementById(
"linearBtn"
);

linearBtn.onclick=function(){

const mol1=
document.getElementById(
"mol1"
).value;

const enzyme=
document.getElementById(
"enzyme"
).value;

const mol2=
document.getElementById(
"mol2"
).value;

const coIn=
document.getElementById(
"coIn"
).value;

const coOut=
document.getElementById(
"coOut"
).value;

state.pathways.push({

id:Date.now(),

mol1,
mol2,
enzyme,
coIn,
coOut,

x1:500,

y1:
300 +
state.pathways.length
*250,

x2:1200,

y2:
300 +
state.pathways.length
*250,

leftColor:"#00d4ff",

rightColor:"#ff9800"

});

render();

};

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
