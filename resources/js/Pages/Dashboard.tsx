import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserDashboard from './User/UserDashboard';


export default function Dashboard() {
    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />
            <UserDashboard>
                
            </UserDashboard>
        </AuthenticatedLayout>
    );
}
