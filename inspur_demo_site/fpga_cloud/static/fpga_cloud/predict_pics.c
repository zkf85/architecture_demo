#include <stdio.h>

int main(int argc, char **argv){
    if(argc<2){
        printf("Please input <function_name> <image_path>\n");
        return 0;
    }

    FILE* f;
    f = fopen(argv[1], "rb+");
    if(f == NULL){
        printf("Open image failed!\n");
        return 0;
    }

    printf("%s: %2.5f, %s: %2.5f, %s: %2.5f", "plane", 0.7, "cat", 0.2, "bird", 0.1);
}
