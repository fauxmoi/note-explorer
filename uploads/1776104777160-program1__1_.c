#include <stdio.h>
#include <string.h>

int main() {
    int n,i,j;

    printf("Enter the no. of strings: ");
    scanf("%d", &n);
    
    char str[n][100], temp[100];

    printf("Enter Strings:\n");
    for (i = 0; i < n; i++) {
        scanf("%s", str[i]);
    }

    // Bubble sort
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (strcmp(str[j], str[j + 1]) > 0) {
                strcpy(temp, str[j]);
                strcpy(str[j], str[j + 1]);
                strcpy(str[j + 1], temp);
            }
        }
    }

    printf("Sorted Strings:\n");
    for (i = 0; i < n; i++) {
        puts(str[i]);
    }

    return 0;
}
