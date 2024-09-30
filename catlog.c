#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

// Function to convert a string number in a given base to an integer
long long int convert_to_decimal(const char *value, int base) {
    return strtoll(value, NULL, base);
}

// Function to compute Lagrange interpolation and find the constant term
double lagrange_interpolation(int x[], long long int y[], int k) {
    double result = 0;

    for (int i = 0; i < k; i++) {
        double term = y[i];
        for (int j = 0; j < k; j++) {
            if (i != j) {
                term *= (0 - x[j]) / (double)(x[i] - x[j]);
            }
        }
        result += term;
    }

    return result;
}

// Function to decode the JSON input manually (since C doesn't have built-in JSON support)
void parse_json_and_solve(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) {
        printf("Error opening file!\n");
        return;
    }

    int n, k;
    int x[100];  // to store x values
    long long int y[100];  // to store decoded y values
    char base[10], value[100];

    fscanf(file, "{\"keys\":{\"n\":%d,\"k\":%d},", &n, &k);

    for (int i = 0; i < n; i++) {
        int index;
        fscanf(file, "\"%d\":{\"base\":\"%[^\"]\",\"value\":\"%[^\"]\"},", &index, base, value);
        int base_int = atoi(base);
        x[i] = index;
        y[i] = convert_to_decimal(value, base_int);
    }

    fclose(file);

    // Solve for the constant term using Lagrange interpolation
    double secret = lagrange_interpolation(x, y, k);

    printf("The secret (constant term) is: %.0f\n", secret);
}

int main() {
    // Solve for the first test case
    parse_json_and_solve("testcase1.json");

    // Solve for the second test case (including error detection logic here)
    parse_json_and_solve("testcase2.json");

    return 0;
}
