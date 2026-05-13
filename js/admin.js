// =====================================================
// admin.js
// BioChamp Admin Engine
// =====================================================


// =========================
// ADMIN MODE
// =========================

window.adminMode = false;


// =========================
// ADMIN LOGIN
// =========================

document.getElementById(
"adminBtn"
).onclick = function(){

const pass =
prompt(
"Enter Admin Password"
);

if(pass === "biochamp"){

window.adminMode = true;

document.getElementById(
"adminBar"
).style.display = "block";

alert(
"Admin Mode Enabled"
);

}else{

alert(
"Wrong Password"
);

}

};


// =========================
// APPLY CHANGES
// =========================

document.getElementById(
"applyBtn"
).onclick = function(){

if(!window.selectedObject)
return;


// LABEL

window.selectedObject.label =

document.getElementById(
"editLabel"
).value;


// COLOR

window.selectedObject.fill =

document.getElementById(
"editColor"
).value;


// SHAPE

window.selectedObject.shape =

document.getElementById(
"editShape"
).value;


window.renderScene();

};


// =========================
// DELETE OBJECT
// =========================

document.getElementById(
"deleteBtn"
).onclick = function(){

if(!window.selectedObject)
return;


// REMOVE CONNECTIONS

if(window.removeObjectConnections){

window.removeObjectConnections(
window.selectedObject.id
);

}


// REMOVE OBJECT

window.objects =
window.objects.filter(
o => o.id !== window.selectedObject.id
);


window.selectedObject = null;

window.renderScene();

};


// =========================
// DUPLICATE OBJECT
// =========================

document.getElementById(
"duplicateBtn"
).onclick = function(){

if(!window.selectedObject)
return;


const copy = {

...window.selectedObject,

id:
"copy_" +
Date.now(),

x:
window.selectedObject.x + 80,

y:
window.selectedObject.y + 80

};


window.objects.push(copy);

window.renderScene();

};


// =========================
// KEYBOARD SHORTCUTS
// =========================

window.addEventListener(
"keydown",
function(e){

// DELETE

if(e.key === "Delete"){

if(!window.selectedObject)
return;


// REMOVE CONNECTIONS

if(window.removeObjectConnections){

window.removeObjectConnections(
window.selectedObject.id
);

}


// REMOVE OBJECT

window.objects =
window.objects.filter(
o => o.id !== window.selectedObject.id
);


window.selectedObject = null;

window.renderScene();

}


// DUPLICATE

if(
e.ctrlKey &&
e.key === "d"
){

e.preventDefault();

if(!window.selectedObject)
return;


const copy = {

...window.selectedObject,

id:
"copy_" +
Date.now(),

x:
window.selectedObject.x + 80,

y:
window.selectedObject.y + 80

};


window.objects.push(copy);

window.renderScene();

}

}
);
