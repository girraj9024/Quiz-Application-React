import React, { useState, useEffect } from 'react';
// import { data } from "./data";
import "./App.css";

const questions = [
  // {
  //   question: "Which monument is this?",
  //   options: ["Hawa Mahal", "Albert Hall", "Jantar Mantar", "Amber Fort"],
  //   answer: "Hawa Mahal",
  //   image: "https://www.holidify.com/images/cmsuploads/compressed/h4_20170822181427.PNG"
  // },
  // {
  //   question: "Capital of France",
  //   options: ["Paris", "Marseille", "Lyon", "Toulouse"],
  //   answer: "Paris",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVoQJvfQufxs_MaY172KyVWtUFs4gbOZmezY0S_hclQ&s"
  // },
  // {
  //   question: "When was National Cinema Day?",
  //   options: ["October 13", "November 13", "December 13", "January 13"],
  //   answer: "October 13",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQenkaP77Dp7rNgB8eDGYuE50KIaItys90EeBiZ39ll-A&s"
  // },
  // {
  //   question: "Which country has this flag?",
  //   options: ["China", "USA", "India", "Japan"],
  //   answer: "India",
  //   image: "https://wallpapers.com/images/featured/indian-flag-yqfmermanpgsw0jm.jpg"
  // },
  {
    question: "What is Kedarnath?",
    answer: `src="src/Quiz Application/kedarnat dham.jpg"`,
    options: [
      <img src="src/Quiz Application/kedarnat dham.jpg" alt="Kedarnath"/>,
      <img src="https://imgs.search.brave.com/btOf2cQske-VMuPNOlCgIebbCAVCgiJrzk_KLBBAaKg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2hhcmRoYW0tcGls/Z3JpbWFnZS10b3Vy/LmNvbS9hc3NldHMv/aW1hZ2VzL2NoYW5k/aWdhcmgtY2hhcmRo/YW0ud2VicA" alt="Badrinath"/>,
      <img src="https://imgs.search.brave.com/FyzUTZbKA2ikZiCmr_Bbp7h1UjTgcefEl-y6fhsgfWI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY2/MTU5Nzc1NS9waG90/by9ldmVuaW5nLWlt/YWdlLW9mLWEtbGln/aHQtaG91c2Utb24t/c2VhLXNob3JlLXdp/dGgtbmljZS1ibHVl/LXNreS1iYWNrZ3Jv/dW5kLWluLWR3YXJr/YS1ndWpyYXQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXp2/N0UtWU9hY0FqSFJy/UlJvaWlib2pvbmFM/dEltSEgtWmZhd1RY/eG44d1k9" alt="Dwarka"/>,
      <img src="https://imgs.search.brave.com/eoDDSXUGAW_tD64cpg7qDy3qiq6DjCeVpCT-KqWaW9E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ1/NzM3MzAxMi9waG90/by9pbWFnZS1vZi1p/bmRpYW4tdGVtcGxl/LWluLXJhbWVzaHdh/cmFtLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1oWTJoQzZZ/c1B5MXRyVmd5a3FN/c2tuMkdGTGEzTzln/dlBzNVJvSUJ1cGpv/PQ" alt="Rameswaram"/>,
    ],
  }
];

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userName, setUserName] = useState(''); // State to store user's name

  useEffect(() => {
    if (currentQuestion !== null && currentQuestion < questions.length) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            handleNextQuestion();
            return 5;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (currentQuestion === questions.length) {
      setIsQuizCompleted(true);
    }
  }, [currentQuestion]);

  // useEffect(() => {
  //   const dateTime = new Date().toLocaleString()
  //   localStorage.setItem('quizScore', JSON.stringify({ userName, score, dateTime })); // Save user name and score to local storage
  // }, [score]);

  const handleStartQuiz = () => {
    if(userName === ""){
      alert("enter name")
    }
    else{
      setCurrentQuestion(0);
      setIsQuizStarted(true);
    }
  };
  saveToLocalStorage()

  function saveToLocalStorage(){
    const quizData = {
      name: userName,
      score: score,
    dateTime : new Date().toLocaleString()


    }
    localStorage.setItem('quizScore', JSON.stringify({quizData }))
  }

  const handleOptionSelect = option => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(5);
  };

  return (
    <div className="quiz">
      <h1>Quiz Application</h1>
      {!isQuizStarted && !isQuizCompleted && (
        <div>
          <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className='names' />
          <button onClick={handleStartQuiz} className='start'>Start Quiz</button>
        </div>
      )}
      {isQuizStarted && currentQuestion !== null && currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          {questions[currentQuestion].image && (
            <img src={questions[currentQuestion].image} alt="Question" style={{ maxWidth: '20%' }} />
          )}
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : isQuizCompleted && (
        <div className='inpmain'>
          <h2>Quiz completed!</h2>
          <p>Hi {userName}! Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Main;