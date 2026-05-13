// =====================================================
// app.js
// BioChamp Main Initializer
// =====================================================


// =========================
// LOAD MODULES
// =========================

import "./state.js";

import "./graph.js";

import "./renderer.js";

import "./creators.js";

import "./interactions.js";

import "./admin.js";

import "./storage.js";


// =========================
// START APPLICATION
// =========================

window.addEventListener(
"load",
function(){

console.log(
"BioChamp Initialized"
);


// INITIAL RENDER

if(window.renderScene){

window.renderScene();

}


// AUTO LOAD LAST SESSION

const autoLoad = true;

if(autoLoad){

if(window.loadProject){

window.loadProject();

}

}

}
);
