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

/* Trim redundant tailing zero: 1.2000 to 1.2, 1.000 to 1 */
function trim(str) {
    const arr = Array.from(str);
    if (arr.includes('.')) {
        let idx = arr.length;
        while (idx - 1 > arr.indexOf('.') && arr[idx - 1] === '0') idx--;
        arr.splice(idx, arr.length - idx);
        if (arr.indexOf('.') === arr.length - 1) arr.splice(arr.length - 1, 1); 
    }
    return arr.join('');
}

/* Input number can be either number or array, check their type before using them. */
function calc(inX, inY, operator) {
    const x = (typeof inX === 'number')? inX : parseFloat(inX.join(''));
    const y = (typeof inY === 'number')? inY : parseFloat(inY.join(''));
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

/* Result(in accumulator) must be stored as a floating point number, not array. Casting the floating point number to a string will lose information. */
function Data() {
    this.operands = [['0']];        // Maximum 2 operands.
    this.cursor = 0;                // Pointer on operends, show next input position.
    this.cache = [];                // Memorize second operand of last calculation.
    this.accumulator = 0;           // Store result from last calculation. It's a number, not an array.
    this.show = this.operands[0];   // which data to show on the screen, either current number, or the result.
    this.operator = '';             // Store [+-*/] operator.
}

let data = new Data();

/* True if at least 1 operand exists. */
function hasOperands() {
    return data.operands.length > 0;
}

/* True if operands has 2 members. */
function hasTwoOperands() {
    return data.operands.length === 2;
}

/* Check whether the second operand of last operation is cached.  */
function hasCache() {
    return data.cache.length > 0;
}

/* Return the target our cursor is currently pointing at. */
function current() {
    return data.operands[data.cursor];
}

/* Check if the operand already has dot.
 * Each operand can have only 1 dot. */
function hasDot(operand) {
    return operand && operand.includes('.');
}

/* Check if the operand contains nothing but a leading zero: ['0']. */
function onlyLeadingZero(operand) {
    return operand.length === 1 && operand[0] === '0';
}

/* User call this function to give input values. */
function input(ch) {
    if (!current()) data.operands.push(['0']);
    if (ch === '.') {
        if (!hasDot(current())) { // Each operand can have only one dot.
            current().push(ch);
        }
    } else {
        if (onlyLeadingZero(current())) current().splice(0, 1);
        current().push(ch);
    }
    data.show = current();
} 

/* 
 * 0.1 + 0.2 = 0.30000000000000004
 * 0.1 * 0.2 = 0.020000000000000004
 * So format them before showing them to the user:
 *  1. Strip them to an approximation of 16 digitals(integer + decimal).
 *  2. Trim the tailing 0.
 * The type of data that 'data.show' points to can either be a number or an array.
 * So check the data type before starting to work.
 */
function show() {
    return (typeof data.show === 'number')? 
        Array.from(trim(data.show.toPrecision(16)))
        : data.show;
}

/* 
 * Clear user input or result on the screen 
 *  => For user input: clear directly the data in the model.
 *  => For result: only clear the screen, but keep the result in model.
 */
function clear() {
    if (data.show !== data.accumulator) { // data.show points to one of the operand
        data.operands[data.cursor] = ['0'];
        data.show = data.operands[data.cursor];
    } else {
        data.show = 0;
    }
}

/* Reset the model to its initial setting. */
function allClear() {
    data = new Data();
}

/* Reverse the number sign positive negative of user input or result. */
function neg() {
    if (data.show !== data.accumulator) { // data.show points to one of the operand
        if (data.operands[data.cursor][0] !== '-') {
            data.operands[data.cursor].unshift('-');
        } else {
            data.operands[data.cursor].shift();
        }
    } else {
        data.accumulator *= -1;
        data.show = data.accumulator;
        if (data.operands[0]) data.operands[0] *= -1;
    }
}

/* Conver the array ['1'] to ['0', '.', '0', '1'] */
function toPercentage(numArr) {
    let numFloat = parseFloat(numArr.join(''));
    numFloat /= 100;
    return Array.from(trim(numFloat.toPrecision(16)));
}

/* Divide current input or result by 100. */
function percentage() {
    if (data.show !== data.accumulator) { // data.show points to one of the operand
        data.operands[data.cursor] = toPercentage(data.operands[data.cursor]);
        data.show = data.operands[data.cursor];
    } else {
        data.accumulator /= 100;
        data.show = data.accumulator;
        if (data.operands[0]) data.operands[0] /= 100;
    }
}

/* 
 * Call this function when user press one of the operators[+*-/] button 
 * Main logic:
 *  ==> 1. If has 2 operands, calculate first the result, 
 *  and use it as the first operand of the next operation.
 *  ==> 2. If has only 1 operator, move the cursor forward.
 *  ==> 3. If no operand at all, check the previous result, 
 *  and use it as the first operand of the next operation.
 */
function operator(operator) {
    if (hasOperands()) {
        if (hasTwoOperands()) {
            data.accumulator = calc(data.operands.shift(), data.operands.shift(), data.operator);
            data.cache = [];
            data.operands[0] = data.accumulator;
            data.cursor = 1;
            data.show = data.accumulator;
        } else {    // only has 1 operand
            data.cursor = 1;
        }
    } else {        // has no operand
        data.operands[0] = data.accumulator;
        data.cache = [];
        data.cursor = 1;
    }
    // updata operator at last
    data.operator = operator;
};

/* 
 * Call this function when user press "=" button 
 * Main logic:
 *  ==> 1. If has 2 operands, calculate the result, 
 *  and cache the second operands for next operation.
 *  ==> 2. If has only 1 operand, the result is the 
 *  first operand.
 *  ==> 3. If has no operand (user press '=' contiguously),
 *  calculate the result using last result and cached 
 *  operand.
 */
function equal() {
    if (hasTwoOperands()) {
        data.cache = data.operands[1];
        data.accumulator = calc(data.operands.shift(), data.operands.shift(), data.operator);
    } else if (hasOperands()) {     // only 1 operands
        data.accumulator = data.operands.shift();
        data.cache = [];
    } else if (hasCache()) {        // no operands
        data.accumulator = calc(data.accumulator, data.cache, data.operator);
    }
    data.cursor = 0;
    data.show = data.accumulator;
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
    'equal': equal,
    'c': clear,
    'ac': allClear,
    'neg': neg,
    'percentage': percentage
}