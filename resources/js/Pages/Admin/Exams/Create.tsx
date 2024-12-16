import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Option {
    id: number;
    name: string;
}

interface ExamCreateProps {
    subjects: Option[];
    organizers: Option[];
    years: number[];
}

export default function ExamCreate({ subjects, organizers, years }: ExamCreateProps) {
    const { data, setData, post, errors } = useForm({
        subject_id: '',
        organizer_id: '',
        year: '',
        type: '',
        duration: '',
        title: '',
    });

    // Update title dynamically based on selected values
    useEffect(() => {
        if (data.subject_id && data.organizer_id && data.year && data.type) {
            const selectedSubject = subjects.find((s) => s.id === Number(data.subject_id));
            const selectedOrganizer = organizers.find((o) => o.id === Number(data.organizer_id));

            setData(
                'title',
                `${data.year} ${selectedOrganizer?.name} ${selectedSubject?.name} ${data.type}`
            );
        }
    }, [data.subject_id, data.organizer_id, data.year, data.type]);

    const handleSubmit = (e: React.FormEvent) => {
        console.log(data);
        e.preventDefault();
        post('/dashboard/admin/exams'); // Adjust endpoint as necessary
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Exam" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold">Add New Exam</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="subject_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Subject
                            </label>
                            <select
                                id="subject_id"
                                value={data.subject_id}
                                onChange={(e) => setData('subject_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subject_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.subject_id}</div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="organizer_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Organizer
                            </label>
                            <select
                                id="organizer_id"
                                value={data.organizer_id}
                                onChange={(e) => setData('organizer_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Organizer</option>
                                {organizers.map((organizer) => (
                                    <option key={organizer.id} value={organizer.id}>
                                        {organizer.name}
                                    </option>
                                ))}
                            </select>
                            {errors.organizer_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.organizer_id}</div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="year"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Year
                            </label>
                            <select
                                id="year"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            {errors.year && (
                                <div className="text-red-500 text-sm mt-1">{errors.year}</div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Type
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Type</option>
                                <option value="essay">Essay</option>
                                <option value="objective">Objective</option>
                                <option value="subjective">Subjective</option>
                            </select>
                            {errors.type && (
                                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Duration (Minutes)
                            </label>
                            <input
                                id="duration"
                                type="number"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.duration && (
                                <div className="text-red-500 text-sm mt-1">{errors.duration}</div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
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
