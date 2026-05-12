const canvas =
document.getElementById(
"canvas"
);

const svg =
document.getElementById(
"viewer"
);

const linearBtn =
document.getElementById(
"linearBtn"
);

const saveBtn =
document.getElementById(
"saveBtn"
);

const loadBtn =
document.getElementById(
"loadBtn"
);

const adminBtn =
document.getElementById(
"adminBtn"
);

const applyBtn =
document.getElementById(
"applyBtn"
);


// ======================
// GLOBAL STATE
// ======================

let pathways=[];

let selectedObject=null;

let adminMode=false;

let scale=1;

let panX=0;

let panY=0;

let isDragging=false;

let startX=0;

let startY=0;


// ======================
// CREATE LINEAR PATHWAY
// ======================

linearBtn.onclick=function(){

const mol1 =
document.getElementById(
"mol1"
).value;

const enzyme =
document.getElementById(
"enzyme"
).value;

const mol2 =
document.getElementById(
"mol2"
).value;

const coIn =
document.getElementById(
"coIn"
).value;

const coOut =
document.getElementById(
"coOut"
).value;

if(!mol1 || !mol2){

alert(
"Enter metabolites"
);

return;

}

pathways.push({

id:
Date.now(),

mol1,
mol2,
enzyme,
coIn,
coOut,

x1:300,

y1:
250 +
pathways.length*220,

x2:900,

y2:
250 +
pathways.length*220,

leftColor:"#00d4ff",

rightColor:"#ff9800"

});

render();

};


// ======================
// RENDER SYSTEM
// ======================

function render(){

canvas.innerHTML="";

pathways.forEach((p,index)=>{

canvas.innerHTML += `

<!-- MAIN ARROW -->

<line

x1="${p.x1+100}"

y1="${p.y1}"

x2="${p.x2-100}"

y2="${p.y2}"

class="arrow"

/>


<!-- LEFT NODE -->

<rect

x="${p.x1-100}"

y="${p.y1-50}"

width="200"

height="100"

rx="20"

fill="${p.leftColor}"

class="node"

onclick="selectObject('left',${index})"

/>

<text

x="${p.x1}"

y="${p.y1+10}"

class="label"

>

${p.mol1}

</text>


<!-- RIGHT NODE -->

<rect

x="${p.x2-100}"

y="${p.y2-50}"

width="200"

height="100"

rx="20"

fill="${p.rightColor}"

class="node"

onclick="selectObject('right',${index})"

/>

<text

x="${p.x2}"

y="${p.y2+10}"

class="label"

>

${p.mol2}

</text>


<!-- ENZYME -->

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1-70}"

class="enzyme"

>

${p.enzyme}

</text>


<!-- COFACTOR INPUT -->

<rect

x="${((p.x1+p.x2)/2)-80}"

y="${p.y1-180}"

width="160"

height="60"

rx="12"

fill="#9c27b0"

stroke="white"

stroke-width="2"

/>

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1-142}"

class="label"

>

${p.coIn}

</text>


<!-- COFACTOR OUTPUT -->

<rect

x="${((p.x1+p.x2)/2)-80}"

y="${p.y1+120}"

width="160"

height="60"

rx="12"

fill="#673ab7"

stroke="white"

stroke-width="2"

/>

<text

x="${(p.x1+p.x2)/2}"

y="${p.y1+158}"

class="label"

>

${p.coOut}

</text>

`;

});

updateTransform();

}


// ======================
// ADMIN LOGIN
// ======================

adminBtn.onclick=function(){

const pass =
prompt(
"Enter Admin Password"
);

if(pass==="biochamp"){

adminMode=true;

document
.getElementById(
"adminBar"
)
.style.display="block";

alert(
"Admin Mode Enabled"
);

}
else{

alert(
"Wrong Password"
);

}

};


// ======================
// OBJECT SELECT
// ======================

window.selectObject=function(
side,
index
){

if(!adminMode) return;

selectedObject={
side,
index
};

const p=
pathways[index];

if(side==="left"){

document
.getElementById(
"editLabel"
)
.value=p.mol1;

document
.getElementById(
"editColor"
)
.value=p.leftColor;

}

if(side==="right"){

document
.getElementById(
"editLabel"
)
.value=p.mol2;

document
.getElementById(
"editColor"
)
.value=p.rightColor;

}

};


// ======================
// APPLY CHANGES
// ======================

applyBtn.onclick=function(){

if(!selectedObject) return;

const p=
pathways[
selectedObject.index
];

const newLabel=
document
.getElementById(
"editLabel"
)
.value;

const newColor=
document
.getElementById(
"editColor"
)
.value;

if(selectedObject.side==="left"){

p.mol1=newLabel;

p.leftColor=newColor;

}

if(selectedObject.side==="right"){

p.mol2=newLabel;

p.rightColor=newColor;

}

render();

};


// ======================
// SAVE
// ======================

saveBtn.onclick=function(){

localStorage.setItem(

"biochampData",

JSON.stringify(pathways)

);

alert("Saved");

};


// ======================
// LOAD
// ======================

loadBtn.onclick=function(){

const data=
localStorage.getItem(
"biochampData"
);

if(data){

pathways=
JSON.parse(data);

render();

alert("Loaded");

}

};


// ======================
// ZOOM
// ======================

svg.addEventListener(
"wheel",
(e)=>{

e.preventDefault();

if(e.deltaY<0){

scale*=1.1;

}
else{

scale*=0.9;

}

updateTransform();

}
);


// ======================
// PAN START
// ======================

svg.addEventListener(
"mousedown",
(e)=>{

isDragging=true;

startX=
e.clientX-panX;

startY=
e.clientY-panY;

}
);


// ======================
// PAN END
// ======================

window.addEventListener(
"mouseup",
()=>{

isDragging=false;

}
);


// ======================
// PAN MOVE
// ======================

window.addEventListener(
"mousemove",
(e)=>{

if(!isDragging) return;

panX=
e.clientX-startX;

panY=
e.clientY-startY;

updateTransform();

}
);


// ======================
// UPDATE TRANSFORM
// ======================

function updateTransform(){

canvas.setAttribute(

"transform",

`
translate(${panX},${panY})
scale(${scale})
`

);

}
