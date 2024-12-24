import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react'; // Ensure this is imported correctly
import QuestionComponent from '@/Components/User/QuestionComponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';

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
interface User {
    id: number;
    exam_ids: number[];
}

export default function QuestionsDetailPage({ exam }: PageProps) {
    const [userScores, setUserScores] = useState<Record<number, number>>({}); // Track the scores for each question
    const [startedAt, setStartedAt] = useState<string | null>(null);
    const [completedAt, setCompletedAt] = useState<string | null>(null);
    const { questions } = exam;

    const { auth } = usePage().props as { auth: { user: User } };
    const userHasAccess = auth.user.exam_ids.includes(exam.id);
    const hasQuestions = questions.length > 0;

    console.log('my user', hasQuestions);
    // Calculate total score and max score dynamically based on userScores and questions
    const totalScore = Object.values(userScores).reduce((acc, score) => acc + score, 0);
    const maxScore = questions.reduce((acc, question) => acc + question.score, 0);

    // Use Inertia's useForm hook to manage form state
    const { post, data, setData } = useForm({
        exam_id: exam.id,
        user_score: totalScore, // Initialize user_score
        max_score: maxScore,
        completed_at: null,
        started_at: null,    // Initialize max_score
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
                // completed_at: now,
            }));

            return updatedScores; // Return the updated user scores
        });
    };

    // Set the `started_at` time when the component is loaded
    useEffect(() => {
        const now = new Date().toISOString();
        setStartedAt(now); // Save locally for use in submission
        setData('started_at', now); // Update the form data
    }, []);

    // Handle form submission
    const handleSubmit = () => {
        // const totalScore = Object.values(userScores).reduce((acc, score) => acc + score, 0);
        const now = new Date().toISOString();
        // setData('completed_at', now); // Ensure completed_at is set

        // setData('completed_at', now);
        setData((prevData) => ({
            ...prevData,
            completed_at: now, // Set the completed_at timestamp
        }));

        setTimeout(() => {
            console.log('Form data being submitted:', data); // Log the form data before submitting

            // Post the form data using Inertia
            post(route('exam.saveScore'), {
                onSuccess: () => {
                    console.log('Exam score submitted successfully!');
                    alert('Score submitted successfully!');
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('There was an issue saving your score. Please try again.');
                },
            });

        }, 0);

    };

    return (
        <AuthenticatedLayout>
            {userHasAccess ? (
                hasQuestions ? (
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
                    </div>) : (
                    <div className="min-h-screen bg-gray-200 p-6">
                        <div className="text-center text-red-600 mt-8">
                            <h3 className="text-xl font-semibold">No Questions Available</h3>
                            <p className='mb-8'>Oops, no questions yet for this exam .</p>
                        </div>
                    </div>
                )

            ) : (
                <div className="min-h-screen bg-gray-200 p-6">
                    <div className="text-center text-red-600 mt-8">
                        <h3 className="text-xl font-semibold">Access Denied</h3>
                        <p className='mb-8'>You do not have access to this exam.</p>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
