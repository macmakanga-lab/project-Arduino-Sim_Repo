const uint8_t PIN_BASE = 2;
size_t dot = 0;
bool xbit[4], ybit[4];
bool x[8], y[8];

const uint8_t pauseBtn = 20,stepBtn = 21;
bool paused = 0;
bool stepOnce = 0; 

void setup() {
  for (uint8_t a = 0; a < 16; a++) pinMode(PIN_BASE + a, OUTPUT);
}
pinMode(pauseBtn, INPUT);
pinMode(stepBtn, INPUT);
void binary() {
  uint8_t col = dot % 8 + 1;
  uint8_t row = dot / 8 + 1;
  for (uint8_t a = 0; a < 4; a++) {
    xbit[a] = (col >> a) & 1;
    ybit[a] = (row >> a) & 1;
  }
}

void decode(const bool *bits, bool *out) {
  bool b3 = bits[3], b2 = bits[2], b1 = bits[1], b0 = bits[0];
  out[0] = !b3 && !b2 && !b1 &&  b0;
  out[1] = !b3 && !b2 &&  b1 && !b0;
  out[2] = !b3 && !b2 &&  b1 &&  b0;
  out[3] = !b3 &&  b2 && !b1 && !b0;
  out[4] = !b3 &&  b2 && !b1 &&  b0;
  out[5] = !b3 &&  b2 &&  b1 && !b0;
  out[6] = !b3 &&  b2 &&  b1 &&  b0;
  out[7] =  b3 && !b2 && !b1 && !b0;
}

void loop() {
  paused = digitalRead(pauseBtn);
  stepOnce = digitalRead(stepBtn);

  if(paused && stepOnce) ;

  binary();
  decode(xbit, x);
  decode(ybit, y);
  for (uint8_t a = 0; a < 8; a++) {
    digitalWrite(PIN_BASE + a,     x[a]);
    digitalWrite(PIN_BASE + 8 + a, !y[a]);
  }
  dot = (dot + 1) % 64;
  delay(300);

}