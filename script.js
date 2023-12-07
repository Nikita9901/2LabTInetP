let display = document.getElementById('display');
let memory = document.getElementById('stack');
let currentValue = '';
let previousNum = '';

class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0)
            return undefined;
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

let stack = new Stack();

function appendValue(num) {
    if (num === '('){
        stack.push(currentValue);
        display.value = '';
        currentValue = ''
        memory.innerHTML = memory.innerHTML + stack.peek() + '(';
    }
    else if (num === ')'){
        calculate();
        if (stack.peek() === '++('){
            memory.innerHTML = memory.innerHTML.replace(stack.pop(), '');
            display.value = stack.peek() + (Number(currentValue) + 1).toString();
        }
        else if (stack.peek() === '--('){
            memory.innerHTML = memory.innerHTML.replace(stack.pop(), '');
            display.value = stack.peek() + (Number(currentValue) - 1).toString();
        }
        else{
            display.value = stack.peek() + currentValue;
        }
        previousNum = (Number(currentValue) + 1).toString();
        currentValue = display.value;
        memory.innerHTML = memory.innerHTML.replace(stack.pop(), '');
        memory.innerHTML = memory.innerHTML.replace(/\($/, '');
    }
    else if (num === "++") {
        if (!isNaN(Number(previousNum))){
            let incrementedNum = (Number(previousNum) + 1).toString();
            let regExp = new RegExp(previousNum + '$');

            currentValue = currentValue.replace(regExp, incrementedNum);
            previousNum = incrementedNum;
            display.value = currentValue;
        } else {
            stack.push(currentValue);
            display.value = '';
            currentValue = ''
            memory.innerHTML = memory.innerHTML + stack.peek() + ' ++(';
            stack.push('++(');
        }
    }
    else if (num === "--"){
        if (!isNaN(Number(previousNum))){
            const temp = previousNum;
            previousNum = (Number(previousNum) - 1).toString()
            let tempIndex = currentValue.lastIndexOf(temp);
            if (tempIndex !== -1) {
                currentValue = currentValue.slice(0, tempIndex) + previousNum + currentValue.slice(tempIndex + temp.length);
            }
            console.log(currentValue)
            display.value = currentValue;
        }
        else{
            stack.push(currentValue);
            display.value = '';
            currentValue = ''
            memory.innerHTML = memory.innerHTML + stack.peek() + ' --(';
            stack.push('--(');
        }
    }
    else{
        currentValue += num;
        display.value = currentValue;
        if (!isNaN(Number(num))) previousNum = previousNum + num;
        else previousNum = ''
    }
}

function calculate() {
    try {
        let expression = currentValue
        expression = expression.replace('--', '+')
        console.log(expression)

        if (!expression) {
            alert('Вы ничего не ввели');
        } else {
            try {
                display.value = eval(expression);
                currentValue = display.value;
                previousNum = currentValue;
            } catch (error) {
                alert('Ошибка выражения');
                console.log('Ошибка: ' + error.message);
            }
        }
    } catch {
        display.value = "Ошибка!";
    }
}

function clearDisplay() {
    memory.innerHTML = ''
    display.value = '';
    currentValue = '';
    previousNum = '';
}