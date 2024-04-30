import React, { useEffect, useState } from "react";
import { data } from "./data";
import "./App.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Main() {
  const [showScore, setShowScore] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [userAnswers, setUserAnswers] = useState(Array(data.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(5); 

  useEffect(() => {
    shuffleData();
  }, []);

  function shuffleData() {
    const shuffledData = shuffleArray(data);
    setQuestionNumber(0);
    setUserAnswers(Array(data.length).fill(''));
    setShowScore(false);
  }

  function calculateScore() {
    let score = 0;
    for (let i = 0; i < data.length -1; i++) {
      if (userAnswers[i] === data[i].answer) {
        score++;
      }
    }
    return score;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (questionNumber < data.length - 1) {
          setQuestionNumber(questionNumber + 1); 
          setTimeLeft(5); 
        } else {
          clearInterval(timer);
          setShowScore(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questionNumber]);

  function handleOptionSelect(option) {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionNumber] = option;
    setUserAnswers(updatedUserAnswers);
    setSelectedOption(option);
  }

  useEffect(() => {
    setSelectedOption('');
  }, [questionNumber]);

  return (
    <>
      <div className="timer">{timeLeft} seconds left</div>
      {showScore && (
        <div id="score">
          <h3>
            You have scored {calculateScore()} out of {data.length}
          </h3>
        </div>
      )}
      {!showScore && (
        <div id="quiz">
          <h3>{data[questionNumber].question}</h3>
          <div className="options">
            {data[questionNumber].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="opt"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Main;  