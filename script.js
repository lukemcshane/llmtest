// Multiplication Quiz Game
let score = 0;
let totalQuestions = 0;
let currentAnswer = 0;

// Generate a random number between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate incorrect answers from nearby times tables
function generateIncorrectAnswers(a, b, correctAnswer) {
    const incorrectAnswers = new Set();

    // Generate potential incorrect answers from nearby multiplication results
    const candidates = [
        (a - 1) * b,  // e.g., 6*8 = 48
        (a + 1) * b,  // e.g., 8*8 = 64
        a * (b - 1),  // e.g., 7*7 = 49
        a * (b + 1),  // e.g., 7*9 = 63
        (a - 1) * (b - 1),
        (a + 1) * (b + 1),
        (a - 1) * (b + 1),
        (a + 1) * (b - 1)
    ];

    // Filter out the correct answer and negatives
    const validCandidates = candidates.filter(val => val > 0 && val !== correctAnswer);

    // Shuffle and pick 3 incorrect answers
    const shuffled = validCandidates.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(3, shuffled.length); i++) {
        incorrectAnswers.add(shuffled[i]);
    }

    // If we need more incorrect answers, generate some nearby values
    while (incorrectAnswers.size < 3) {
        const offset = randomInt(1, 10);
        const candidate = Math.random() < 0.5 ? correctAnswer + offset : correctAnswer - offset;
        if (candidate > 0 && candidate !== correctAnswer) {
            incorrectAnswers.add(candidate);
        }
    }

    return Array.from(incorrectAnswers);
}

// Generate a new question
function generateQuestion() {
    // Generate two random numbers for multiplication (2-12 range for times tables)
    const a = randomInt(2, 12);
    const b = randomInt(2, 12);
    currentAnswer = a * b;

    // Display the question
    document.getElementById('question').textContent = `${a} × ${b} = ?`;

    // Generate answer choices
    const incorrectAnswers = generateIncorrectAnswers(a, b, currentAnswer);
    const allChoices = [currentAnswer, ...incorrectAnswers];

    // Shuffle the choices
    allChoices.sort(() => Math.random() - 0.5);

    // Display the choices
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    allChoices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.addEventListener('click', () => checkAnswer(choice, button));
        choicesContainer.appendChild(button);
    });

    // Clear feedback and hide next button
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').classList.add('hidden');
}

// Check if the selected answer is correct
function checkAnswer(selectedAnswer, button) {
    totalQuestions++;
    const isCorrect = selectedAnswer === currentAnswer;

    if (isCorrect) {
        score++;
        button.classList.add('correct');
        document.getElementById('feedback').textContent = '✓ Correct!';
        document.getElementById('feedback').style.color = '#28a745';
    } else {
        button.classList.add('incorrect');
        document.getElementById('feedback').textContent = `✗ Wrong! The answer is ${currentAnswer}`;
        document.getElementById('feedback').style.color = '#dc3545';

        // Highlight the correct answer
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === currentAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Disable all buttons
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Update score
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalQuestions;

    // Show next button
    document.getElementById('next-btn').classList.remove('hidden');
}

// Initialize the quiz
function initQuiz() {
    generateQuestion();

    document.getElementById('next-btn').addEventListener('click', () => {
        generateQuestion();
    });
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    // DOM is already ready, run immediately
    initQuiz();
}
