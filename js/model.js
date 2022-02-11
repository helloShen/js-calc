/***********
 * 
 * Math 
 * 
 **********/

function add(x, y) {
    return x + y;
};
  
function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) return undefined;
    return x / y;
}

function calc(arrX, arrY, operator) {
    const x = parseFloat(arrX.join(''));
    const y = parseFloat(arrY.join(''));
    let result = undefined;
    switch (operator) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case '*':
            result = multiply(x, y);
            break;
        case '/':
            result = divide(x, y);
            break;
    }
    return result;
}


/***********
 * 
 * Data 
 * 
 **********/

const data = {
    operands: [],   // maximum 2 operands
    cursor: 0,      // pointer on operends, show next input position
    cache: [],      // memorize second operand of last calculation
    result: [],     // put the result of each calculation
    show: [],
    operator: '',   // store [+-*/] operator
};

/* true if at least 1 operand exists */
function hasOperands() {
    return data.operands.length > 0;
}

/* true if operands has 2 members */
function hasTwoOperands() {
    return data.operands.length === 2;
}

/* check whether the second operand of last operation is cached  */
function hasCache() {
    return data.cache.length > 0;
}

/* check whether we have result from last operation stored */
function hasResult() {
    return data.result.length > 0;
}

/* return the target our cursor is currently pointing at */
function current() {
    return data.operands[data.cursor];
}

/* user call this function to give input values */
function input(str) {
    if (!current()) data.operands.push([]);
    current().push(str);
    data.show = current();
} 

/* notice which data to show */
function show() {
    return data.show;
}

/* 
 * Call this function when user press one of the operators[+*-/] button 
 * Main logic:
 *  ==> 1. if has 2 operands, calculate first the result, 
 *  and use it as the first operand of the next operation.
 *  ==> 2. if has only 1 operator, move the cursor forward.
 *  ==> 3. if no operand at all, check the previous result, 
 *  and use it as the first operand of the next operation.
 */
function operator(operator) {
    if (hasOperands()) {
        if (hasTwoOperands()) {
            data.result = Array.from(calc(data.operands.shift(), data.operands.shift(), data.operator).toString());
            data.cache = [];
            data.operands[0] = data.result;
            data.cursor = 1;
            data.show = data.result;
        } else { // only has 1 operand
            data.cursor = 1;
        }
    } else if (hasResult()) {
        data.operands[0] = data.result;
        data.cache = [];
        data.cursor = 1;
    }
    // updata operator at last
    data.operator = operator;
};

/* 
 * Call this function when user press "=" button 
 * Main logic:
 *  ==> 1. if has 2 operands, calculate the result, 
 *  and cache the second operands for next operation.
 *  ==> 2. if has only 1 operand, the result is the 
 *  first operand.
 *  ==> 3. if has no operand (user press '=' contiguously),
 *  calculate the result using last result and cached 
 *  operand.
 */
function equal() {
    if (hasTwoOperands()) {
        data.cache = data.operands[1];
        data.result = Array.from(calc(data.operands.shift(), data.operands.shift(), data.operator).toString());
    } else if (hasOperands()) { // only 1 operands
        data.result = data.operands.shift();
        data.cache = [];
    } else if (hasCache()) { // no operands
        data.result = Array.from(calc(data.result, data.cache, data.operator).toString());
    }
    data.cursor = 0;
    data.show = data.result;
};


/***********
 * 
 * Data API
 * 
 **********/

export const model = {
    'input': input,
    'current': current,
    'show': show,
    'operator': operator,
    'equal': equal
}