// =====================================================
// state.js
// BioChamp Global State
// =====================================================


// =========================
// CORE GLOBALS
// =========================

window.objects = [];

window.connections = [];

window.selectedObject = null;


// =========================
// SVG REFERENCES
// =========================

window.svg =
document.getElementById(
"viewer"
);

window.canvas =
document.getElementById(
"canvas"
);


// =========================
// VIEW STATE
// =========================

window.scale = 1;

window.panX = 0;

window.panY = 0;


// =========================
// INTERACTION STATE
// =========================

window.dragObject = null;

window.resizeObject = null;

window.draggingCanvas = false;

window.startX = 0;

window.startY = 0;


// =========================
// ADMIN STATE
// =========================

window.adminMode = false;


// =========================
// PROJECT METADATA
// =========================

window.project = {

name: "BioChamp Project",

created:
new Date().toISOString(),

modified:
new Date().toISOString()

};


// =========================
// UPDATE PROJECT TIME
// =========================

window.touchProject = function(){

window.project.modified =
new Date().toISOString();

};


// =========================
// RESET PROJECT
// =========================

window.resetProject = function(){

window.objects = [];

window.connections = [];

window.selectedObject = null;

window.scale = 1;

window.panX = 0;

window.panY = 0;

if(window.renderScene){

window.renderScene();

}

};


// =========================
// DEBUG
// =========================

console.log(
"BioChamp State Initialized"
);
