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

const ADDITION = '+';
const SUBTRACTION = '-';
const MULTIPLICATION = '*';
const DIVISION = '/';

numberButton.forEach((number) => {
    
    number.addEventListener('mousedown', () => {
        currentValue += number.value;
        updateCurrentValue();
        updateOutput();       
    });

});

operatorButton.forEach((operators) => {
    
    operators.addEventListener('mousedown', () => {
        checkCurrentExpression();
        isOperatorClick = true;
        operator = operators.value;
        updateOutput();
    });

    operators.addEventListener('mouseup', () => {
        isDecimalButtonClick = false;
        currentValue = '';
    });

});

equalButton.addEventListener('mouseup', () => isEqualButtonClick = false); 
equalButton.addEventListener('mousedown', setResult);
percentageButton.addEventListener('mousedown', setPercentage);
negateButton.addEventListener('mousedown', negateValue);
decimalButton.addEventListener('mousedown', addDecimal);
deleteButton.addEventListener('mousedown', remove);
clearButton.addEventListener('mousedown', reset);
document.addEventListener('keydown', setKey);


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


function setKey(e) {
    let keyValue = parseInt(e.key);

    if (e.key === 'Enter' && (num1 && num2) && operator) {
        setResult();
        isEqualButtonClick = false;
        return;
    } 
    
    if (e.key === ADDITION || 
        e.key === SUBTRACTION || 
        e.key === MULTIPLICATION ||
        e.key === DIVISION) {
            checkCurrentExpression();
            operator = e.key;
            updateOutput();

            isOperatorClick = true;
            currentValue = '';
            return;
    }

    if (e.key === 'Backspace') {
        remove();
        return;
    }

    if (isNaN(keyValue)) return;

    currentValue += keyValue;
    updateCurrentValue();
    updateOutput();
}


function updateOutput() {
    if (!isEqualButtonClick) expression = num1 + operator + num2;
    output.textContent = expression || result;    
}


function setResult() {
    isEqualButtonClick = true;
    operate();
    updateOutput();
}


function negateValue() {
    negate();
    updateCurrentValue();
    updateOutput();
}


function setPercentage() {
    currentValue /= 100;
    updateCurrentValue();
    updateOutput();
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

function checkCurrentExpression() {
    if ((num1 && num2) && operator) operate();
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


function remove() {
    currentValue = currentValue.slice(0, currentValue.length - 1);
    updateCurrentValue();
    updateOutput();
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