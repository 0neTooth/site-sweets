const test = [
    {
        question: "Если человека назвали мордофиля, то это...",
        answers: [
            { text: "Значит, что он тщеславный.", correct: true },
            { text: "Значит, что у него лицо как у хряка.", correct: false },
            { text: "Значит, что чумазый.", correct: false }
        ],
        explanation: "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный."
    },
    {
        question: "«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?",
        answers: [
            { text: "Он маленький и невзрачный.", correct: true },
            { text: "Он тот еще алкоголик.", correct: false },
            { text: "Он не держит свое слово.", correct: false }
        ],
        explanation: "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи."
    },
    {
        question: "Если человека прозвали пятигузом, значит, он...",
        answers: [
            { text: "Не держит слово.", correct: true },
            { text: "Изменяет жене", correct: false },
            { text: "Без гроша в кармане.", correct: false }
        ],
        explanation: "Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек."
    },
    {
        question: "Кто такой шлындра?",
        answers: [
            { text: "Обманщик.", correct: false },
            { text: "Нытик.", correct: false },
            { text: "Бродяга.", correct: true }
        ],
        explanation: "Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться."
    }
];


let currentQuestions = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let answeredQuestions = [];
let isAnswerSelected = false;

const testArea = document.getElementById('test-area');
const noQuestions = document.getElementById('no-questions');
const results = document.getElementById('results');
const correctAnswersSpan = document.getElementById('correct-answers');
const totalQuestionsSpan = document.getElementById('total-questions');
const questionsHistory = document.getElementById('questions-history');
const restartBtn = document.getElementById('restart-btn');


function initTest() {
    currentQuestions = [...test].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    answeredQuestions = [];
    isAnswerSelected = false;
    
    testArea.innerHTML = '';
    noQuestions.style.display = 'none';
    results.style.display = 'none';
    
    
    showQuestion();
}


function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showNoQuestions();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.dataset.questionIndex = currentQuestionIndex;
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = (currentQuestionIndex + 1) + ". " + question.question;
    questionContainer.appendChild(questionText);
    
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
    
    shuffledAnswers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer';
        answerElement.textContent = answer.text;
        answerElement.dataset.isCorrect = answer.correct;
        
        answerElement.addEventListener('click', () => {
            if (isAnswerSelected) return;
            
            isAnswerSelected = true;
            handleAnswerSelection(answerElement, answer.correct, question);
        });
        
        answersContainer.appendChild(answerElement);
    });
    
    questionContainer.appendChild(answersContainer);
    testArea.appendChild(questionContainer);
}

function handleAnswerSelection(answerElement, isCorrect, question) {

    if (isCorrect) {
        answerElement.classList.add('correct');
        correctAnswersCount++;
        
        const questionContainer = answerElement.closest('.question-container');
        const marker = document.createElement('div');
        marker.className = 'marker correct-marker';
        marker.innerHTML = '✓';
        questionContainer.appendChild(marker);

        const explanation = document.createElement('div');
        explanation.className = 'explanation';
        explanation.textContent = question.explanation;
        explanation.style.display = 'block';
        
        const answersContainer = answerElement.parentNode;
        answersContainer.appendChild(explanation);
        
        answerElement.style.transform = 'scale(1.1)';

        const allAnswers = answersContainer.querySelectorAll('.answer');
        allAnswers.forEach(answer => {
            if (!answer.classList.contains('correct')) {
                answer.style.transform = 'translateY(100px)';
                answer.style.opacity = '0';
            }
        });

    } else {
        answerElement.classList.add('incorrect');
        
        const questionContainer = answerElement.closest('.question-container');
        const marker = document.createElement('div');
        marker.className = 'marker incorrect-marker';
        marker.innerHTML = '✗';
        questionContainer.appendChild(marker);

        const answersContainer = answerElement.parentNode;
        const allAnswers = answersContainer.querySelectorAll('.answer');
        allAnswers.forEach((answer, index) => {
            answer.style.transform = `translateY(${100 * (index + 1)}px)`;
            answer.style.opacity = '0';
        });
    }
    
    answeredQuestions.push({
        question: question.question,
        userAnswer: answerElement.textContent,
        correctAnswer: question.answers.find(a => a.correct).text,
        isCorrect: isCorrect,
        explanation: question.explanation
    });
    
    
    
    setTimeout(() => {
        const questionContainer = answerElement.closest('.question-container');
        questionContainer.style.transform = 'translateY(100px)';
        questionContainer.style.opacity = '0';
        
        setTimeout(() => {
            currentQuestionIndex++;
            testArea.innerHTML = '';
            
            if (currentQuestionIndex < currentQuestions.length) {
                showQuestion();
                isAnswerSelected = false;
            } else {
                showNoQuestions();
                showResults();
            }
        }, 500);
    }, 2000);
}

function showNoQuestions() {
    noQuestions.style.display = 'block';
}

function showResults() {
    results.style.display = 'block';
    correctAnswersSpan.textContent = correctAnswersCount;
    totalQuestionsSpan.textContent = currentQuestions.length;
    
    questionsHistory.innerHTML = '';
    
    answeredQuestions.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const questionElement = document.createElement('div');
        questionElement.className = 'history-question';
        questionElement.textContent = `${index + 1}. ${item.question}`;
        
        const answerElement = document.createElement('div');
        answerElement.className = 'history-answer';
        answerElement.innerHTML = `
            <strong>Ваш ответ:</strong> ${item.userAnswer} ${item.isCorrect ? '✓' : '✗'}<br>
            <strong>Правильный ответ:</strong> ${item.correctAnswer}<br>
            <strong>Пояснение:</strong> ${item.explanation}
        `;
        
        historyItem.appendChild(questionElement);
        historyItem.appendChild(answerElement);
        
        historyItem.addEventListener('click', () => {
            document.querySelectorAll('.history-answer').forEach(el => {
                if (el !== answerElement) {
                    el.style.display = 'none';
                }
            });
            
            answerElement.style.display = answerElement.style.display === 'block' ? 'none' : 'block';
        });
        
        questionsHistory.appendChild(historyItem);
    });
}

restartBtn.addEventListener('click', initTest);

document.addEventListener('DOMContentLoaded', initTest);