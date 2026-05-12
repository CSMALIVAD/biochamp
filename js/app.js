const button =
document.getElementById(
"linearBtn"
);

const canvas =
document.getElementById(
"canvas"
);

button.addEventListener(
"click",
createLinear
);

function createLinear(){

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

canvas.innerHTML = `

<line
x1="300"
y1="300"
x2="700"
y2="300"
class="arrow"
/>

<rect
x="180"
y="250"
width="180"
height="100"
rx="15"
class="node"
/>

<text
x="270"
y="310"
class="label"
>
${mol1}
</text>

<rect
x="640"
y="250"
width="180"
height="100"
rx="15"
fill="#ff9800"
stroke="white"
stroke-width="2"
/>

<text
x="730"
y="310"
class="label"
>
${mol2}
</text>

<text
x="500"
y="220"
fill="#00ff88"
font-size="24"
text-anchor="middle"
>
${enzyme}
</text>

`;

}
