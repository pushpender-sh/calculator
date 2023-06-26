import '../assets/css/style.css';

let expression = '';
//selectors
const root = document.querySelector('.keys');
//const item= root.querySelectorAll('.button');
const screen = document.querySelector('#result');

//funcions
function resetvalues() {
    expression = ''
    screen.value = expression;
}

function beingresult() {
    if (expression[0] == '0') {
        const answer = eval(expression.slice(1));
        screen.value = answer;
    }
    else {
        try {
            expression = eval(expression);
            screen.value = expression;
        }
        catch (err) {
            screen.value = "error";
        }
    }
}

function backspace() {
    expression = screen.value;
    expression = expression.slice(0, (expression.length - 1));
    screen.value = expression;
}

function gotoscreen(event) {
    if (event.target.nodeName.toLowerCase() == 'div') {
        return;
    }
    const digit = event.target.innerText;
    switch (digit) {
        case 'RESET':
            resetvalues();
            break;
        case '=':
            beingresult();
            break;
        case 'DEL':
            backspace();
            break;
        default:

            if(expression[0]=='0'){
                expression=expression.slice(1);
            }
            expression += digit;
            screen.value = expression;
            console.log(expression);
    }
}

function keypressing(event) {
    event.preventDefault();
    const pressedkey = event.key;
    switch (pressedkey) {
        case "Enter":
            beingresult();
            console.log(expression);

            break;
        case "Backspace":
            backspace();
            break;
        case "Delete":
            resetvalues();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            expression += pressedkey;
            screen.value = expression;
            break;

        default:
            if(expression[0]=='0'){
                expression=expression.slice(1);
            }
            if (pressedkey >= 0 && pressedkey <= 9) {
                expression += pressedkey;
                screen.value = expression;
            }


    }
}

function init() {
    root.addEventListener('click', gotoscreen);
    document.addEventListener('keydown', keypressing);
}

init();


