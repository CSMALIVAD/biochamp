import { state }
from "./state.js";

import {
updateTransform
}
from "./renderer.js";


const svg =
document.getElementById("viewer");


// ZOOM

svg.addEventListener(
"wheel",
(e)=>{

e.preventDefault();

if(e.deltaY<0){

state.scale*=1.1;

}
else{

state.scale*=0.9;

}

updateTransform();

}
);


// PAN START

svg.addEventListener(
"mousedown",
(e)=>{

state.isDraggingCanvas=true;

state.startX=
e.clientX-state.panX;

state.startY=
e.clientY-state.panY;

}
);


// PAN END

window.addEventListener(
"mouseup",
()=>{

state.isDraggingCanvas=false;

}
);


// PAN MOVE

window.addEventListener(
"mousemove",
(e)=>{

if(!state.isDraggingCanvas)
return;

state.panX=
e.clientX-state.startX;

state.panY=
e.clientY-state.startY;

updateTransform();

}
);
