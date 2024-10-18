const express = require('express');
const app = express();
const port = 3001;
const { generateQuestion, checkAnswer } = require('./utils/mathUtilities');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

let currentQuestion = {};
let streak = 0;
let leaderboard = [];

// Home route
app.get('/', (req, res) => {
    res.render('index', { streak, leaderboard });
});

// Start a quiz
app.post('/start-quiz', (req, res) => {
    streak = 0;
    currentQuestion = generateQuestion(); 
    res.redirect('/quiz');
});

// Quiz question page
app.get('/quiz', (req, res) => {
    if (!currentQuestion.question) {
    }
    res.render('quiz', { question: currentQuestion });
});

// Handles quiz submissions
app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    console.log(`Answer: ${answer}`);

    // Check if the answer is correct
    const isCorrect = checkAnswer(currentQuestion.question, answer);

    if (isCorrect) {
        streak++;
        currentQuestion = generateQuestion(); 
        res.redirect('/quiz'); 
    } else {
        
        if (streak > 0) {
            leaderboard.push({ streak, date: new Date() });
            leaderboard.sort((a, b) => b.streak - a.streak);
            leaderboard = leaderboard.slice(0, 10); 
        }
        streak = 0; 
        res.redirect('/completion'); // Redirect to completion page
    }
});

// Quiz Completion Page
app.get('/completion', (req, res) => {
    res.render('completion', { streak });
});

// Leaderboards Page
app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
