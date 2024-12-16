import React from 'react';
import { Link } from '@inertiajs/react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <nav className="p-4">
                    {/* Exams Section */}
                    <div className="mb-4">
                        <h3 className="text-gray-400 text-sm uppercase mb-2">Exams</h3>
                        <ul>
                            <li>
                                <a
                                    href="/dashboard/admin/exams"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    All Exams
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/admin/exams/create"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Add Exam
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Subjects Section */}
                    <div>
                        <h3 className="text-gray-400 text-sm uppercase mb-2">Subjects</h3>
                        <ul>
                            <li>
                                <a
                                    href="/dashboard/admin/subjects"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    All Subjects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/admin/subjects/create"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Add Subject
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm uppercase mb-2">Organizers</h3>
                        <ul>
                            <li>
                                <a
                                    href="/dashboard/admin/organizers"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    All Organizers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/admin/organizers/create"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Add Organizer
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* This is Questions section  */}
                    <div>
                        <h3 className="text-gray-400 text-sm uppercase mb-2">Questions </h3>
                        <ul>
                            <li>
                                <a
                                    href="/dashboard/admin/questions"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    View Questions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/admin/question/create"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Add New Question
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-400 text-sm uppercase mb-2">Exam Years</h3>
                        <ul>
                            <li>
                                <a
                                    href="/dashboard/admin/exam-years"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    View Exam Years
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/dashboard/admin/exam-years/create"
                                    className="block py-2 px-4 rounded hover:bg-gray-700"
                                >
                                    Add Exam Year
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow py-12 px-6 bg-gray-100">
                {children} 
            </main>
        </div>
    );
};

export default AdminLayout;
