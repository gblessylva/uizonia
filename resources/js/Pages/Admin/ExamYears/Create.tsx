import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Input } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';

export default function ExamYearCreate() {
    const { data, setData, post, errors } = useForm({
        year: '', // Added a field for the exam year
        name: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);

        post('/dashboard/admin/exam-years'); // Update the URL to match your route
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Exam Year
                </h2>
            }
        >
            <Head title="Add Exam Year" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold">Add New Exam Year</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="year"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Year
                            </label>
                            <input
                                id="year"
                                type="number"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter the year (e.g., 1991)"
                            />
                            {errors.year && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.year}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Enter a name"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );
}
