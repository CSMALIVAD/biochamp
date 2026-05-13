// =====================================================
// renderer.js
// BioChamp Rendering Engine
// =====================================================


// =========================
// MAIN RENDER FUNCTION
// =========================

window.renderScene = function(){

if(!window.canvas) return;

window.canvas.innerHTML = "";


// =========================
// DRAW CONNECTIONS FIRST
// =========================

if(window.drawConnections){

window.drawConnections();

}


// =========================
// DRAW OBJECTS
// =========================

if(!window.objects) return;


window.objects.forEach(obj=>{


// =========================
// SHAPE ROUNDING
// =========================

let rx = 20;

if(obj.shape === "circle"){

rx = 1000;

}

if(obj.shape === "pill"){

rx = 60;

}


// =========================
// SELECTED STYLE
// =========================

let selectedClass = "";

if(

window.selectedObject &&
window.selectedObject.id === obj.id

){

selectedClass = "selected";

}


// =========================
// METABOLITES / COFACTORS
// =========================

if(

obj.type === "metabolite" ||
obj.type === "cofactor"

){

window.canvas.innerHTML += `

<rect

x="${obj.x - obj.width/2}"

y="${obj.y - obj.height/2}"

width="${obj.width}"

height="${obj.height}"

rx="${rx}"

fill="${obj.fill}"

stroke="white"

stroke-width="2"

class="node ${selectedClass}"

data-id="${obj.id}"

/>

<text

x="${obj.x}"

y="${obj.y + 8}"

fill="white"

font-size="20"

text-anchor="middle"

>

${obj.label}

</text>

`;

}


// =========================
// ENZYMES
// =========================

if(obj.type === "enzyme"){

window.canvas.innerHTML += `

<text

x="${obj.x}"

y="${obj.y}"

fill="${obj.fill}"

font-size="28"

font-weight="bold"

text-anchor="middle"

class="node"

data-id="${obj.id}"

>

${obj.label}

</text>

`;

}


// =========================
// RESIZE HANDLE
// =========================

if(

window.selectedObject &&
window.selectedObject.id === obj.id

){

window.canvas.innerHTML += `

<circle

cx="${obj.x + obj.width/2}"

cy="${obj.y + obj.height/2}"

r="10"

fill="#00ff88"

data-resize="${obj.id}"

/>

`;

}

});


// =========================
// UPDATE VIEW TRANSFORM
// =========================

if(window.updateTransform){

window.updateTransform();

}

};


// =====================================================
// INITIAL RENDER
// =====================================================

setTimeout(()=>{

if(window.renderScene){

window.renderScene();

}

},100);
