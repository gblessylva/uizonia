import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-white relative text-gray-800 h-screen flex overflow-hidden items-center">


            <div className="container mx-auto px-6 md:px-12 flex flex-col h-full md:flex-row items-center">
                {/* Left Content */}
                <div className="md:w-1/2 text-center flex flex-col justify-center h-full md:text-left mb-10 md:mb-0">
                    <h1 className="text-4xl mb-8 md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500">
                        Master Your Exams with Confidence!
                    </h1>
                    <p className="mt-4 text-lg  mb-6 text-gray-600">
                        Identify your strengths, overcome your weaknesses, and achieve your academic goals with personalized mock exams.
                    </p>
                    <div className="mt-6">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
                            Take Your First Mock Exam
                        </button>
                    </div>
                    <div className='flex md:flex-row justify-left items-center mt-10 '>
                        <div className="relative w-34 h-34 flex justify-left items-center">
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={`assets/images/stack/image-${index + 1}.png`} // Replace with the paths to your images
                                    alt={`Stacked Image ${index + 1}`}
                                    className="w-14 h-14 rounded-full border-4 border-white shadow-md transform transition-transform hover:scale-105"
                                    style={{
                                        position: 'relative',
                                        left: `${index * -10}%`,
                                        zIndex: 5 - index
                                    }}
                                />
                            ))}
                        </div>
                        <p>Over 2 Million Registered Students in Nigeria.</p>
                    </div>

                </div>


                {/* Right Image */}
                <div className="md:w-1/2 flex justify-between items-center">
                    <div className="w-1/2 relative z-10">   
                        <img
                            src="assets/images/hero/Profile.png" // Replace with the path to your image
                            alt="Students studying and analyzing results"
                            className="h-[350px] w-full object-contain max-w-md md:max-w-lg drop-shadow-2xl mb-8 animate-moving_position_animation"
                            style={{ marginLeft: "-50px", borderRadius: "50px" }}
                        />
                        <img
                            src="assets/images/hero/basic.png" // Replace with the path to your image
                            alt="Students studying and analyzing results"
                            className="h-[200px] w-full object-contain max-w-md md:max-w-lg drop-shadow-2xl animate-moving_object"
                            style={{ borderRadius: "50px", animationDelay: "4s" }}
                        />
                    </div>

                    <div className="w-1/2 relative z-10">
                        <img
                            src="assets/images/hero/share.png" // Replace with the path to your image
                            alt="Students studying and analyzing results"
                            className="w-1/2 max-w-md md:max-w-lg drop-shadow-2xl mb-8 animate-moving_object	"
                            style={{ marginLeft: "-50px", borderRadius: "20px" }}
                        />
                        <img
                            src="assets/images/hero/Courses.png" // Replace with the path to your image
                            alt="Students studying and analyzing results"
                            className="w-1/2 max-w-md md:max-w-lg drop-shadow-2xl animate-moving_position_animation"
                            style={{ borderRadius: "20px", animationDelay: "7s" }}
                        />

                    </div>

                </div>
            </div>

            {/* Overlay */}
            <div className="absolute -right-20 w-1/2">
                {/* Backround image */}
                <img
                    src="assets/images/bg.png" // Replace with the path to your image
                    alt="BG Image"
                    className="w-full h-full object-contain object-center"

                />

            </div>
        </section>
    );
};

export default HeroSection;
