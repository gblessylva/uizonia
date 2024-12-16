import React from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/solid';

const exams = [
  {
    id: 1,
    name: 'Mathematics Final',
    date: '2024-03-25',
    time: '09:00 AM',
    students: 45,
    status: 'Upcoming',
  },
  {
    id: 2,
    name: 'Physics Midterm',
    date: '2024-03-28',
    time: '10:30 AM',
    students: 38,
    status: 'Upcoming',
  },
  {
    id: 3,
    name: 'Chemistry Quiz',
    date: '2024-03-22',
    time: '02:00 PM',
    students: 42,
    status: 'Completed',
  },
];

export default function ExamList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {exams.map((exam) => (
              <li key={exam.id} className="py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{exam.name}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1.5 h-4 w-4" />
                        {exam.date}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="mr-1.5 h-4 w-4" />
                        {exam.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {exam.students} Students
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        exam.status === 'Upcoming'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}