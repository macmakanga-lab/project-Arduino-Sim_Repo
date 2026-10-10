const pins = new Array(16).fill(0);
function pinMode(p, mode) {}
function digitalWrite(p, v) {
  pins[p] = v ? 1 : 0;
}
const OUTPUT = 1,
  HIGH = 1,
  LOW = 0;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Serial = {
    begin(baud){},
    print(text) {
     document.getElementById("serial").textContent += text;
  },
};



const ctx = document.getElementById("matrix").getContext("2d"); //2d pen
function draw() {
  ctx.clearRect(0, 0, 320, 320);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const lit = pins[c] === 1 && pins[8 + r] === 0;
      ctx.fillStyle = lit ? "red" : "#333";
      ctx.beginPath();
      ctx.arc(c * 40 + 20, r * 40 + 20, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  requestAnimationFrame(draw);
}draw();
