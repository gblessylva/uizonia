import React from "react";
import NewsletterBox from "./Newsletter";
const Footer: React.FC = () => {
    return (
        <footer
            className="relative bg-gray-200 text-gray-900 py-20"
            // style={{ height: "100vh" }} // Full height
        >
            {/* Left Parallax Background */}
            <div
                className="absolute inset-y-0 w-1/2 bg-fixed"
                style={{
                    left: "-300px", 
                }}
            >
                <img src="assets/images/bg.png" className="w-full" alt=""
                 style={{ 
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "left",

                 }} 
                />
            </div>
            <NewsletterBox />
            {/* Content Area */}
            <div className="container mx-auto h-full flex flex-col justify-center px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Logo, Email, Social Media */}
                    <div>
                        <img
                            src="assets/images/logo.jpg"
                            alt="App Logo"
                            className="mb-4 h-12"
                        />
                        <p className="mb-2">
                            Email:{" "}
                            <a
                                href="mailto:support@example.com"
                                className="text-yellow-900 hover:text-gray-200"
                            >
                                support@example.coms
                            </a>
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {/* Social Media Icons */}
                            <a href="#" className="hover:text-white">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.56v15.28a4.56 4.56 0 0 1-4.56 4.56H4.56A4.56 4.56 0 0 1 0 19.84V4.56A4.56 4.56 0 0 1 4.56 0h14.88A4.56 4.56 0 0 1 24 4.56ZM7.91 19.66h2.96v-8.78H7.91v8.78Zm1.48-10.1a1.7 1.7 0 1 0 0-3.41 1.7 1.7 0 0 0 0 3.41Zm11.25 10.1h2.95v-4.8c0-2.37-1.1-3.47-2.77-3.47a2.43 2.43 0 0 0-2.3 1.64h-.03v-1.42h-2.96v8.78h2.96v-4.85c0-1.28.98-2.32 2.25-2.32s2.28 1.04 2.28 2.32v4.85ZM12 12.37v7.3H9.05v-7.3H12Z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.54 0H2.46A2.46 2.46 0 0 0 0 2.46v19.08A2.46 2.46 0 0 0 2.46 24h19.08A2.46 2.46 0 0 0 24 21.54V2.46A2.46 2.46 0 0 0 21.54 0Zm-7.26 12h-2.52v8h-3.1v-8H6.63V9.84h2.53V8.22c0-2.46 1.27-3.79 3.8-3.79h2.07v2.3h-1.57c-.75 0-1.23.48-1.23 1.23v1.88h2.8L14.28 12Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Useful Links */}
                    <div>
                        <h2 className="text-purple-800 text-lg font-bold mb-4">Useful Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Help & Support */}
                    <div>
                        <h2 className="text-purple-800 text-lg font-bold mb-4">Help & Support</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    Customer Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-purple-800">
                                    Feedback
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: App Store Links */}
                    <div>
                        <h2 className="text-purple-800 text-lg font-bold mb-4">Get Our App</h2>
                        <div>
                            <a href="#">
                                <img
                                    src="/path/to/playstore.png"
                                    alt="Play Store"
                                    className="mb-4 h-12"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="/path/to/appstore.png"
                                    alt="App Store"
                                    className="h-12"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-900 mt-8 text-sm">
                    &copy; 2024 UiZonia. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
