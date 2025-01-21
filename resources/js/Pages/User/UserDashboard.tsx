import React, { useState, useEffect } from 'react';
import { BookOpenIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import ExamCard from '@/Components/User/ExamCard';
import UserDashboardLayout from '@/Layouts/UserDashboardLayout';

interface Subject {
    id: number;
    name: string;
}

interface Exam {
    exam_id: number;
    exam_title: string;
    subject: string;
    score: number;
    attempts: number;
    max_score: number;
}

interface UserStatisticsProps {
    statistics: {
        subjects: Subject[];
        total_exams_enrolled: number;
        total_score: number;
        exams: Exam[];
    };
}

const UserDashboard: React.FC<UserStatisticsProps> = () => {
    const { statistics } = usePage().props;
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/v1/activities/recent', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Directly parse the response as an array
                const data = await response.json();
    
                // Check if the response is an array
                if (Array.isArray(data)) {
                    setActivities(data); // Set the activities state with the array
                } else {
                    console.error('Unexpected response format: Expected an array.', data);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
    
        fetchActivities();
    }, []);
    
    const examCards = [
        {
            title: 'Enroll in an Exam',
            description: 'Number of exams you have enrolled and attempts',
            icon: <CalendarIcon className="h-10 w-10" />,
            background: 'bg-gradient-to-r from-[#B54D20] to-[#DDAA5E]',
            url: 'dashboard/exams',
            stats: `${statistics.user_exam_count} / ${statistics.total_exams_enrolled}`,
        },
        {
            title: 'Subjects Overview',
            description: 'View all the subjects and progress',
            icon: <BookOpenIcon className="h-10 w-10" />,
            background: 'bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]',
            url: 'dashboard/subjects',
        },
        {
            title: 'My Results',
            description: 'View your previous exam results and scores',
            icon: <CheckCircleIcon className="h-10 w-10" />,
            background: 'bg-gradient-to-r from-[#83A6B2] to-[#9BA4BB]',
            url: 'dashboard/my-results',
            stats: `${statistics.total_score} / ${statistics.total_max}`,
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <UserDashboardLayout>
                <section className="flex flex-col md:flex-row p-0 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examCards.map((card, index) => (
                            <ExamCard
                                key={index}
                                title={card.title}
                                description={card.description}
                                icon={card.icon}
                                background={card.background}
                                url={card.url}
                                stats={card.stats}
                            />
                        ))}
                    </div>

                    <aside className="ml-0 md:ml-8 mt-10 md:mt-0">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
                        <ul className="bg-white p-4 rounded-lg shadow-md">
                            {activities.length > 0 ? (
                                activities.map((activity, index) => (
                                    <li
                                        key={index}
                                        className="border-b py-2 text-gray-600"
                                    >
                                        {activity.description}
                                    </li>
                                ))
                            ) : (
                                <li className="py-2 text-gray-600">No recent activities found.</li>
                            )}
                        </ul>
                    </aside>
                </section>
            </UserDashboardLayout>
        </div>
    );
};

export default UserDashboard;
