// =====================================================
// graph.js
// BioChamp Advanced Connection Engine
// =====================================================


// =========================
// GLOBAL CONNECTION STATE
// =========================

window.connections =
window.connections || [];

window.connectMode = false;

window.connectionStartNode = null;

window.selectedConnection = null;


// =========================
// TOGGLE CONNECT MODE
// =========================

window.toggleConnectMode = function(){

window.connectMode =
!window.connectMode;

window.connectionStartNode = null;

if(window.connectMode){

alert(
"Connection Mode Enabled"
);

}else{

alert(
"Connection Mode Disabled"
);

}

};


// =========================
// CREATE CONNECTION
// =========================

window.createConnection = function(

fromId,
toId,
options={}

){

// PREVENT DUPLICATES

const exists =
window.connections.find(

c =>

c.from === fromId &&
c.to === toId

);

if(exists) return;


const connection = {

id:
"conn_" +
Date.now() +
Math.random(),

from: fromId,

to: toId,

label:
options.label || "",

reversible:
options.reversible || false,

color:
options.color || "white",

width:
options.width || 4

};


window.connections.push(
connection
);


if(window.renderScene){

window.renderScene();

}

};


// =========================
// REMOVE CONNECTION
// =========================

window.removeConnection = function(
connectionId
){

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

window.removeObjectConnections = function(
objectId
){

window.connections =

window.connections.filter(

conn =>

conn.from !== objectId &&
conn.to !== objectId

);

};


// =========================
// DRAW CONNECTIONS
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


if(!fromObj || !toObj)
return;


// =========================
// COORDINATES
// =========================

const startX =

fromObj.x +
fromObj.width/2;

const startY =
fromObj.y;

const endX =

toObj.x -
toObj.width/2;

const endY =
toObj.y;


const curveX =

(startX + endX)/2;

const curveY =

(startY + endY)/2 - 120;


// =========================
// SELECTED STYLE
// =========================

let opacity = 1;

if(

window.selectedConnection &&
window.selectedConnection.id === conn.id

){

opacity = 0.6;

}


// =========================
// MAIN PATH
// =========================

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

opacity="${opacity}"

marker-end="url(#arrowhead)"

class="connection-path"

data-connection="${conn.id}"

/>

`;


// =========================
// REVERSIBLE REACTION
// =========================

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

opacity="0.5"

marker-end="url(#arrowhead)"

/>

`;

}


// =========================
// CONNECTION LABEL
// =========================

if(
conn.label &&
conn.label.trim() !== ""
){

window.canvas.innerHTML += `

<text

x="${curveX}"

y="${curveY - 20}"

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
// CONNECTION CLICK
// =========================

window.svg.addEventListener(
"click",
function(e){

const connId =
e.target.dataset.connection;

if(!connId) return;

window.selectedConnection =

window.connections.find(
c => c.id === connId
);

}
);


// =========================
// MANUAL NODE CONNECTION
// =========================

window.svg.addEventListener(
"dblclick",
function(e){

if(!window.connectMode)
return;

const id =
e.target.dataset.id;

if(!id)
return;


// FIRST NODE

if(!window.connectionStartNode){

window.connectionStartNode =
id;

return;

}


// SECOND NODE

if(
window.connectionStartNode &&
window.connectionStartNode !== id
){

window.createConnection(

window.connectionStartNode,
id

);

window.connectionStartNode =
null;

}

}
);


// =========================
// AUTO CONNECT LINEAR
// =========================

window.autoConnectLinear = function(
nodeList
){

if(nodeList.length < 2)
return;

for(
let i=0;
i<nodeList.length-1;
i++
){

window.createConnection(

nodeList[i].id,
nodeList[i+1].id

);

}

};


// =========================
// AUTO CONNECT CIRCULAR
// =========================

window.autoConnectCircular = function(
nodeList
){

if(nodeList.length < 2)
return;

for(
let i=0;
i<nodeList.length;
i++
){

window.createConnection(

nodeList[i].id,

nodeList[
(i+1)%nodeList.length
].id

);

}

};


// =========================
// SAVE CONNECTIONS
// =========================

window.saveConnections = function(){

localStorage.setItem(

"biochamp_connections",

JSON.stringify(
window.connections
)

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
// DELETE SELECTED CONNECTION
// =========================

window.addEventListener(
"keydown",
function(e){

if(
e.key === "Backspace"
){

if(
window.selectedConnection
){

window.removeConnection(

window.selectedConnection.id

);

window.selectedConnection =
null;

}

}

}
);
