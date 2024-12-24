
import React from 'react';
import { BookOpenIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import ExamCard  from '@/Components/User/ExamCard';
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

const UserDashboard: React.FC<UserStatisticsProps> = ({ }) => {
    const { statistics, breadcrumb } = usePage().props;
    console.log(breadcrumb);

    const examCards = [
        {
            title: 'Enroll in an Exam',
            description: 'Number of exams you have enrolled and Attempts',
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
            url: 'dashboard/subjects'
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
    // const items = []

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <UserDashboardLayout>
                <section className='flex p-10'>
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

                <aside className="ml-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
                    <ul className="bg-white p-4 rounded-lg shadow-md">
                        <li className="border-b py-2 text-gray-600">Completed "Mathematics Test 1"</li>
                        <li className="border-b py-2 text-gray-600">Upcoming exam on "Science" scheduled for Nov 25th</li>
                        <li className="py-2 text-gray-600">New subject added: "History and Geography"</li>
                    </ul>
                </aside>
            </section>
            </UserDashboardLayout>
        </div>
    );
};

export default UserDashboard;
