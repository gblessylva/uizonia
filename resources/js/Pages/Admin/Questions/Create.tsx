import AdminLayout from '@/Layouts/AdminLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState, useEffect } from 'react';
import DynamicInputs from '@/Components/DynamicInputs';

interface Exam {
    id: number;
    title: string;
}

export default function CreateQuestion() {
    const { data, setData, post, errors } = useForm({
        exam_id: '',
        question_text: '',
        correct_answer: '',
        score: '',
        options: '',
    });

    const [query, setQuery] = useState('');
    const [exams, setExams] = useState<Exam[]>([]);
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
    const [options, setOptions] = useState<string[]>([]); // State to track options

    // Fetch exams from the database
    useEffect(() => {
        async function fetchExams() {
            const response = await fetch('/api/v1/exams'); // Replace with your API endpoint
            const data = await response.json();
            setExams(data);
        }
        fetchExams();
    }, []);

    const filteredExams =
        query === ''
            ? exams
            : exams.filter((exam) =>
                  exam.title.toLowerCase().includes(query.toLowerCase())
              );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post('/question');
    };

    const handleOptionsChange = (updatedOptions: string[]) => {
        setOptions(updatedOptions);  // Update local options state
        setData('options', updatedOptions);  // Update form data with new options
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Question" />

            <AdminLayout>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold">Create a New Question</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Exam Combobox */}
                        <div>
                            <label htmlFor="exam" className="block text-sm font-medium text-gray-700">
                                Exam
                            </label>
                            <Combobox
                                value={selectedExam}
                                onChange={(exam) => {
                                    setSelectedExam(exam);
                                    setData('exam_id', exam.id);
                                }}
                            >
                                <div className="relative mt-1">
                                    <ComboboxInput
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(event) => setQuery(event.target.value)}
                                        displayValue={(exam: Exam) => exam?.title || ''}
                                    />
                                    <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {filteredExams.length === 0 ? (
                                            <div className="px-4 py-2 text-gray-700">No exams found.</div>
                                        ) : (
                                            filteredExams.map((exam) => (
                                                <ComboboxOption
                                                    key={exam.id}
                                                    value={exam}
                                                    className={({ active }) =>
                                                        `cursor-default select-none relative px-4 py-2 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                                                    }
                                                >
                                                    {exam.title}
                                                </ComboboxOption>
                                            ))
                                        )}
                                    </ComboboxOptions>
                                </div>
                            </Combobox>
                            {errors.exam_id && <div className="text-red-500 text-sm mt-1">{errors.exam_id}</div>}
                        </div>

                        {/* Question Text */}
                        <div>
                            <label htmlFor="question_text" className="block text-sm font-medium text-gray-700">
                                Question Text
                            </label>
                            <textarea
                                id="question_text"
                                value={data.question_text}
                                onChange={(e) => setData('question_text', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.question_text && <div className="text-red-500 text-sm mt-1">{errors.question_text}</div>}
                        </div>

                        {/* Dynamic Options */}
                        {/* <DynamicInputs options={data.options} onChange={(updatedOptions) => setOptions(updatedOptions)} /> */}
                        <DynamicInputs options={data.options} onChange={handleOptionsChange} />
        
                        {/* Correct Answer - Select Dropdown */}
                        <div>
                            <label htmlFor="correct_answer" className="block text-sm font-medium text-gray-700">
                                Correct Answer
                            </label>
                            <select
                                id="correct_answer"
                                value={data.correct_answer}
                                onChange={(e) => setData('correct_answer', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Correct Answer</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {index + 1} - {option}
                                    </option>
                                ))}
                            </select>
                            {errors.correct_answer && <div className="text-red-500 text-sm mt-1">{errors.correct_answer}</div>}
                        </div>

                        {/* Score */}
                        <div>
                            <label htmlFor="score" className="block text-sm font-medium text-gray-700">
                                Score
                            </label>
                            <input
                                id="score"
                                type="number"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {errors.score && <div className="text-red-500 text-sm mt-1">{errors.score}</div>}
                        </div>

                        <div>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                Create Question
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AuthenticatedLayout>
    );
}
