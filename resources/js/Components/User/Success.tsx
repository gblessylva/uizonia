interface SuccessComponentProps {
    score: {
        totalScore: number;
        maxScore: number;
        correctAnswers: number;
        totalQuestions: number;
    };
}

const SuccessComponent: React.FC<SuccessComponentProps> = ({ score }) => {
    const { maxScore, totalQuestions } = score;
    const scores = localStorage.getItem('userScores');
    const userScores: { [key: string]: number } = scores ? JSON.parse(scores) : {};

    const totalScore = Object.values(userScores).reduce((acc, score) => acc + score, 0);
    console.log(totalScore);

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
            <p className="text-gray-700 text-lg mb-6">
                You have successfully completed the exam. Here's your result summary:
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                    <p className="font-semibold text-gray-600">Total Questions:</p>
                    <p className="text-xl">{totalQuestions}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Total Score:</p>
                    <p className="text-xl">{totalScore}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Maximum Score:</p>
                    <p className="text-xl">{maxScore}</p>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-gray-700 text-md">
                    Well done! Keep practicing to improve your skills.
                </p>
                <button
                    onClick={() => (window.location.href = '/dashboard')}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    View All Results
                </button>
            </div>
        </div>
    );
};

export default SuccessComponent;
