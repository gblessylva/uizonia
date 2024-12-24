interface ExamCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    background: string;
    url: string;
    stats?: ''
}

const ExamCard: React.FC<ExamCardProps> = ({ title, description, icon, background, url, stats }) => {
    // console.log(props);
    return (
        <a href={url} className={`rounded-lg p-6 flex flex-col items-top shadow-md text-gray-200 ${background}`}>

            <div>
                <h3 className="text-2xl font-semibold mb-1">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
            </div>
            <div className="text-8xl mr-4 mt-8 flex justify-center items-center">
                {stats}
            </div>
        </a>
    );
};
export default ExamCard;