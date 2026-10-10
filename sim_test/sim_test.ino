#include "sim_interface.h"
const uint8_t ledpin = 8;
void setup(){
    board_pinsetup_output(ledpin);
}
void loop(){
    board_write(ledpin, true);
    board_delay(1000);
    board_write(ledpin, false);
    board_delay(1000);
}