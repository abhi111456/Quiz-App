// QuizList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, onValue, remove  } from 'firebase/database';
const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizzesRef = ref(database, 'quizzes');
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      const quizList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setQuizzes(quizList);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      remove(ref(database, `quizzes/${id}`))
        .then(() => {
          alert('Quiz deleted successfully!');
          const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
          setQuizzes(updatedQuizzes);
        })
        .catch((error) => {
          alert('Error deleting quiz: ' + error);
        });
    }
  };

  return (
    <div className="quiz-list mt-24 p-8 max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-800">List of Quiz Questions</h2>
      {quizzes.length > 0 ? (
        <div>
          <ul className="space-y-6">
            {quizzes.map(quiz => (
              <li key={quiz.id} className="border-b pb-4 border-blue-200">
                <Link to={`/quiz/${quiz.id}`} className="block text-xl text-white bg-green-500 text-center hover:bg-green-700 transition-colors duration-300 border-2 border-green-500 p-1 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  {quiz.question}
                </Link>
                <div className="mt-2 flex items-center space-x-4">
                  <Link to={`/edit/${quiz.id}`} className="text-xl text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-300 border-2 border-sky-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">Edit</Link>
                  <button onClick={() => handleDelete(quiz.id)} className=" text-xl bg-red-400 text-green hover:text-red-700 transition-colors duration-300 border-2  p-2 rounded-lg shadow-md hover:shadow-lg ">Delete</button>
                </div>
                <ul className="pl-5 mt-2 list-disc space-y-1">
                  {quiz.options.map((option, index) => (
                    <li key={index} className="text-gray-700">{option}</li>
                  ))}
                </ul>
                <p className="mt-3 text-green-700 font-medium">Correct Answer: {quiz.correctOption}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No questions available</p>
      )}
    </div>
  );
};

export default QuizList;