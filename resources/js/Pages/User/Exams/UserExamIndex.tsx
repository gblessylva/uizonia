import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';


interface Exam {
    id: number;
    title: string;
    subject: { name: string };
    year: number;
    type: string;
    organizer: string,
    duration: number;
    questions_count: number;
}

interface ExamIndexProps {
    exams: Exam[];
    enrolledExamIds: number[];
}


export default function UserExamIndex({ exams, enrolledExamIds }: ExamIndexProps) {

    const user = usePage().props.auth.user;
    const { flash } = usePage().props


    // Handle enroll exam
    const handleEnroll = (examId: number) => {
        router.post('exams/enroll/', { user_id: user.id, exam_id: examId });

    };

    // Handle view exam
    const handleView = (examId: number) => {
        router.visit(`/dashboard/exams/${examId}`);
    };

    return (
        <AuthenticatedLayout>   
            <div className="bg-gray-100 min-h-screen p-10">
            <UserDashboardLayout> 
                <div className="min-h-screen bg-gray-100 p-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Exams</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                        <div
                            key={exam.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">{exam.title}</h2>
                            <p className="text-gray-600 mb-1"><strong>Subject:</strong> {exam.subject.name}</p>
                            <p className="text-gray-600 mb-1"><strong>Organizer:</strong> {exam.organizer}</p>
                            <p className="text-gray-600 mb-1"><strong>Year:</strong> {exam.year}</p>
                            <p className="text-gray-600 mb-1"><strong>Type:</strong> {exam.type}</p>
                            <p className="text-gray-600"><strong>Duration:</strong> {exam.duration} minutes</p>
                            <div className="flex justify-between mt-4">
                                {!enrolledExamIds.includes(exam.id) && (
                                    <button
                                        onClick={() => handleEnroll(exam.id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                                    >
                                        Enroll
                                    </button>
                                )}
                                {null}
                                <button
                                    onClick={() => handleView(exam.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </UserDashboardLayout>
            </div>
            </AuthenticatedLayout>  
        

    );
};

