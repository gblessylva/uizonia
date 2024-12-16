import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Organizer {
    id: number;
    logo: string; // Assume a URL to the logo image
    name: string;
    description: string;
}

interface OrganizerIndexProps {
    organizers: Organizer[];
}

export default function OrganizerIndex({ organizers }: OrganizerIndexProps) {
    return (
        <AuthenticatedLayout
           
        >
            <Head title="All Organizers" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-6">All Organizers</h1>
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
                                        Logo
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
                                {organizers.map((organizer, index) => (
                                    <tr
                                        key={organizer.id}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {organizer.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <img
                                                src={organizer.logo}
                                                alt={`${organizer.name} Logo`}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {organizer.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {organizer.description}
                                        </td>
                                        <td className="px-6 py-4 text-sm space-x-2">
                                            <Link
                                                href={`/organizers/${organizer.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/organizers/${organizer.id}/edit`}
                                                className="text-yellow-500 hover:text-yellow-700"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(organizer.id)
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
        if (confirm('Are you sure you want to delete this organizer?')) {
            // Replace with your Inertia.js delete action
            console.log(`Delete organizer with ID ${id}`);
        }
    }
}
