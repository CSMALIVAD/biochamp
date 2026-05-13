// =====================================================
// interactions.js
// BioChamp Touch + Desktop Engine
// =====================================================


// =========================
// GLOBALS
// =========================

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

window.startX = 0;

window.startY = 0;

window.scale = 1;

window.panX = 0;

window.panY = 0;

window.isTouchDragging = false;


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
// GET POSITION
// =========================

window.getEventPosition = function(e){

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
// START DRAG
// =========================

window.beginInteraction = function(e){

const pos =
window.getEventPosition(e);


// RESIZE HANDLE

const resizeId =
e.target.dataset.resize;

if(resizeId){

window.resizeObject =
resizeId;

window.isTouchDragging = true;

return;

}


// OBJECT DRAG

const id =
e.target.dataset.id;

if(id){

window.dragObject = id;

window.isTouchDragging = true;

return;

}


// PAN

window.draggingCanvas = true;

window.startX =
pos.x - window.panX;

window.startY =
pos.y - window.panY;

window.isTouchDragging = true;

};


// =========================
// MOVE
// =========================

window.moveInteraction = function(e){

if(!window.isTouchDragging)
return;

const pos =
window.getEventPosition(e);


// RESIZE

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


// OBJECT DRAG

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


// PAN

if(window.draggingCanvas){

window.panX =
pos.x - window.startX;

window.panY =
pos.y - window.startY;

window.updateTransform();

}

};


// =========================
// END INTERACTION
// =========================

window.endInteraction = function(){

setTimeout(()=>{

window.isTouchDragging = false;

},50);

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

};


// =========================
// DESKTOP EVENTS
// =========================

window.svg.addEventListener(

"mousedown",

function(e){

window.beginInteraction(e);

}

);


window.addEventListener(

"mousemove",

function(e){

window.moveInteraction(e);

}

);


window.addEventListener(

"mouseup",

function(){

window.endInteraction();

}

);


// =========================
// TOUCH EVENTS
// =========================

window.svg.addEventListener(

"touchstart",

function(e){

e.preventDefault();

window.beginInteraction(e);

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

function(){

window.endInteraction();

},

{ passive:false }

);


// =========================
// DESKTOP ZOOM
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

if(window.isTouchDragging)
return;

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
