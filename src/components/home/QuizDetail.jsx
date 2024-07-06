import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';

const QuizDetail = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
  
    useEffect(() => {
      const quizRef = ref(database, `quizzes/${id}`);
      get(quizRef).then((snapshot) => {
        if (snapshot.exists()) {
          setQuiz(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, [id]);
  
    if (!quiz) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="quiz-detail mt-24 p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-800">{quiz.question}</h2>
        <ul className="pl-5 mt-2 list-disc space-y-1">
          {quiz.options.map((option, index) => (
            <li key={index} className="text-gray-700">{option}</li>
          ))}
        </ul>
        <p className="mt-3 text-green-700 font-medium">Correct Answer: {quiz.correctOption}</p>
      </div>
    );
  };
  
  export default QuizDetail;