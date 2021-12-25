#include <stdio.h>

int main()
{
    float temp, militemp;

    FILE *temp_file = fopen("/sys/class/thermal/thermal_zone0/temp", "r");
    fscanf(temp_file, "%f", &militemp);
    fclose(temp_file);

    temp = militemp/1000;

    printf("%.2f°C\n", temp);
}