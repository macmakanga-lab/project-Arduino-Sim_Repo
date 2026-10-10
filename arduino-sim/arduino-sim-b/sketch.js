console.log('sketch.js loaded');

let dot = 63;
let paused = false;
// let stepOnce = false;
let stepsPending = 0;

const xbit = [1,0,0,0];
const ybit = [1,0,1,0];
let x = [], y = [];

function setup(){
    for(let a = 0; a < 16; a++) pinMode(a, OUTPUT);
    Serial.begin(9600);
}
function binary(){
    const col = dot % 8 + 1;
    const row = Math.floor(dot / 8 ) + 1;
    for (let a = 0; a < 4; a++){
        xbit[a] = (col >> a) & 1;
        ybit[a] = (row >> a) & 1;
    } 
}
function decode(bits){
    const b3 = bits[3], b2 = bits[2], b1 = bits[1], b0 = bits[0];
    return [
      !b3 && !b2 && !b1 && b0, //value 1
      !b3 && !b2 && b1 && !b0, //value 2
      !b3 && !b2 && b1 && b0, //value 3
      !b3 && b2 && !b1 && !b0, //value 4
      !b3 && b2 && !b1 && b0, //value 5
      !b3 && b2 && b1 && !b0, //value 6
      !b3 && b2 && b1 && b0, //value 7
       b3 && !b2 && !b1 && !b0, //value 4
    ];
}
function decoder(){
    x = decode(xbit);
    y = decode(ybit).map(v => !v)
}

async function loop(){
    if(paused && stepsPending === 0){ await delay(5); return;}
    if(stepsPending > 0) stepsPending--;
    // stepOnce = false;
    binary();
    decoder();
    for(let a = 0; a < 8; a++){
        digitalWrite(a, x[a]);
        digitalWrite(8 + a, y[a]);
    }
    dot = (dot + 1) % 64;
    await delay(300); 
}
(async () => {
    setup();
    while (true) await loop();
})();

pauseBtn= document.getElementById('pause');
pauseBtn.onclick = () =>{
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
}
stepBtn = document.getElementById('step');
stepBtn.onclick = () =>{
    if(paused) stepsPending++;
}