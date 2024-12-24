import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import UserDashboard from './User/UserDashboard';


export default function Dashboard() {
    return (
        <AuthenticatedLayout
        >
            <Head title={`User Dashboard for ${usePage().props.auth.user.name}`} />
            <UserDashboard statistics={{
                subjects: [],
                total_exams_enrolled: 0,
                total_score: 0,
                exams: []
            }}>
                
            </UserDashboard>
        </AuthenticatedLayout>
    );
}
