const numberButton = document.querySelectorAll('#number');
const operatorButton = document.querySelectorAll('#operator');
const equalButton = document.querySelector('#equal-button')
const clearButton = document.querySelector('#clear-button');
const decimalButton = document.querySelector('#decimal');
const percentageButton = document.querySelector('#percentage');
const output = document.querySelector('textarea');

let expression;
let currentValue = '';
let num1 = '';
let num2 = '';
let operator = '';

numberButton.forEach((number) => {
    number.addEventListener('mousedown', () => {

        currentValue += number.value;
        updateCurrentValue();
        updateOutput();
        
    });
});

operatorButton.forEach((operators) => {
    operators.addEventListener('mousedown', () => {

        if ((num1 && num2) && operator) operate();

        isOperatorClick = true
        operator = operators.value
        updateOutput();

    });

    operators.addEventListener('mouseup', () => {
        isDecimalButtonClick = false;
        currentValue = '';
    });

});




let result;
let isOperatorClick;
let isDecimalButtonClick;
let isEqualButtonClick;

decimalButton.addEventListener('mousedown', addDecimal);
clearButton.addEventListener('mousedown', reset);
equalButton.addEventListener('mouseup', () => isEqualButtonClick = false); 
equalButton.addEventListener('mousedown', () => {

    isEqualButtonClick = true;
    operate();
    updateOutput();
    
});




function updateOutput() {

    if (!isEqualButtonClick) expression = num1 + operator + num2;
    
    output.textContent = expression || result;    
    output.setSelectionRange(output.value.length, output.value.length);
    output.focus();

}


function operate() {

    num1 = Number(num1);
    num2 = Number(num2);
  
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

    if (result === Infinity) {
        result = 'Math Error'
        expression = '';
        return;
    }

    result = round(result);
    num1 = result;
    num2 = '';   
    operator = '';
    expression = '';
    currentValue = '';
    
    isOperatorClick = false;

}


function addDecimal() {
    
    if (!isDecimalButtonClick) {
        
        checkCurrentValue()
        updateCurrentValue();
        updateOutput();

    }

    isDecimalButtonClick = true;

}


function round(value) {
    var multiplier = Math.pow(10, 2);
    return Math.round(value * multiplier) / multiplier;
}


function updateCurrentValue() {

    if (!isOperatorClick) {
        num1 = currentValue
        return;
    } 
    
    num2 = currentValue;
   
}


function checkCurrentValue() {

    if (!currentValue) {
        currentValue += '0.';
        return;
    }    
        
    currentValue += '.';

}


function reset() {

    currentValue = '';
    num1 = '';
    num2 = '';
    operator = '';
    result = '';

    isOperatorClick = false;
    isDecimalButtonClick = false;

    updateOutput();

}