import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, get, update } from 'firebase/database';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Ensure correct import syntax

  const [question, setQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: '',
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizRef = ref(database, `quizzes/${id}`);
      try {
        const snapshot = await get(quizRef);
        if (snapshot.exists()) {
          setQuestion(snapshot.val());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleQuestionChange = (field, value) => {
    setQuestion({ ...question, [field]: value });
  };

  const handleOptionChange = (oIndex, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[oIndex] = value;
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizRef = ref(database, `quizzes/${id}`);
    try {
      await update(quizRef, question);
      alert('Question updated successfully!');
      navigate(`/quiz/${id}`); // Use navigate for programmatic navigation
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('Error updating question: ' + error.message);
    }
  };

  return (
    <div className="edit-quiz mt-24 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Quiz Question</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-gray-700">Question:</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange('question', e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
          />
        </div>
        {question.options.map((option, oIndex) => (
          <div key={oIndex}>
            <label className="block text-gray-700">{`Option ${oIndex + 1}:`}</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(oIndex, e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-700">Correct Option:</label>
          <input
            type="text"
            value={question.correctOption}
            onChange={(e) => handleQuestionChange('correctOption', e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;