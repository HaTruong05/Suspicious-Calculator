FIRST = null;
OPERATOR = null;
SEC = null;
TMP = null;
OPERATORS = new Set(['+', '-', '*', '/']);
EQ = '=';
CLR = 'AC';
CAN_INTERACT = true;

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function divisionError(ms) {
    CAN_INTERACT = false;
    await sleep (500);
    document.querySelector(".screen").innerText = "(｡•ˇ‸ˇ•｡)";
    await sleep (ms);
    document.querySelector(".screen").innerText = "You can't divide by 0";
    await sleep (ms);
    document.querySelector(".screen").innerText = "Clearing memory...";
    await sleep (ms);
    document.querySelector(".screen").innerText = FIRST;
    CAN_INTERACT = true;
}

function operate(a, b, op){
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === '+'){
        return add(a, b);
    } else if (op === '-'){
        return subtract(a, b);
    } else if (op === '*'){
        return multiply(a, b);
    } else {
        if (b === 0) { /*prevent division by 0*/
            divisionError(1000);
            return 0;
        }
        return divide(a, b);
    }
}

function addDetect(){
    buttons = document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener('click', getVal));
}

function getVal(event){
    if (CAN_INTERACT) {
        button = event.target.innerText;
        if (button === EQ) {/*2 numbers and operator exist, calculate output*/
            if (SEC != null){
                res = operate(FIRST, SEC, OPERATOR);
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
                if (parseFloat(FIRST) === 0) {
                    FIRST = button;  
                } else {
                    FIRST += button;
                }
                document.querySelector(".screen").innerText = FIRST;
            } else if (SEC === null || parseFloat(SEC) === 0) {
                SEC = button;
                document.querySelector(".screen").innerText = SEC;
            } else {
                SEC += button;
                document.querySelector(".screen").innerText = SEC;
            }
        }
    }
}

addDetect();