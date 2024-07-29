FIRST = null;
OPERATOR = null;
SEC = null;
TMP = null;
OPERATORS = new Set(['+', '-', '*', '/']);
EQ = '=';
CLR = 'AC';

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
    console.log(button);
    if (button === EQ) {/*2 numbers and operator exist, calculate output*/
        if (SEC != null){
            res = operate(parseFloat(FIRST), parseFloat(SEC), OPERATOR);
            document.querySelector(".screen").innerText = res;
            FIRST = res;
            SEC = null;
            OPERATOR = null;
        }
    } else if (button === CLR) {
        FIRST = null;
        OPERATOR = null;
        SEC = null;
        TMP = null;
        document.querySelector(".screen").innerText = 0;
    } else if (OPERATORS.has(button)) {
        if (FIRST != null && SEC != null){
            FIRST = operate(FIRST, SEC, OPERATOR)
            SEC = null
            document.querySelector(".screen").innerText = FIRST;
        }
        OPERATOR = button;
    } else { /*pressing one of the numbers*/
        if (FIRST === null) {
            FIRST = button;
            document.querySelector(".screen").innerText = FIRST;
        } else if (OPERATOR === null) {
            FIRST += button;
            document.querySelector(".screen").innerText += button;
        } else if (SEC === null) {
            SEC = button;
            document.querySelector(".screen").innerText = SEC;
        } else {
            SEC += button;
            document.querySelector(".screen").innerText = SEC;
        }
    }
}

addDetect();