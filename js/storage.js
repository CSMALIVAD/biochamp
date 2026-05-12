import { state }
from "./state.js";

import {
render
}
from "./renderer.js";

export function saveData(){

localStorage.setItem(

"biochampData",

JSON.stringify(
state.pathways
)

);

alert("Saved");

}

export function loadData(){

const data=
localStorage.getItem(
"biochampData"
);

if(data){

state.pathways=
JSON.parse(data);

render();

alert("Loaded");

}

}
