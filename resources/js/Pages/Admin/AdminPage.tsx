import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function AdminPage({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin Page
                </h2>
            }
        >
            <Head title="Admin Page" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <p>This is the Admin Page</p>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );
}
