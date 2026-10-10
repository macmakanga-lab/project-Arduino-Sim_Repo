#include <iostream>
#include <cstdio>
#include <string>



void sim_setup();
void sim_loop();

int sim_note_count();
std::string sim_note(int i);

int main(){
    sim_setup();
    sim_loop();

    const char* expected[]={
        "pin 8 is set as OUTPUT",
        "pin 8 HIGH",
        "delay for 1000 ms",
        "pin 8 LOW",
        "delay for 1000 ms"
    };

    int n = sim_note_count();
    bool valid = (n==5);
    if (!valid) std::cout << "line mising" << std::endl;
    for(int i = 0; i < n && i < 5; i++){
        if(sim_note(i) != expected[i]){
            std::cout << "line: "<< i <<" doesnot match --<" << sim_note(i) << std::endl;
            valid = false;}
    }
    printf(valid ? "PASS\n" : "FAIL\n");
    return valid ? 0 : 1;
}