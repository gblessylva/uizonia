import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Subject {
    id: number;
    name: string;
}

interface SubjectIndexProps {
    subjects: Subject[];
}

export default function SubjectIndex({ subjects }: SubjectIndexProps) {
    return (
        <AuthenticatedLayout
           
        >
            <Head title="All Subjects" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-6">All Subjects</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {subjects.map((subject, index) => (
                                    <tr
                                        key={subject.id}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {subject.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {subject.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm space-x-2">
                                            <Link
                                                href={`/subjects/${subject.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/subjects/${subject.id}/edit`}
                                                className="text-yellow-500 hover:text-yellow-700"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(subject.id)
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this subject?')) {
            // Replace with your Inertia.js delete action
            console.log(`Delete subject with ID ${id}`);
        }
    }
}
