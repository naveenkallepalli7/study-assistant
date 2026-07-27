import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

export default function QuizSection({ quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]); // tracks correct/incorrect per question
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersLog((prev) => [...prev, { questionIndex: currentQuestionIndex, selected: selectedOption, correct: isCorrect }]);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);

    if (currentQuestionIndex + 1 < quiz.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    setQuizCompleted(false);
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-obsidian-800 bg-obsidian-900/30 p-6 backdrop-blur-xl md:p-8 animate-scale-in mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan via-accent-violet to-accent-fuchsia text-white shadow-md shadow-accent-cyan/10">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight md:text-2xl">
            Topic Knowledge Quiz
          </h2>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25 px-2.5 py-1 rounded-full">
          {quizCompleted ? 'Completed' : `Question ${currentQuestionIndex + 1} of ${quiz.length}`}
        </div>
      </div>

      {!quizCompleted ? (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="rounded-xl border border-obsidian-800 bg-obsidian-950/40 p-5 md:p-6 text-left">
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === currentQuestion.answer;
              
              let optionStyle = 'border-obsidian-800 bg-obsidian-900/40 text-obsidian-200 hover:border-obsidian-750 hover:bg-obsidian-900/60';
              let Icon = null;

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'border-green-500/30 bg-green-500/10 text-green-300 font-medium';
                  Icon = <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />;
                } else if (isSelected) {
                  optionStyle = 'border-red-500/30 bg-red-500/10 text-red-300';
                  Icon = <XCircle className="h-5 w-5 shrink-0 text-red-400" />;
                } else {
                  optionStyle = 'border-obsidian-850 bg-obsidian-900/20 text-obsidian-500 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-accent-cyan bg-accent-cyan/10 text-white font-medium ring-1 ring-accent-cyan/50';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={`flex items-center justify-between w-full rounded-xl border p-4 text-left text-sm md:text-base transition-all ${optionStyle} ${
                    !isSubmitted ? 'cursor-pointer active:scale-[0.995]' : 'cursor-default'
                  }`}
                  disabled={isSubmitted}
                >
                  <span className="leading-relaxed pr-4">{option}</span>
                  {Icon}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                className={`flex items-center space-x-2 rounded-xl bg-accent-cyan hover:bg-accent-cyan/95 px-6 py-3 text-sm md:text-base font-bold text-white shadow-md shadow-accent-cyan/10 transition-all ${
                  selectedOption === null
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:scale-[1.01] active:scale-[0.99]'
                }`}
                disabled={selectedOption === null}
              >
                <span>Submit Answer</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-6 py-3 text-sm md:text-base font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] hover:brightness-110"
              >
                <span>{currentQuestionIndex + 1 === quiz.length ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="py-6 flex flex-col items-center text-center space-y-6 animate-scale-in">
          {/* Trophy badge */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-obsidian-950 shadow-xl shadow-yellow-500/20">
            <Award className="h-10 w-10 animate-bounce" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
            <p className="text-obsidian-450 mt-1 text-sm md:text-base">
              Here is how you performed on this study guide.
            </p>
          </div>

          {/* Score Circle Card */}
          <div className="rounded-2xl border border-obsidian-800 bg-obsidian-950/60 p-6 w-full max-w-sm flex items-center justify-between">
            <div className="text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-obsidian-400">Your Score</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {score} / {quiz.length}
              </div>
              <span className="text-xs font-medium text-accent-cyan">
                {Math.round((score / quiz.length) * 100)}% accuracy
              </span>
            </div>
            
            <div className="text-right text-xs font-mono text-obsidian-400 space-y-1">
              <div>Correct: <span className="text-green-400 font-bold">{score}</span></div>
              <div>Incorrect: <span className="text-red-400 font-bold">{quiz.length - score}</span></div>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="w-full text-left space-y-3 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-obsidian-400 px-1">Review Log</span>
            <div className="space-y-2">
              {quiz.map((q, index) => {
                const log = answersLog.find(l => l.questionIndex === index);
                const isLogCorrect = log?.correct;

                return (
                  <div 
                    key={index} 
                    className={`rounded-xl border p-4 text-xs md:text-sm flex items-start space-x-3 ${
                      isLogCorrect 
                        ? 'border-green-500/20 bg-green-500/5 text-green-300/80' 
                        : 'border-red-500/20 bg-red-500/5 text-red-300/80'
                    }`}
                  >
                    {isLogCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-white leading-relaxed">{q.question}</p>
                      <p className="mt-1">
                        Your answer: <span className={isLogCorrect ? 'text-green-300 font-medium' : 'text-red-300 font-medium'}>{log?.selected}</span>
                      </p>
                      {!isLogCorrect && (
                        <p className="text-emerald-400/90 font-medium mt-0.5">Correct answer: {q.answer}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retake Action Button */}
          <button
            type="button"
            onClick={handleResetQuiz}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-fuchsia px-6 py-3.5 text-sm md:text-base font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-accent-violet/20 hover:brightness-110 active:scale-[0.99] mt-4"
          >
            <RefreshCw className="h-4.5 w-4.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
