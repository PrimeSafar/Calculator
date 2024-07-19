document.addEventListener("DOMContentLoaded", function() {
    let operator = '';
    let display = '0'; // Initialize display with '0'
    let firstNumber = '';
    let screen = ''; // Correct variable name to 'screen'

    const Display = document.querySelector('.display');
    const Clear = document.querySelector('.clear');
    const Equals = document.querySelector('.equal');
    const Operator = document.querySelectorAll('.operator');
    const Number = document.querySelectorAll('.button');

    Number.forEach((button) => button.addEventListener('click', function(e) {
        numberEvent(e.target.textContent);
        Display.textContent = display;
    }));

    Operator.forEach((op) => op.addEventListener('click', function(e) {
        operatorHandler(e.target.textContent);
        Display.textContent = firstNumber + operator; // Display firstNumber and operator
        display = '0'; // Clear display after operator is clicked
    }));

    Clear.addEventListener('click', function() {
        Display.textContent = '0';
        display = '0'; // Reset display to '0' on clear
        screen = ''; // Reset screen on clear
        operator = ''; // Reset operator on clear
        firstNumber = ''; // Reset firstNumber on clear
    });

    Equals.addEventListener('click', function() {
        calculate();
        Display.textContent = screen;
        display = screen; // Update display with result
        screen = ''; // Clear screen after calculation
    });

    function numberEvent(num) {
        if (display === '0') {
            display = num; // Replace initial '0' with the first number
        } else if (display.length < 7) { // Limit display length to 7 characters
            display += num;
        }
    }

    function operatorHandler(op) {
        if (firstNumber === '') {
            firstNumber = parseFloat(display);
        } else {
            calculate();
            firstNumber = parseFloat(screen); // Update firstNumber with result
        }
        operator = op;
        display = '0'; // Reset display after operator is clicked
    }

    function calculate() {
        let secondNumber = parseFloat(display);
        switch (operator) {
            case '+':
                screen = firstNumber + secondNumber;
                break;
            case '-':
                screen = firstNumber - secondNumber;
                break;
            case '*':
                screen = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber !== 0) {
                    screen = firstNumber / secondNumber;
                } else {
                    screen = 'Infinity'; // Handle division by zero
                }
                break;
            case '%':
                screen = firstNumber % secondNumber;
                break;
        }
           screen = formatResult(screen); // Format the result to 5 significant digits
        firstNumber = screen; // Store result for potential chaining of operations
    }

    function formatResult(num) {
        return parseFloat(num).toPrecision(5).replace(/\.?0+$/, ''); // Format to 5 significant digits and remove trailing zeros
    }
});
