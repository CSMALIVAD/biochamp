import { state }
from "./state.js";

export function adminLogin(){

const pass =
prompt("Enter Password");

if(pass==="biochamp"){

state.adminMode=true;

alert("Admin Mode Enabled");

document
.getElementById("adminBar")
.style.display="block";

}
else{

alert("Wrong Password");

}

}

export function applyChanges(){

alert(
"Editor system coming next step"
);

}
