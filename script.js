// Quiz answers - correct answers for each question
const quizAnswers = {
    1: 'b', // Verified news organization
    2: 'b', // Verify from multiple sources
    3: 'd', // All of the above
    4: 'b', // AI-generated media
    5: 'b'  // Reverse image search
};

// Store user's answers
let userAnswers = {};
let currentQuestion = 1;
const totalQuestions = 5;

// Function to handle answer selection
function selectAnswer(questionNum, answer) {
    // Store the answer
    userAnswers[questionNum] = answer;
    
    // Remove selected class from all options in this question
    const questionElement = document.getElementById(`question${questionNum}`);
    const options = questionElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
        if (questionNum < totalQuestions) {
            showNextQuestion(questionNum + 1);
        } else {
            showResults();
        }
    }, 500);
}

// Function to show next question
function showNextQuestion(questionNum) {
    // Hide current question
    document.getElementById(`question${currentQuestion}`).classList.add('hidden');
    
    // Show next question
    currentQuestion = questionNum;
    document.getElementById(`question${questionNum}`).classList.remove('hidden');
    
    // Scroll to question smoothly
    document.getElementById(`question${questionNum}`).scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Function to show quiz results
function showResults() {
    // Hide current question
    document.getElementById(`question${currentQuestion}`).classList.add('hidden');
    
    // Calculate score
    let score = 0;
    for (let i = 1; i <= totalQuestions; i++) {
        if (userAnswers[i] === quizAnswers[i]) {
            score++;
        }
    }
    
    const percentage = (score / totalQuestions) * 100;
    
    // Display results
    const resultContainer = document.getElementById('quizResult');
    const resultScore = document.getElementById('resultScore');
    const resultMessage = document.getElementById('resultMessage');
    
    resultScore.textContent = `${score} out of ${totalQuestions} correct (${percentage}%)`;
    
    // Customize message based on score
    if (percentage === 100) {
        resultMessage.innerHTML = `
            <p><strong>Excellent!</strong> You have excellent media literacy skills. You know how to identify credible sources and spot fake news. Keep up the great work!</p>
        `;
    } else if (percentage >= 80) {
        resultMessage.innerHTML = `
            <p><strong>Great job!</strong> You have good media literacy skills. Continue to practice critical thinking and fact-checking to further improve.</p>
        `;
    } else if (percentage >= 60) {
        resultMessage.innerHTML = `
            <p><strong>Good effort!</strong> You have a basic understanding of media literacy. Review the resources section to learn more about identifying misinformation.</p>
        `;
    } else {
        resultMessage.innerHTML = `
            <p><strong>Keep learning!</strong> Media literacy is a skill that improves with practice. Explore the resources section and take this quiz again to test your knowledge.</p>
        `;
    }
    
    resultContainer.classList.remove('hidden');
    
    // Highlight correct/incorrect answers in the quiz
    highlightAnswers();
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Function to highlight correct and incorrect answers
function highlightAnswers() {
    for (let i = 1; i <= totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        const options = questionElement.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            const optionLetter = String.fromCharCode(97 + index); // a, b, c, d
            option.classList.remove('selected');
            
            if (optionLetter === quizAnswers[i]) {
                option.classList.add('correct');
            } else if (optionLetter === userAnswers[i] && optionLetter !== quizAnswers[i]) {
                option.classList.add('incorrect');
            }
        });
    }
}

// Function to reset quiz
function resetQuiz() {
    // Reset variables
    userAnswers = {};
    currentQuestion = 1;
    
    // Hide results
    document.getElementById('quizResult').classList.add('hidden');
    
    // Reset all questions
    for (let i = 1; i <= totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        questionElement.classList.add('hidden');
        
        // Remove all classes from options
        const options = questionElement.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });
    }
    
    // Show first question
    document.getElementById('question1').classList.remove('hidden');
    
    // Scroll to quiz section
    document.querySelector('.quiz-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

