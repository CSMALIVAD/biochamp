// =========================
// graph.js
// BioChamp Connection Engine
// =========================

// GLOBAL CONNECTION STORAGE

window.connections = window.connections || [];


// =========================
// CREATE CONNECTION
// =========================

window.createConnection = function(fromId,toId){

const connection = {

id:
"conn_" + Date.now() + Math.random(),

from: fromId,

to: toId,

label: "",

reversible: false,

color: "white",

width: 4

};

window.connections.push(connection);

if(window.renderScene){
window.renderScene();
}

};


// =========================
// REMOVE CONNECTION
// =========================

window.removeConnection = function(connectionId){

window.connections =
window.connections.filter(
conn => conn.id !== connectionId
);

if(window.renderScene){
window.renderScene();
}

};


// =========================
// REMOVE OBJECT CONNECTIONS
// =========================

window.removeObjectConnections = function(objectId){

window.connections =
window.connections.filter(
conn =>
conn.from !== objectId &&
conn.to !== objectId
);

};


// =========================
// DRAW ALL CONNECTIONS
// =========================

window.drawConnections = function(){

if(!window.connections) return;

if(!window.objects) return;

if(!window.canvas) return;

window.connections.forEach(conn=>{

const fromObj =
window.objects.find(
o => o.id === conn.from
);

const toObj =
window.objects.find(
o => o.id === conn.to
);

if(!fromObj || !toObj) return;

const startX =
fromObj.x + fromObj.width/2;

const startY =
fromObj.y;

const endX =
toObj.x - toObj.width/2;

const endY =
toObj.y;

const curveX =
(startX + endX)/2;

const curveY =
(startY + endY)/2 - 120;


window.canvas.innerHTML += `

<path

d="
M ${startX} ${startY}
Q ${curveX} ${curveY}
${endX} ${endY}
"

stroke="${conn.color}"

stroke-width="${conn.width}"

fill="none"

marker-end="url(#arrowhead)"

class="connection-path"

data-connection="${conn.id}"

/>

`;


// REVERSIBLE ARROW

if(conn.reversible){

window.canvas.innerHTML += `

<path

d="
M ${endX} ${endY}
Q ${curveX} ${curveY}
${startX} ${startY}
"

stroke="${conn.color}"

stroke-width="${conn.width}"

fill="none"

marker-end="url(#arrowhead)"

opacity="0.6"

/>

`;

}


// CONNECTION LABEL

if(conn.label && conn.label.trim() !== ""){

window.canvas.innerHTML += `

<text

x="${curveX}"

y="${curveY - 15}"

fill="white"

font-size="18"

text-anchor="middle"

>
${conn.label}
</text>

`;

}

});

};


// =========================
// SAVE CONNECTIONS
// =========================

window.saveConnections = function(){

localStorage.setItem(
"biochamp_connections",
JSON.stringify(window.connections)
);

};


// =========================
// LOAD CONNECTIONS
// =========================

window.loadConnections = function(){

const data =
localStorage.getItem(
"biochamp_connections"
);

if(data){

window.connections =
JSON.parse(data);

}

};


// =========================
// AUTO CONNECT LINEAR
// =========================

window.autoConnectLinear = function(nodeList){

if(nodeList.length < 2) return;

for(let i=0;i<nodeList.length-1;i++){

window.createConnection(
nodeList[i].id,
nodeList[i+1].id
);

}

};


// =========================
// AUTO CONNECT CIRCULAR
// =========================

window.autoConnectCircular = function(nodeList){

if(nodeList.length < 2) return;

for(let i=0;i<nodeList.length;i++){

window.createConnection(
nodeList[i].id,
nodeList[(i+1)%nodeList.length].id
);

}

};

