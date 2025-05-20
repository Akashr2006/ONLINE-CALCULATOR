let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history');
function init() {
    updateDisplay();
}
function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}
function appendDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        updateDisplay();
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}
function appendOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
    updateHistory();
}
function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}
function square() {
    currentInput = (parseFloat(currentInput) * parseFloat(currentInput)).toString();
    updateDisplay();
}
function calculate() {
    if (operation === null || resetScreen) return;
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    operation = null;
    updateDisplay();
    updateHistory(true);
}
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
    historyDisplay.value = '';
}
function backspace() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}
function updateDisplay() {
    resultDisplay.value = currentInput;
}
function updateHistory(clear = false) {
    if (clear) {
        historyDisplay.value = '';
        return;
    }
    
    if (operation !== null) {
        historyDisplay.value = `${previousInput} ${operation}`;
    }
}
window.onload = init;