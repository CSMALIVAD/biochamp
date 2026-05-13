// =====================================================
// storage.js
// BioChamp Storage Engine
// =====================================================


// =========================
// SAVE PROJECT
// =========================

window.saveProject = function(){

// SAVE OBJECTS

localStorage.setItem(

"biochamp_objects",

JSON.stringify(
window.objects || []
)

);


// SAVE CONNECTIONS

localStorage.setItem(

"biochamp_connections",

JSON.stringify(
window.connections || []
)

);


// SAVE CAMERA

localStorage.setItem(

"biochamp_camera",

JSON.stringify({

scale:
window.scale || 1,

panX:
window.panX || 0,

panY:
window.panY || 0

})

);


alert(
"Project Saved"
);

};


// =========================
// LOAD PROJECT
// =========================

window.loadProject = function(){

// OBJECTS

const objectData =

localStorage.getItem(
"biochamp_objects"
);


// CONNECTIONS

const connectionData =

localStorage.getItem(
"biochamp_connections"
);


// CAMERA

const cameraData =

localStorage.getItem(
"biochamp_camera"
);


// LOAD OBJECTS

if(objectData){

window.objects =

JSON.parse(objectData);

}


// LOAD CONNECTIONS

if(connectionData){

window.connections =

JSON.parse(connectionData);

}


// LOAD CAMERA

if(cameraData){

const cam =

JSON.parse(cameraData);

window.scale =
cam.scale || 1;

window.panX =
cam.panX || 0;

window.panY =
cam.panY || 0;

}


// RENDER

if(window.renderScene){

window.renderScene();

}


alert(
"Project Loaded"
);

};


// =========================
// SAVE BUTTON
// =========================

document.getElementById(
"saveBtn"
).onclick = function(){

window.saveProject();

};


// =========================
// LOAD BUTTON
// =========================

document.getElementById(
"loadBtn"
).onclick = function(){

window.loadProject();

};
