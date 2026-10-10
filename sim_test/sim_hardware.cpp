#include "Arduino.h"
void board_pinsetup_output(int pin) { pinMode(pin, OUTPUT); }
void board_write(int pin, bool high) { digitalWrite(pin, high); }
void board_delay(int ms) { delay(ms); }