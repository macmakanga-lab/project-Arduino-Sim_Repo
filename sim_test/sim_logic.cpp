#include "sim_interface.h"
const int ledpin = 8;

void sim_setup(){
    board_pinsetup_output(ledpin);
}

void sim_loop(){
    board_write(ledpin, true);
    board_delay(1000);
    board_write(ledpin, false);
    board_delay(100);
}