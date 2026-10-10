import {//bringing in the avr8js
    CPU, avrInstruction, AVRTimer, timer0Config, AVRIOPort, portBConfig, portCConfig, portDConfig,
    PinState
} from './avr8js.js';

// load the program and build the chip
const text = await (await fetch('matrix_uno.ino.hex')).text();
const {bytes} = parseHex(text);

const cpu = new CPU (new Uint16Array(bytes.buffer));
const timer0 = new AVRTimer(cpu, timer0Config);

//attaching the port pins 
const portB = new AVRIOPort(cpu, portBConfig);
const portC = new AVRIOPort(cpu, portCConfig);
const portD = new AVRIOPort(cpu, portDConfig);

// the pin map translates the ports to 16 matrix which are spread over the three port Remember the Notepad lines 0 to 16
const pinMap = [
  { port: portD, firstBit: 2, lastBit: 7, notepad: 0 },
  { port: portB, firstBit: 0, lastBit: 5, notepad: 6 },
  { port: portC, firstBit: 0, lastBit: 3, notepad: 12 },
];

for(const m of pinMap){
    m.port.addListener(value => {
        for(let bit = m.firstBit; bit <= m.lastBit; bit++){
            pins[m.notepad + bit - m.firstBit] = (value >> bit) & 1;
        }
    });
}

// run the chip
const CYCLES_PER_FRAME = 160000000 / 60;

function run(){
    const target = cpu.cycles + CYCLES_PER_FRAME;
    while (cpu.cycles < target){
        avrInstruction(cpu);
        cpu.tick();
    }
    requestAnimationFrame(run);
}
run();


