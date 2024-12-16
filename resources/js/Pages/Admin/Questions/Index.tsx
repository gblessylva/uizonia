import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ActionButton from '@/Components/ActionButton';

interface Question {
    id: number;
    exam: {
        title: string;
    };
    question_text: string;
    correct_answer: string;
    score: number;
    options: string[];
}

interface QuestionsTableProps {
    questions: Question[];
}

export default function QuestionsTable({ questions }: QuestionsTableProps) {
    return (
        <AuthenticatedLayout>
            <Head title="All Questions" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold">All Questions</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Exam
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Question
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Correct Answer
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Options
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {questions.map((question, index) => (
                                    <tr
                                        key={question.id}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.exam.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.question_text}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.correct_answer}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.score}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.options?.join(', ') || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <ActionButton
                                                actions={[
                                                    {
                                                        href: `/questions/${question.id}`,
                                                        label: 'View',
                                                    },
                                                    {
                                                        href: `/questions/${question.id}/edit`,
                                                        label: 'Edit',
                                                    },
                                                    {
                                                        href: `/questions/${question.id}`,
                                                        method: 'delete',
                                                        label: 'Delete',
                                                    },
                                                ]}
                                            />
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
}
