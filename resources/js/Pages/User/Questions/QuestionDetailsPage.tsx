import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react'; // Ensure this is imported correctly
import QuestionComponent from '@/Components/User/QuestionComponent';

interface Exam {
    id: number;
    title: string;
    subject: string;
    organizer: string;
    year: number;
    type: string;
    duration: number;
    questions_count: number;
    questions: Array<{
        id: number;
        title: string;
        options: string[];
        correct_answer: string;
        score: number;
    }>;
}

interface PageProps {
    exam: Exam;
}

export default function QuestionsDetailPage({ exam }: PageProps) {
    const [userScores, setUserScores] = useState<Record<number, number>>({}); // Track the scores for each question
    const { questions } = exam;

   // Calculate total score and max score dynamically based on userScores and questions
   const totalScore = Object.values(userScores).reduce((acc, score) => acc + score, 0);
   const maxScore = questions.reduce((acc, question) => acc + question.score, 0);

   // Use Inertia's useForm hook to manage form state
   const { post, data, setData } = useForm({
       exam_id: exam.id,
       user_score: totalScore, // Initialize user_score
       max_score: maxScore,    // Initialize max_score
       scores: questions.map((question) => ({
           question_id: question.id,
           score: userScores[question.id] || 0, // Default to 0 if no score for this question
       })),
   });
    // Function to update individual question's score
    const updateUserScores = (questionId: number, score: number) => {
        setUserScores((prevScores) => {
            const updatedScores = {
                ...prevScores,
                [questionId]: score,
            };

            // Recalculate total score whenever userScores changes
            const newTotalScore = Object.values(updatedScores).reduce((acc, score) => acc + score, 0);

            // Dynamically update form data using setData
            setData((prevData) => ({
                ...prevData,
                user_score: newTotalScore, // Update the user_score
                scores: questions.map((question) => ({
                    question_id: question.id,
                    score: updatedScores[question.id] || 0, // Update scores dynamically
                })),
            }));

            return updatedScores; // Return the updated user scores
        });
    };



    // Handle form submission
    const handleSubmit = () => {
        const totalScore = Object.values(userScores).reduce((acc, score) => acc + score, 0);

        // console.log('Total score:', totalScore);
        // console.log('User Data score:', userScores);
        console.log('data is', data);

        post(route('exam.saveScore'), {

            onSuccess: () => {
                console.log(data);
                alert('Score submitted successfully!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('There was an issue saving your score. Please try again.');
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{exam.title}</h1>
                <p className="text-gray-600 mb-4"><strong>Number of Questions:</strong> {exam.questions_count}</p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>
                <QuestionComponent
                    updateUserScores={updateUserScores}
                    questions={questions}
                    onSubmit={handleSubmit} // Pass handleSubmit to child
                />
            </div>
        </div>
    );
}
