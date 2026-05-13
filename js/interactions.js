// =====================================================
// interactions.js
// BioChamp Interaction Engine
// =====================================================


// =========================
// GLOBAL INTERACTION STATE
// =========================

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

window.startX = 0;

window.startY = 0;

window.scale = 1;

window.panX = 0;

window.panY = 0;


// =========================
// UPDATE TRANSFORM
// =========================

window.updateTransform = function(){

if(!window.canvas) return;

window.canvas.setAttribute(

"transform",

`
translate(${window.panX},${window.panY})
scale(${window.scale})
`

);

};


// =========================
// ZOOM
// =========================

window.svg.addEventListener(
"wheel",
function(e){

e.preventDefault();

if(e.deltaY < 0){

window.scale *= 1.1;

}else{

window.scale *= 0.9;

}

window.updateTransform();

}
);


// =========================
// MOUSE DOWN
// =========================

window.svg.addEventListener(
"mousedown",
function(e){

const resizeId =
e.target.dataset.resize;

if(resizeId){

window.resizeObject =
resizeId;

return;

}


const id =
e.target.dataset.id;

if(id){

window.dragObject =
id;

return;

}


// PAN

window.draggingCanvas =
true;

window.startX =
e.clientX - window.panX;

window.startY =
e.clientY - window.panY;

}
);


// =========================
// MOUSE UP
// =========================

window.addEventListener(
"mouseup",
function(){

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

}
);


// =========================
// MOUSE MOVE
// =========================

window.addEventListener(
"mousemove",
function(e){

// =========================
// RESIZE OBJECT
// =========================

if(window.resizeObject){

const obj =
window.objects.find(
o => o.id === window.resizeObject
);

if(obj){

obj.width = Math.max(

80,

(
(e.clientX - window.panX)
/
window.scale
)
-
obj.x
+
obj.width/2

);

obj.height = Math.max(

40,

(
(e.clientY - window.panY)
/
window.scale
)
-
obj.y
+
obj.height/2

);

window.renderScene();

}

return;

}


// =========================
// DRAG OBJECT
// =========================

if(window.dragObject){

const obj =
window.objects.find(
o => o.id === window.dragObject
);

if(obj){

obj.x =
(
e.clientX - window.panX
)
/
window.scale;

obj.y =
(
e.clientY - window.panY
)
/
window.scale;

window.renderScene();

}

return;

}


// =========================
// PAN CANVAS
// =========================

if(!window.draggingCanvas)
return;

window.panX =
e.clientX - window.startX;

window.panY =
e.clientY - window.startY;

window.updateTransform();

}
);


// =========================
// OBJECT SELECTION
// =========================

window.svg.addEventListener(
"click",
function(e){

if(!window.adminMode)
return;

const id =
e.target.dataset.id;

if(!id)
return;

window.selectedObject =
window.objects.find(
o => o.id === id
);

if(!window.selectedObject)
return;


// LOAD EDITOR VALUES

document.getElementById(
"editLabel"
).value =
window.selectedObject.label;

document.getElementById(
"editColor"
).value =
window.selectedObject.fill;

document.getElementById(
"editShape"
).value =
window.selectedObject.shape;


window.renderScene();

}
);
