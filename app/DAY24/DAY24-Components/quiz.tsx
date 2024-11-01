
'use client'

import { useState, useEffect } from 'react'
import { Question, itQuestions } from './questions' 

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  useEffect(() => {
    setQuestions(itQuestions)
    selectRandomQuestions(itQuestions)
  }, [])

  const selectRandomQuestions = (allQuestions: Question[]) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    setCurrentQuestions(shuffled.slice(0, 10))
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowScore(false)
  }

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestionIndex + 1
    if (nextQuestion < currentQuestions.length) {
      setCurrentQuestionIndex(nextQuestion)
    } else {
      setShowScore(true)
    }
    setSelectedAnswer(null)
  }

  const restartQuiz = () => {
    selectRandomQuestions(questions)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">IT Quiz</h1>
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              Your score: {score} out of {currentQuestions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">{currentQuestions[currentQuestionIndex]?.question}</h2>
            <div className="space-y-3">
              {currentQuestions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="mt-6 w-full bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
