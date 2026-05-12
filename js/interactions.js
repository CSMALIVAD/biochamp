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

svg.addEventListener(
"mousedown",
(e)=>{

if(
e.target.classList.contains(
"node"
)
){

state.dragNode={
index:parseInt(
e.target.dataset.index
),

side:
e.target.dataset.side
};

return;

}

state.isDragging=true;

state.startX=
e.clientX-state.panX;

state.startY=
e.clientY-state.panY;

}
);

window.addEventListener(
"mouseup",
()=>{

state.isDragging=false;

state.dragNode=null;

}
);

window.addEventListener(
"mousemove",
(e)=>{

if(state.dragNode){

const p=
state.pathways[
state.dragNode.index
];

const x=
(e.clientX-state.panX)
/state.scale;

const y=
(e.clientY-state.panY)
/state.scale;

if(
state.dragNode.side
==="left"
){

p.x1=x;
p.y1=y;

}

if(
state.dragNode.side
==="right"
){

p.x2=x;
p.y2=y;

}

render();

return;

}

if(!state.isDragging)
return;

state.panX=
e.clientX-state.startX;

state.panY=
e.clientY-state.startY;

updateTransform();

}
);
