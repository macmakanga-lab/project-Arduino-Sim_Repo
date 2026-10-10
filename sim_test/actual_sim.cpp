#include "sim_interface.h"
#include <string>
#include <vector>

static std::vector<std::string> notepad;
void board_pinsetup_output(int pin){
    notepad.push_back("pin " + std::to_string(pin) + " is set as OUTPUT");
}

void board_write(int pin, bool high){
    notepad.push_back("pin " + std::to_string(pin) + (high ? " HIGH" : " LOW"));
}
void board_delay(int ms){
    notepad.push_back("delay for " + std::to_string(ms) + " ms");
}

int sim_note_count(){return notepad.size(); }
std::string sim_note(int i){return notepad[i];}