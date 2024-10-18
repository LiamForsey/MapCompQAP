const { checkAnswer, generateQuestion } = require("../../utils/mathUtilities");


describe("Tests for getQuestion", () => {
    test("Tests that getQuestion returns a question string and answer", () => {
        const { question, answer } = generateQuestion();
        
        // Check that the question is a string
        expect(typeof question).toBe("string");
        
        // Check that the answer is a number
        expect(typeof answer).toBe("number");
        
        // Ensure the question contains a valid operator
        expect(question.includes('+') || question.includes('-') || 
               question.includes('*') || question.includes('/')).toBe(true);
    });

    test("Tests that getQuestion generates questions in the correct format", () => {
        const { question } = generateQuestion();
        
        // Check for valid formats like "X + Y", "X - Y", "X * Y", "X / Y"
        expect(/^\d+\s[\+\-\*\/]\s\d+$/.test(question)).toBe(true);
    });
});

describe("Tests for isCorrectAnswer", () => {
    test("Tests that isCorrectAnswer returns true for correct answers", () => {
        expect(checkAnswer("5 + 5", 10)).toBe(true);

        expect(checkAnswer("10 - 2", 8)).toBe(true);

        expect(checkAnswer("3 * 4", 12)).toBe(true);
        
        expect(checkAnswer("8 / 4", 2)).toBe(true);
    });

    test("Tests that isCorrectAnswer returns false for incorrect answers", () => {
        expect(checkAnswer("5 + 5", 8)).toBe(false);

        expect(checkAnswer("10 - 2", 6)).toBe(false);

        expect(checkAnswer("3 * 4", 10)).toBe(false);

        expect(checkAnswer("8 / 4", 3)).toBe(false);
    });
});
