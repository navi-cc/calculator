const numberButton = document.querySelectorAll('#number');
const operatorButton = document.querySelectorAll('#operator');
const equalButton = document.querySelector('#equal-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button')
const decimalButton = document.querySelector('#decimal');
const percentageButton = document.querySelector('#percentage');
const negateButton = document.querySelector('#negate-button');
const output = document.querySelector('textarea');

let result;
let isOperatorClick;
let isDecimalButtonClick;
let isEqualButtonClick;

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


equalButton.addEventListener('mouseup', () => isEqualButtonClick = false); 
equalButton.addEventListener('mousedown', () => {

    isEqualButtonClick = true;
    operate();
    updateOutput();
    
});


negateButton.addEventListener('mousedown', () => {

    negate();
    updateCurrentValue();
    updateOutput();
    
});


percentageButton.addEventListener('mousedown', () => {

    currentValue /= 100;
    updateCurrentValue();
    updateOutput();

});


deleteButton.addEventListener('mousedown', () => {

    currentValue = currentValue.slice(0, currentValue.length - 1);
    updateCurrentValue();
    updateOutput();

});


decimalButton.addEventListener('mousedown', addDecimal);
clearButton.addEventListener('mousedown', reset);




function updateOutput() {
    if (!isEqualButtonClick) expression = num1 + operator + num2;
    output.textContent = expression || result;    
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

    if (result === Infinity || result === -Infinity) {
        result = 'Math Error'
        expression = '';
        return;
    }

    updateCurrentExpression();

}


function updateCurrentExpression() {
    
    result = round(result);
    num1 = result;
    num2 = '';   
    operator = '';
    expression = '';
    currentValue = '';
    
    isOperatorClick = false;

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


function addDecimal() {
    
    if (!isDecimalButtonClick) {
        
        checkCurrentValue()
        updateCurrentValue();
        updateOutput();

    }

    isDecimalButtonClick = true;

}


function negate() {

    if (!currentValue) currentValue = String(num1);
 
    if (currentValue && !currentValue.includes('-')) {
        currentValue = '-' + currentValue;
        return;
    }

    currentValue = currentValue.slice(1);

}


function round(value) {
    return Math.round(value * 100) / 100;
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