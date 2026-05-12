import { state }
from "./state.js";

import {
render,
updateTransform
}
from "./renderer.js";

const svg=
document.getElementById(
"viewer"
);


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


// MOUSE DOWN

svg.addEventListener(
"mousedown",
(e)=>{

const id=
e.target.dataset.id;

if(id){

state.dragObject=id;

return;

}

state.isDraggingCanvas=true;

state.startX=
e.clientX-state.panX;

state.startY=
e.clientY-state.panY;

}
);


// MOUSE UP

window.addEventListener(
"mouseup",
()=>{

state.dragObject=null;

state.isDraggingCanvas=false;

}
);


// MOUSE MOVE

window.addEventListener(
"mousemove",
(e)=>{

// DRAG OBJECT

if(state.dragObject){

const obj=
state.objects.find(
o=>o.id===state.dragObject
);

if(obj){

obj.x=
(e.clientX-state.panX)
/state.scale;

obj.y=
(e.clientY-state.panY)
/state.scale;

render();

}

return;

}


// PAN

if(!state.isDraggingCanvas)
return;

state.panX=
e.clientX-state.startX;

state.panY=
e.clientY-state.startY;

updateTransform();

}
);
const adminBar=
document.getElementById(
"adminBar"
);

let draggingPanel=false;

let panelOffsetX=0;

let panelOffsetY=0;


// PANEL DRAG START

adminBar.addEventListener(
"mousedown",
(e)=>{

draggingPanel=true;

panelOffsetX=
e.offsetX;

panelOffsetY=
e.offsetY;

}
);


// PANEL DRAG END

window.addEventListener(
"mouseup",
()=>{

draggingPanel=false;

}
);


// PANEL DRAG MOVE

window.addEventListener(
"mousemove",
(e)=>{

if(!draggingPanel)
return;

adminBar.style.left=
(e.clientX-panelOffsetX)
+"px";

adminBar.style.top=
(e.clientY-panelOffsetY)
+"px";

adminBar.style.right="auto";

}
);
