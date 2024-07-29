FIRST = null;
OPERATOR = null;
SEC = null;
TMP = null;
OPERATORS = new Set(['+', '-', '*', '/']);
EQ = '=';
CLR = 'AC';
EVAL_NEW = false; 

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(a, b, op){
    if (op === '+'){
        return add(a, b);
    } else if (op === '-'){
        return subtract(a, b);
    } else if (op === '*'){
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

function addDetect(){
    buttons = document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener('click', getVal));
}

function getVal(event){
    button = event.target.innerText;
    if (button === '=') {/*2 numbers and operator exist, calculate output*/
        if (SEC != null){
            res = operate(parseFloat(FIRST), parseFloat(SECOND), OPERATOR);
            document.querySelector(".screen").innerText = operate(parseFloat(FIRST), parseFloat(SECOND), OPERATOR);
            FIRST = res;
            SEC = null;
            OPERATOR = null;
        }
    } else if (button === CLR) {
        FIRST = null;
        OPERATOR = null;
        SEC = null;
        TMP = null;
        document.querySelector(".screen").innerText = '';
    } else if (OPERATORS.has(button)) {
        operator = button;
    } else { /*pressing one of the numbers*/
        if (FIRST === null) {
            FIRST = button;
            document.querySelector(".screen").innerText = FIRST;
        } else if (OPERATOR === null) {
            FIRST += button;
            document.querySelector(".screen").innerText += button;
        }else if (SEC != null) {
            res = operate(parseFloat(FIRST), parseFloat(SECOND), OPERATOR);
            document.querySelector(".screen").innerText = operate(parseFloat(FIRST), parseFloat(SECOND), OPERATOR);
            FIRST = res;
            SEC = null;
            OPERATOR = null;
        } else {
            SEC += button;
            document.querySelector(".screen").innerText = SEC;
        }
    }
}

addDetect();