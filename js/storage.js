import { state }
from "./state.js";

import {
render
}
from "./renderer.js";

export function saveData(){

localStorage.setItem(

"biochampObjects",

JSON.stringify(
state.objects
)

);

alert("Saved");

}

export function loadData(){

const data=
localStorage.getItem(
"biochampObjects"
);

if(data){

state.objects=
JSON.parse(data);

render();

alert("Loaded");

}

}
