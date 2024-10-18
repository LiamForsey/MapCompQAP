const MathOperators = {
    Multiplication: "x",
    Division: "/",
    Subtraction: "-",
    Addition: "+",
};

function generateQuestion() {
    const operators = Object.values(MathOperators);
    const num1 = getRandomNumber(1, 10);
    const num2 = getRandomNumber(1, 10);
    const operator = operators[getRandomNumber(0, operators.length - 1)];

    let questionString = `${num1} ${operator} ${num2}`;
    
    return {
        question: questionString,
        num1: num1,
        num2: num2,
        MathQuestion: operator
    };
}


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Checks if the provided answer is correct based on the question
 * 
 * @param {string} question The question being answered
 * @param {number} userAnswer The user's answer
 * @returns {boolean} True if the answer is correct, false otherwise.
 */
function checkAnswer(question, userAnswer) {
    const [num1, operator, num2] = question.split(' ');
    let correctAnswer;

    switch (operator) {
        case '+':
            correctAnswer = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            correctAnswer = parseFloat(num1) - parseFloat(num2);
            break;
        case 'x':
            correctAnswer = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            correctAnswer = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            return false; 
    }

    return correctAnswer === parseFloat(userAnswer);
}

module.exports = {
    generateQuestion,
    getRandomNumber,
    checkAnswer,
    MathOperators,
};
