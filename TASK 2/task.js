const quizData = [
    {
      question: 'I ______ working all afternoon and have just finished the assignment.',
      options: ['have been', 'had been', 'shall be' , 'am'],
      answer: 'had been',
    },
    {
      question: 'Rohan __________ the movie before he read the review.',
      options: ['watches', 'have watched', 'had watched', 'was watching'],
      answer: 'had watched',
    },
    {
      question: 'By the next month, we shall __________ the project.',
      options: ['has completed', 'completing', 'completed', 'have completed'],
      answer: 'have completed',
    },
    {
      question: 'Every boy and girl __________ in the class today.',
      options: ['are present', 'is present', 'have present', 'had present'],
      answer: 'is present',
    },
    {
      question: 'Which tense is used to express general truths and facts?',
      options: [
        'Present continuous tense ',
        'Present perfect tense',
        'Past perfect tense',
        'Present indefinite tense',
      ],
      answer:'Present indefinite tense',
    },
    {
      question: 'The wise leader and politician ________ assassinated.',
      options: ['are', 'has been', 'have been', 'have had been'],
      answer: 'has been',
    },
    {
      question: 'Neither of the paintings __________ sold.',
      options: [
        ' have been',
        'were',
        ' are',
        'was',
      ],
      answer: 'was',
    },
    {
      question: 'The news __________ not updated timely.',
      options: ['were', 'have', 'is', 'are'],
      answer: 'Mars',
    },
    {
      question: 'Which tense is used to express an action going at some point in the past?',
      options: [
        ' Past indefinite tense',
        ' Past perfect continuous tense',
        'Past continuous tense',
        'Past perfect continuous tense ',
      ],
      answer: 'Past continuous tense',
    },
    {
      question: 'The thief and the eye-witness _______.',
      options: ['has escaped', 'has been escaped', 'was escaping', 'have escaped'],
      answer: 'have escaped',
    },
  ];
  
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const backButton = document.getElementById('back'); // Add this line

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();