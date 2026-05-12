import "./interactions.js";

import {
createLinear
}
from "./creators.js";

import {
saveData,
loadData
}
from "./storage.js";

import {
adminLogin,
applyChanges
}
from "./admin.js";


// BUTTONS

document
.getElementById("linearBtn")
.addEventListener(
"click",
createLinear
);

document
.getElementById("saveBtn")
.addEventListener(
"click",
saveData
);

document
.getElementById("loadBtn")
.addEventListener(
"click",
loadData
);

document
.getElementById("adminBtn")
.addEventListener(
"click",
adminLogin
);

document
.getElementById("applyBtn")
.addEventListener(
"click",
applyChanges
);
