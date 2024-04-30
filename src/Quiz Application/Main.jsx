import React, { useEffect, useState } from "react";
import { data } from "./data";

function Main() {
  const [showScore, setShowScore] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  function calculateScore() {
    let score = 0;
    for (let i = 0; i <= data.length -1; i++) {
      if (userAnswers[i] === String(data[i].answer)) {
        score++;
        console.log(userAnswers);
      }
    }
    console.log(score);
    return score;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (questionNumber === data.length - 1) {
        clearInterval(interval);
        calculateScore();
        setShowScore(true);
      } else {
        setQuestionNumber(questionNumber + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [questionNumber]);

  useEffect(() => {
    console.log("Selected Option: " + selectedOption);
    setUserAnswers([...userAnswers, String(data[questionNumber].answer)]);
  }, [selectedOption]);

  return (
    <>
      {showScore ? (
        <div id="score">
          <h3>
            scored{calculateScore()}
          </h3>
        </div>
      ) : (
        <div id="quiz">
          <h3>{data[questionNumber].question}</h3>
          <div className="options">
            {data[questionNumber].options.map((option, index) => {
              return (
                <label key={index}>
                  <input type="radio" name="opt"value={option} onClick={() => setSelectedOption(option)}/>
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default Main;