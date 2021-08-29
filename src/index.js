function eval() {
    // Do not use eval!!!
    return;
}

// const DE = '(-*\\s*\\d+[.]*\\d*)'; //digit expression
const DE = '((?:-\\s*)?\\d+[.]*\\d*(?:e-)?\\d*)'; //digit expression

function simpleCalc(num1, oper, num2) {
    num1 = +num1.replace(/\s*/g, '');
    num2 = +num2.replace(/\s*/g, '');

    // console.log('Num1', num1); // FIXME: Удалить этот console log
    // console.log('Num2', num2); // FIXME: Удалить этот console log
    // console.log('Oper', oper); // FIXME: Удалить этот console log

    switch (oper) {
        case '+':
            return num1 + num2;
            break;
        case '-':
            // console.log('Num1', num1); // FIXME: Удалить этот console log
            // console.log('Num2', num2); // FIXME: Удалить этот console log
            // console.log('Oper', oper); // FIXME: Удалить этот console log
            return num1 - num2;
            break;
        case '/':
            if (num2 === 0) {
                throw new Error('TypeError: Division by zero.');
            }
            // console.log('Num1', num1); // FIXME: Удалить этот console log
            // console.log('Num2', num2); // FIXME: Удалить этот console log
            // console.log('Oper', oper); // FIXME: Удалить этот console log
            // console.log('=', num1 / num2); // FIXME: Удалить этот console log
            return num1 / num2;
            break;
        case '*':
            return num1 * num2;
            break;
    }

}

function getRegEx(oper) {
    // return new RegExp(`${DE}\\s*${oper}\\s*${DE}`, 'g');
    return new RegExp(`${DE}\\s*${oper}\\s*${DE}`);
}

function calculateBrackets(expr) {
    while (expr.match(/-\s*-/g)) {
        expr = expr.replace(/-\s*-/g, '+');
    }

    // console.log(expr); // FIXME: Удалить этот console log
    let regExStr = getRegEx('\/');
    while (expr.match(regExStr)) {
        // console.log('Devide', expr); // FIXME: Удалить этот console log
        expr = expr.replace(regExStr, (e, num1, num2) => simpleCalc(num1, '/', num2));
    }

    regExStr = getRegEx('\\*');
    while (expr.match(regExStr)) {
        expr = expr.replace(regExStr, (e, num1, num2) => simpleCalc(num1, '*', num2));
        // console.log(expr); // FIXME: Удалить этот console log
    }

    regExStr = getRegEx('-');
    while (expr.match(regExStr)) {
        expr = expr.replace(regExStr, (e, num1, num2) => simpleCalc(num1, '-', num2));
        // console.log(expr); // FIXME: Удалить этот console log
    }

    regExStr = getRegEx('\\+');
    while (expr.match(regExStr)) {
        expr = expr.replace(regExStr, (e, num1, num2) => simpleCalc(num1, '+', num2));
    }

    if (expr.match(/\s/g)) {
        expr = expr.trim().replace(/\s+/g, '+');
        expr = calculateBrackets(expr);
    }

    return expr;
}

function expressionCalculator(expr) {
    if (expr.match(/[\(\)]/g)) {
        while (expr.match(/\([e\.0-9\*\/\+\-\s]*\)/g)) {
            // console.log(expr); // FIXME: Удалить этот console log
            expr = expr.replace(/\(([e\.0-9\*\/\+\-\s]*)\)/g, (e, str) => calculateBrackets(str));
        }
    }
    console.log(expr); // FIXME: Удалить этот console log
    if (expr.match(/[\(\)]/g)) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    return +calculateBrackets(expr);
}

module.exports = {
    expressionCalculator
}
// console.log(expressionCalculator(" 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) ")); // FIXME: Удалить этот console log

// console.log(expressionCalculator('(  6 + 91 / -34.00000000000017 / 29 / 81  )')); // FIXME: Удалить этот console log
// console.log(expressionCalculator('91 / -34.00000000000017')); // FIXME: Удалить этот console log
