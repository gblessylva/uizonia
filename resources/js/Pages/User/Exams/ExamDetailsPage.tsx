import React from 'react';
import { router, usePage } from '@inertiajs/react';

interface Exam {
  id: number;
  title: string;
  subject: string;
  organizer: string;
  year: number;
  type: string;
  duration: number;
  questions_count: number;
}

interface PageProps {
  exam: Exam;
  enrolledExamIds: number[];
}

export default function ExamDetail({ exam, enrolledExamIds }: PageProps) {
  const isEnrolled = enrolledExamIds.includes(exam.id);


  const handleEnroll = () => {
    router.post('/exams/enroll', { exam_id: exam.id });
  };
  const handleStartExam = () => {
    // Redirect or perform actions to start the exam
    router.get(`/dashboard/exams/${exam.id}/questions`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{exam.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Subject:</strong> {exam.subject}</p>
        <p className="text-gray-600 mb-2"><strong>Organizer:</strong> {exam.organizer}</p>
        <p className="text-gray-600 mb-2"><strong>Year:</strong> {exam.year}</p>
        <p className="text-gray-600 mb-2"><strong>Type:</strong> {exam.type}</p>
        <p className="text-gray-600 mb-2"><strong>Duration:</strong> {exam.duration} minutes</p>
        <p className="text-gray-600 mb-4"><strong>Number of Questions:</strong> {exam.questions_count}</p>



        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>
        {isEnrolled ? (
          <button
            onClick={handleStartExam}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start Exam
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Enroll in Exam
          </button>
        )}
      </div>
    </div>
  );
};

