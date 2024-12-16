import React, { useState } from 'react';

interface Question {
    id: number;
    title: string;
    options: string[];
    correct_answer: string;
    score: number;
}

interface QuestionComponentProps {
    questions: Question[];
    updateUserScores: (questionId: number, score: number) => void;
    onSubmit: () => void; // Handle form submission in the parent
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ questions, updateUserScores, onSubmit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

    const currentQuestion = questions[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionChange = (option: string) => {
        // Update the selected answer
        setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: option });

        // Calculate score based on whether the answer is correct
        const isCorrect = option === currentQuestion.correct_answer;
        const score = isCorrect ? currentQuestion.score : 0;
        console.log(score);

        // Update the parent state with the new score for this question
        updateUserScores(currentQuestion.id, score);
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
                {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </h3>
            <p className="text-gray-800 mb-4">{currentQuestion.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                    <label key={index} className="cursor-pointer">
                        <input
                            type="radio"
                            name={`question_${currentQuestion.id}`}
                            value={option}
                            checked={selectedAnswers[currentQuestion.id] === option}
                            onChange={() => handleOptionChange(option)}
                            className="hidden"
                        />
                        <div
                            className={`p-3 rounded-lg border text-center shadow-sm transition-all ${selectedAnswers[currentQuestion.id] === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {option}
                        </div>
                    </label>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                {currentQuestionIndex > 0 && (
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Previous
                    </button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={onSubmit} // Call the parent submit function
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionComponent;
