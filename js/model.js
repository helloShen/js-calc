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
    operands: [],   // [0][1]store maximum 2 operands
    operator: '',   // store [+-*/] operator
    cursor: 0,      // positon of next input
    result: 0       // point to the result
};

function hasTwoOperands() {
    return data.operands.length === 2;
}

/* 
 * "=" equal operation will leave two cache value 
 *  1) operands[0]: result of last calculation
 *  2) operands[1]: second operand of last calculation 
 */
function hasCache() {
    return data.operands.length === 2 && data.cursor === 2;
}

/* remove operands[0] and operands[1] */
function deleteCache() {
    data.operands.splice(0, 2);
    data.cursor = 0;
}
/* keep operands[0], only remove operands[1] */
function deleteHalfCache() {
    data.operands.splice(1, 1); 
    data.cursor = 0;
}

/* return the array cursor pointing to */
function current() {
    return data.operands[data.cursor];
}
/* user call this function to give input values */
function input(str) {
    if (hasCache()) deleteCache();
    if (!current()) data.operands.push([]);
    current().push(str);
} 

/* return the result */
function result() {
    return data.operands[data.result];
}

/* call this function when user press one of the operators[+*-/] button */
function addOperator(operator) {
    if (hasCache()) deleteHalfCache();
    if (current()) data.cursor++;   // move on only if user has input a new operand
    if (hasTwoOperands()) {         // calculate only when having two operands
        data.operands[0] = Array.from(calc(data.operands.shift(), data.operands.shift(), data.operator).toString());
        data.result = 0;
        data.cursor = 1;
    }
    // updata operator at last
    data.operator = operator;
};

/* call this function when user press "=" button */
function callEqual() {
    if (hasTwoOperands()) {    // calculate only when having two operands
        data.operands[0] = Array.from(calc(data.operands[0], data.operands[1], data.operator).toString());
        data.result = 0;
        data.cursor = 2;
    }
};


/***********
 * 
 * Data API
 * 
 **********/

export const model = {
    'input': input,
    'current': current,
    'result': result,
    'operator': addOperator,
    'equal': callEqual
}