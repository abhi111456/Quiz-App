// QuizDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const quizzesRef = ref(database, 'quizzes');
    get(quizzesRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setQuizzes(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  useEffect(() => {
    if (!isQuizCompleted) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      if (timeLeft === 0) {
        clearInterval(timerId);
        setIsQuizCompleted(true);
        setShowResults(true);
      }

      return () => clearInterval(timerId);
    }
  }, [timeLeft, isQuizCompleted]);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuizIndex] = answer;
    setSelectedAnswers(updatedAnswers);

    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1); 
    } else {
      setIsQuizCompleted(true);
      setShowResults(true); 
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  useEffect(() => {
    if (isQuizCompleted) {
      let correctAnswers = 0;
      quizzes.forEach((quiz, index) => {
        if (selectedAnswers[index] === quiz.correctOption) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
    }
  }, [isQuizCompleted, quizzes, selectedAnswers]);

  if (!quizzes.length) {
    return <p>Loading...</p>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  const optionClass = (option) => {
    if (showResults) {
      return option === currentQuiz.correctOption ? 'bg-green-100' : 
             selectedAnswers[currentQuizIndex] === option && option !== currentQuiz.correctOption ? 'bg-red-100' : '';
    } else if (selectedAnswers[currentQuizIndex] === option) { 
      return 'bg-blue-100'; 
    } else {
      return '';
    }
  };

  return (
    <div className="quiz-detail mt-24 p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Quiz: {currentQuizIndex + 1} / {quizzes.length}</h2>

      <div className="timer">
        <p className="text-center text-gray-600">Time Left: {timeLeft} seconds</p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Question:</h3>
      <p>{currentQuiz.question}</p>

      <ul className="pl-5 mt-2 list-disc space-y-1">
        {currentQuiz.options.map((option, index) => (
          <li 
            key={index} 
            className={`p-2 rounded-md cursor-pointer flex items-center ${optionClass(option)}`} 
            onClick={() => handleAnswerSelect(option)}
          >
            <input 
              type="radio" 
              checked={selectedAnswers[currentQuizIndex] === option} 
              onChange={() => {}} 
              className="mr-2" 
            /> 
            {option} 
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrevQuestion} 
          disabled={currentQuizIndex === 0} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2 disabled:opacity-50"
        >
          <IoIosArrowBack size={20} /> Prev
        </button>
        <button 
          onClick={handleNextQuestion} 
          disabled={currentQuizIndex === quizzes.length - 1} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2 disabled:opacity-50"
        >
          Next <IoIosArrowForward size={20} />
        </button>
      </div>

      {showResults && (
        <div className="result mt-4 p-4 border border-gray-200 rounded-lg"> 
          <h3 className="text-lg font-semibold">Results:</h3>
          <p className="text-green-500">Your Score: {score} out of {quizzes.length}</p>
          <div className="mt-4">
            {quizzes.map((quiz, index) => (
              <div key={index} className="mb-2">
                <p>Question {index + 1}: {quiz.question}</p>
                <p>Your Answer: {selectedAnswers[index] || 'Not Answered'}</p>
                <p className={`text-${selectedAnswers[index] === quiz.correctOption ? 'green' : 'red'}-500`}>
                  {selectedAnswers[index] === quiz.correctOption ? 'Correct' : 'Incorrect'}
                </p>
                <p>Correct Answer: {quiz.correctOption}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDetail;