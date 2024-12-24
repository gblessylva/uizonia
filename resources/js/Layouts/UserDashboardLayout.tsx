import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Breadcrumb from '@/Components/User/BreadCrumb';

interface UserDashboardLayoutProps {
    children: React.ReactNode;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ children }) => {
    const { breadcrumb, auth } = usePage().props;
    return (
            <div className="bg-gray-100 min-h-screen p-10">
                <Breadcrumb items={breadcrumb}>
            </Breadcrumb>
                <header className="mb-10 flex justify-between items-center px-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Hello</h1>
                        <h1 className="text-3xl font-bold text-black-800">{auth.user.name}</h1>
                        <p className="text-gray-600 mt-1">What would you like to do today?</p>
                    </div>
                    <div>
                        <Link href="/dashboard/exams" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Enroll Now</Link>
                    </div>
                </header>
                {children}
            </div>
    );
};

export default UserDashboardLayout;
