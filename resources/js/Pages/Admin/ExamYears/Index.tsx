import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface ExamYear {
    id: number;
    name: string;
    year: string;
}

interface ExamYearIndexProps {
    examYears: ExamYear[];
}

export default function ExamYearIndex({ examYears }: ExamYearIndexProps) {
    return (
        <AuthenticatedLayout>
            <Head title="All Exam Years" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-6">All Exam Years</h1>

                    {/* Check if the examYears array is empty */}
                    {examYears.length === 0 ? (
                        <p className="text-center text-lg text-gray-500">No exam years available</p>
                    ) : (
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
                                            Year
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Description
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
                                    {examYears.map((year, index) => (
                                        <tr
                                            key={year.id}
                                            className={
                                                index % 2 === 0
                                                    ? 'bg-white'
                                                    : 'bg-gray-50'
                                            }
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {year.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {year.year}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {year.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm space-x-2">
                                                <Link
                                                    href={`/examYears/${year.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/examYears/${year.id}/edit`}
                                                    className="text-yellow-500 hover:text-yellow-700"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(year.id)
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
                    )}
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this year?')) {
            // Replace with your Inertia.js delete action
            console.log(`Delete year with ID ${id}`);
        }
    }
}
