// =====================================================
// interactions.js
// BioChamp Mobile + Desktop Interaction Engine
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
// UPDATE VIEW
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
// GET POINTER POSITION
// =========================

window.getPointerPosition = function(e){

if(e.touches && e.touches.length > 0){

return {

x:e.touches[0].clientX,

y:e.touches[0].clientY

};

}

return {

x:e.clientX,

y:e.clientY

};

};


// =========================
// START INTERACTION
// =========================

window.startInteraction = function(e){

const pos =
window.getPointerPosition(e);


// RESIZE HANDLE

const resizeId =
e.target.dataset.resize;

if(resizeId){

window.resizeObject =
resizeId;

return;

}


// DRAG OBJECT

const id =
e.target.dataset.id;

if(id){

window.dragObject =
id;

return;

}


// PAN CANVAS

window.draggingCanvas =
true;

window.startX =
pos.x - window.panX;

window.startY =
pos.y - window.panY;

};


// =========================
// MOVE INTERACTION
// =========================

window.moveInteraction = function(e){

const pos =
window.getPointerPosition(e);


// =========================
// RESIZE
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
(pos.x - window.panX)
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
(pos.y - window.panY)
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
// DRAG NODE
// =========================

if(window.dragObject){

const obj =
window.objects.find(
o => o.id === window.dragObject
);

if(obj){

obj.x =
(
pos.x - window.panX
)
/
window.scale;

obj.y =
(
pos.y - window.panY
)
/
window.scale;

window.renderScene();

}

return;

}


// =========================
// PAN VIEW
// =========================

if(!window.draggingCanvas)
return;

window.panX =
pos.x - window.startX;

window.panY =
pos.y - window.startY;

window.updateTransform();

};


// =========================
// END INTERACTION
// =========================

window.endInteraction = function(){

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

};


// =========================
// DESKTOP EVENTS
// =========================

window.svg.addEventListener(
"mousedown",
window.startInteraction
);

window.addEventListener(
"mousemove",
window.moveInteraction
);

window.addEventListener(
"mouseup",
window.endInteraction
);


// =========================
// MOBILE EVENTS
// =========================

window.svg.addEventListener(
"touchstart",
function(e){

e.preventDefault();

window.startInteraction(e);

},
{ passive:false }
);


window.addEventListener(
"touchmove",
function(e){

e.preventDefault();

window.moveInteraction(e);

},
{ passive:false }
);


window.addEventListener(
"touchend",
function(e){

window.endInteraction();

},
{ passive:false }
);


// =========================
// ZOOM DESKTOP
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


// LOAD EDITOR

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
