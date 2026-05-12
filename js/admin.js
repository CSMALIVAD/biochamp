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


// SELECT OBJECT

window.selectObject=function(id){

if(!state.adminMode)
return;

const obj=
state.objects.find(
o=>o.id==id
);

if(!obj) return;

state.selectedObject=obj;

document
.getElementById(
"editLabel"
)
.value=obj.label;

document
.getElementById(
"editColor"
)
.value=obj.fill;

};


// APPLY CHANGES

export function applyChanges(){

if(!state.selectedObject)
return;

state.selectedObject.label=

document
.getElementById(
"editLabel"
)
.value;

state.selectedObject.fill=

document
.getElementById(
"editColor"
)
.value;

render();

}
