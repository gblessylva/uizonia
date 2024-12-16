// Exam Year and Subjects CRUD Implementation

// React Typescript Component for Online Exam UserDashboard
import React from 'react';
import { BookOpenIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';

interface ExamCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    background: string;
    url: string;
}

const ExamCard: React.FC<ExamCardProps> = ({ title, description, icon, background, url }) => {
    return (
        <a href={url} className={`rounded-lg p-6 flex items-top shadow-md text-gray-200 ${background}`}>
           
            <div>
                <h3 className="text-2xl font-semibold mb-1">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
            </div> 
            {/* <div className="text-4xl mr-4">
                {icon}
            </div> */}
        </a>
    );
};

const UserDashboard: React.FC = () => {
    const user = usePage().props.auth.user;
    const examCards = [
        {
            title: 'Enroll in an Exam',
            description: 'Select an exam to enroll now',
            icon: <CalendarIcon className="h-10 w-10" />,
            background: 'bg-gradient-to-r from-[#B54D20] to-[#DDAA5E]',
            url: 'dashboard/exams'
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
             url: 'dashboard/my-results'

        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            <header className="mb-6 flex justify-between items-center px-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Hello</h1>
                    <h1 className="text-3xl font-bold text-black-800">{user.name}</h1>
                    <p className="text-gray-600 mt-1">What would you like to do today?</p>
                </div>
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Enroll Now</button>
                </div>
            </header>
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
        </div>
    );
};

export default UserDashboard;
