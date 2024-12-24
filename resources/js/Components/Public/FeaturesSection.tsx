import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import "aos/dist/aos.css";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import { Bars2Icon } from "@heroicons/react/16/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import ChartBarSquareOutline from "../Icons/ChartBarSquareOutline";
import DesktopOutline from "../Icons/DesktopOutline";
import ClipBoardOutline from "../Icons/ClipBoardOutline";
import CheckOutline from "../Icons/CheckOutline";

export default function FeaturesSection() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <section className="relative overflow-hidden bg-white text-purple-800 py-16 px-6 lg:px-20">
            {/* /Centered flex div */}
            <div className="flex flex-col items-center justify-center">
                <img
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="3000"
                    src="assets/images/device-feature.png" />
            </div>
            {/* Rotating image Backround */}
            <div className="absolute -left-20 w-1/2 animate-my_move">
                <img
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    src="assets/images/section-bg.png" // Replace with the path to your image
                    alt="BG Image"
                    className="w-full h-full object-contain object-center"
                />
            </div>

            <div className="container bg-gray-50 mx-auto text-center shadow-xl rounded-lg p-12 relative z-10">
                {/* Heading */}
                <h2
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="text-4xl font-bold mb-8">
                    We’re Your <span className="text-yellow-800">Ultimate Study Sidekick</span>
                </h2>
                <p
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="text-lg mb-12 px-16">
                    Level up your learning game with a platform that’s built to understand you. Say goodbye to boring study routines and hello to smarter, faster, and more fun ways to ace your exams. Here’s why we’re the perfect choice:
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="1500"

                        className="flex flex-col mt-20 items-center text-center bg-white rounded-lg p-6 shadow-lg hover:scale-105 transform transition duration-300">
                        <DesktopOutline
                            className="text-yellow-800 -mt-20" size={50} />
                        <h3 className="text-2xl font-semibold mb-2">Personalized Feedback: Learn Smarter, Not Harder</h3>
                        <p className="text-sm text-gray-800">
                            Get in-depth insights into your performance with our personalized feedback system.
                            Identify your strengths and weaknesses.
                            Ace your exams with our tailored recommendations.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="1500"
                        className="flex flex-col items-center mt-20  text-center bg-white rounded-lg p-6 shadow-lg hover:scale-105 transform transition duration-300">
                        <ClipBoardOutline
                            className="text-yellow-800 -mt-20" size={50} />
                        <h3 className="text-2xl font-semibold mb-2">Comprehensive Coverage: All Subjects in One Place</h3>
                        <p className="text-sm text-gray-800">
                            From SS1 to SS3, we’ve got you covered.
                            From Mathematics to English, we’ve got all your subjects in one place.
                            From JAMB to WAEC, we’ve got all your exams in one place.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="1500"
                        className="flex flex-col items-center text-center bg-white mt-20 rounded-lg p-6 shadow-lg hover:scale-105 transform transition duration-300">
                        <ChartBarSquareOutline
                            className="text-yellow-800 -mt-20 text-center" size={50} />
                        <h3 className="text-2xl font-semibold mb-2">Progress Tracking: See Your Growth Over Time</h3>
                        <p className="text-sm text-gray-800">
                            Easily See how you are progressin over time with our easy to understand charts.
                            No let down surprises on exam day.
                        </p>



                    </div>

                    {/* Feature 4 */}
                    <div
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="1500"
                        className="flex flex-col mt-20 items-center text-center bg-white rounded-lg p-6 shadow-lg hover:scale-105 transform transition duration-300">
                            <CheckOutline
                            className="text-yellow-800 -mt-20 text-center" size={50} />
                        <h3 className="text-2xl font-semibold mb-2">All Your Past Questions: Quality You Can Trust</h3>
                        <p className="text-sm text-gray-800">
                            Practice with confidence, knowing you’re working with high-quality, relevant material tailored to your academic needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
