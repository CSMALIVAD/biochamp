import { state }
from "./state.js";

import {
render
}
from "./renderer.js";


// ======================
// ADMIN LOGIN
// ======================

export function adminLogin(){

const password =
prompt(
"Enter Admin Password"
);

if(password === "biochamp"){

state.adminMode = true;

document
.getElementById(
"adminBar"
)
.style.display = "block";

alert(
"Admin Mode Enabled"
);

}
else{

alert(
"Wrong Password"
);

}

}


// ======================
// SELECT OBJECT
// ======================

window.selectObject = function(id){

if(!state.adminMode)
return;

const obj =
state.objects.find(
o => o.id == id
);

if(!obj) return;

state.selectedObject = obj;


// LABEL

document
.getElementById(
"editLabel"
)
.value = obj.label || "";


// COLOR

document
.getElementById(
"editColor"
)
.value = obj.fill || "#ffffff";


// SHAPE

document
.getElementById(
"editShape"
)
.value = obj.shape || "rect";

};


// ======================
// APPLY CHANGES
// ======================

export function applyChanges(){

if(!state.selectedObject)
return;


// UPDATE LABEL

state.selectedObject.label =

document
.getElementById(
"editLabel"
)
.value;


// UPDATE COLOR

state.selectedObject.fill =

document
.getElementById(
"editColor"
)
.value;


// UPDATE SHAPE

state.selectedObject.shape =

document
.getElementById(
"editShape"
)
.value;


// RERENDER

render();

}
