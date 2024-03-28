const numberButton = document.querySelectorAll('#number');
const operatorButton = document.querySelectorAll('#operator');
const equalButton = document.querySelector('#equal-button')
const clearButton = document.querySelector('#clear-button');
const output = document.querySelector('textarea');

let expression;
let currentValue = '';
let num1 = '';
let num2 = '';
let operator = '';


numberButton.forEach((number) => {
    number.addEventListener('mousedown', () => {

        currentValue += number.value;

        if (!isOperatorClick) {
            num1 = currentValue
        } else num2 = currentValue;

        updateOutput();

    });
});



let isOperatorClick;
operatorButton.forEach((operators) => {
    operators.addEventListener('mousedown', () => {

        if ((num1 && num2) && operator) {
            operate();
            num1 = result;
            num2 = '';    
        }

        isOperatorClick = true
        operator = operators.value
        currentValue = '';
        updateOutput();

    });
});



let isEqualButtonClick;
equalButton.addEventListener('mousedown', () => {

    isEqualButtonClick = true;
    expression = '';
    operate();
    updateOutput();
    
});

equalButton.addEventListener('mouseup', () => isEqualButtonClick = false); 

clearButton.addEventListener('mousedown', () => reset());



function updateOutput() {

    if (!isEqualButtonClick) {
        expression = num1 + operator + num2;
    } 
   
    output.textContent = expression || result;    
    output.setSelectionRange(output.value.length, output.value.length);
    output.focus();

}

let result;
function operate() {

    num1 = parseInt(num1);
    num2 = parseInt(num2);

    switch (operator) {

        case '+':
        result = num1 + num2;
        break;
    
        case '-':
        result = num1 - num2;
        break;

        case '/':
        result = num1 / num2;
        break;

        case '×':
        result = num1 * num2;
        break;
       
    }

}


function reset() {

    currentValue = '';
    num1 = '';
    num2 = '';
    operator = '';
    result = '';

    isOperatorClick = false;

    updateOutput();

}