import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClockIcon, CheckCircleIcon, XCircleIcon, PlayIcon, TrophyIcon } from '@heroicons/react/24/outline';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const { data: quiz, isLoading } = useQuery(
    ['quiz', id],
    async () => {
      const res = await axios.get(`/api/quizzes/${id}`);
      return res.data;
    }
  );

  const submitQuizMutation = useMutation(
    async (answers) => {
      const res = await axios.post(`/api/quizzes/${id}/submit`, { answers });
      return res.data;
    },
    {
      onSuccess: (data) => {
        setResults(data);
        setQuizCompleted(true);
        updateUser({ 
          ecoPoints: data.totalPoints, 
          level: data.newLevel,
          streak: data.streak 
        });
        toast.success(`Quiz completed! You earned ${data.pointsEarned} points! 🎉`);
      },
      onError: () => {
        toast.error('Failed to submit quiz');
      }
    }
  );

  useEffect(() => {
    if (quiz && quizStarted && !quizCompleted) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz, quizStarted, quizCompleted]);

  useEffect(() => {
    if (timeLeft > 0 && quizStarted && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.timeLimit * 60);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    const answerArray = quiz.questions.map((_, index) => answers[index] ?? -1);
    submitQuizMutation.mutate(answerArray);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'hard': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz not found</h1>
        <button onClick={() => navigate('/quizzes')} className="btn-primary">
          Back to Quizzes
        </button>
      </div>
    );
  }

  if (quizCompleted && results) {
    const getScoreEmoji = (score) => {
      if (score >= 90) return '🏆';
      if (score >= 80) return '🎉';
      if (score >= 70) return '👏';
      if (score >= 60) return '👍';
      return '💪';
    };

    const getScoreMessage = (score) => {
      if (score >= 90) return 'Outstanding! You\'re an eco-expert!';
      if (score >= 80) return 'Excellent work! Keep it up!';
      if (score >= 70) return 'Great job! You\'re learning well!';
      if (score >= 60) return 'Good effort! Keep practicing!';
      return 'Keep learning! You\'ll improve!';
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center mb-8 bg-gradient-to-br from-success-50 to-primary-50 border-success-200">
          <div className="text-8xl mb-6">{getScoreEmoji(results.score)}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Completed!
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            {getScoreMessage(results.score)}
          </p>
          <p className="text-lg text-gray-600 mb-8">
            You scored <span className="font-bold text-success-600">{results.score}%</span> and earned <span className="font-bold text-warning-600">{results.pointsEarned}</span> eco-points!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat-card bg-gradient-to-br from-success-400 to-success-600">
              <div className="text-3xl font-bold">{results.score}%</div>
              <div className="text-success-100 font-medium">Your Score</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-warning-400 to-warning-600">
              <div className="text-3xl font-bold">+{results.pointsEarned}</div>
              <div className="text-warning-100 font-medium">Points Earned</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-600">
              <div className="text-3xl font-bold">Level {results.newLevel}</div>
              <div className="text-purple-100 font-medium">Current Level</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/quizzes')}
              className="btn-primary flex items-center space-x-2"
            >
              <PlayIcon className="h-5 w-5" />
              <span>Take Another Quiz</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Results Review */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-3xl">📝</div>
            <h2 className="text-2xl font-bold text-gray-900">Review Your Answers</h2>
          </div>
          
          {results.results.map((result, index) => (
            <div key={index} className={`card ${result.isCorrect ? 'bg-success-50 border-success-200' : 'bg-danger-50 border-danger-200'}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {result.isCorrect ? (
                    <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-danger-500 rounded-full flex items-center justify-center">
                      <XCircleIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="font-bold text-gray-900">Question {index + 1}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${result.isCorrect ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'}`}>
                      {result.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 font-medium mb-3">{result.question}</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Your answer: </span>
                      <span className={result.isCorrect ? 'text-success-700' : 'text-danger-700'}>
                        {quiz.questions[index].options[result.userAnswer] || 'No answer selected'}
                      </span>
                    </div>
                    
                    {!result.isCorrect && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Correct answer: </span>
                        <span className="text-success-700 font-medium">
                          {quiz.questions[index].options[result.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {result.explanation && (
                    <div className="bg-white/50 p-4 rounded-2xl border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-lg">💡</div>
                        <span className="font-semibold text-gray-800">Explanation</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{result.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center bg-gradient-to-br from-primary-50 to-success-50 border-primary-200">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {quiz.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {quiz.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-600">
              <div className="text-3xl font-bold">{quiz.questions.length}</div>
              <div className="text-blue-100 font-medium">Questions</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-orange-400 to-orange-600">
              <div className="text-3xl font-bold">{quiz.timeLimit}</div>
              <div className="text-orange-100 font-medium">Minutes</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-success-400 to-success-600">
              <div className="text-3xl font-bold">{quiz.points}</div>
              <div className="text-success-100 font-medium">Max Points</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-600">
              <span className={`${getDifficultyColor(quiz.difficulty)} text-white bg-white/20`}>
                {quiz.difficulty}
              </span>
              <div className="text-purple-100 font-medium mt-2">Difficulty</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-8 text-gray-600">
            <ClockIcon className="h-5 w-5" />
            <span>You have {quiz.timeLimit} minutes to complete this quiz</span>
          </div>

          <button
            onClick={startQuiz}
            className="btn-primary text-xl px-10 py-4 flex items-center space-x-3 mx-auto"
          >
            <PlayIcon className="h-6 w-6" />
            <span>Start Quiz</span>
            <div className="text-2xl">🚀</div>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="card mb-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="text-xl sm:text-2xl">🧠</div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h1>
          </div>
          <div className="flex items-center space-x-2 bg-white px-3 sm:px-4 py-2 rounded-2xl shadow-soft">
            <ClockIcon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
            <span className={`font-bold text-sm sm:text-base ${timeLeft < 60 ? 'text-red-600' : 'text-orange-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 leading-relaxed">
          {currentQ.question}
        </h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`${
                answers[currentQuestion] === index
                  ? 'quiz-option-selected'
                  : 'quiz-option-default'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  answers[currentQuestion] === index
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === index && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-left font-medium leading-relaxed flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          ← Previous
        </button>
        
        <div className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-500 order-first sm:order-none">
          {quiz.questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentQuestion
                  ? 'bg-emerald-500'
                  : answers[index] !== undefined
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        
        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={submitQuizMutation.isLoading}
            className="btn-primary disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <TrophyIcon className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="text-sm sm:text-base">{submitQuizMutation.isLoading ? 'Submitting...' : 'Submit Quiz'}</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
            className="btn-primary w-full sm:w-auto"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizDetail;