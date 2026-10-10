function parseHex(text){
    const bytes = new Uint8Array(32768);
    let size = 0;
     for (const line of text.split(/\r?\n/)) {
        if (line[0] !== ':') continue;
        const count   = parseInt(line.slice(1, 3), 16);
        const address = parseInt(line.slice(3, 7), 16);
        const type    = parseInt(line.slice(7, 9), 16);
        if (type !== 0) continue;
        for (let i = 0; i < count; i++){
            bytes[address + i] = parseInt(line.slice(9 + i * 2, 11 + i * 2), 16);
        }
        size = Math.max(size, address + count);
     }
     return {bytes, size};
}

// fetch('matrix_uno.ino.hex')
// .then(r => r.text())
// .then(text => {
//     const {bytes, size} = parseHex(text);
//     const first = [0, 1, 2, 3].map(i => bytes[i].toString(16).padStart(2, '0'));
//     Serial.print('size: ' + size + ' | first bytes: ' + first.join(' '));
// });