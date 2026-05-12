import { state }
from "./state.js";

import {
render
}
from "./renderer.js";

export function adminLogin(){

const pass=
prompt(
"Enter Password"
);

if(pass==="biochamp"){

state.adminMode=true;

document
.getElementById(
"adminBar"
)
.style.display="block";

alert(
"Admin Mode Enabled"
);

}
else{

alert("Wrong Password");

}

}

window.selectObject=function(
side,
index
){

if(!state.adminMode)
return;

state.selectedObject={
side,
index
};

const p=
state.pathways[index];

if(side==="left"){

document
.getElementById(
"editLabel"
)
.value=p.mol1;

document
.getElementById(
"editColor"
)
.value=p.leftColor;

}

if(side==="right"){

document
.getElementById(
"editLabel"
)
.value=p.mol2;

document
.getElementById(
"editColor"
)
.value=p.rightColor;

}

};

export function applyChanges(){

if(!state.selectedObject)
return;

const p=
state.pathways[
state.selectedObject.index
];

const label=
document
.getElementById(
"editLabel"
)
.value;

const color=
document
.getElementById(
"editColor"
)
.value;

if(
state.selectedObject.side
==="left"
){

p.mol1=label;

p.leftColor=color;

}

if(
state.selectedObject.side
==="right"
){

p.mol2=label;

p.rightColor=color;

}

render();

}
