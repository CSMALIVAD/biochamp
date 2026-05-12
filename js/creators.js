import {
createReaction
}
from "./graph.js";

import {
render
}
from "./renderer.js";


// ========================
// CREATE LINEAR PATHWAY
// ========================

export function createLinear(){

const mol1 =
document.getElementById("mol1").value;

const enzyme =
document.getElementById("enzyme").value;

const mol2 =
document.getElementById("mol2").value;

const coIn =
document.getElementById("coIn").value;

const coOut =
document.getElementById("coOut").value;


// validation

if(!mol1 || !mol2){

alert(
"Please enter metabolites"
);

return;

}


// create graph reaction

createReaction(

mol1,
mol2,
enzyme,
coIn,
coOut

);


// rerender

render();

}
