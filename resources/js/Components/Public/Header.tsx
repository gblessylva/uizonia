import React, { useState } from 'react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
const HeaderSection: React.FC <{ auth: { user: any } }> = ({ auth }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = ( ) => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                {/* Logo */}
                <div className="text-3xl font-extrabold tracking-tight hover:scale-105 transform transition-transform">
                    uIzonia
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-10">
                    <a href="#features" className="text-lg font-medium hover:text-gray-400 transition-colors">Features</a>
                    <a href="#pricing" className="text-lg font-medium hover:text-gray-400 transition-colors">Pricing</a>
                    <a href="#testimonials" className="text-lg font-medium hover:text-gray-400 transition-colors">Testimonials</a>
                    <a href="#contact" className="text-lg font-medium hover:text-gray-400 transition-colors">Contact</a>
                </nav>

                {/* Action Buttons */}
                {auth.user ? (
                    <div className="flex items-center space-x-4">
                        <Link 
                            href={route('dashboard')}
                            className="text-lg font-medium hover:text-gray-400 transition-colors">Dashboard</Link>
                       
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link 
                           href={route('login')}
                           className="text-lg font-medium hover:text-gray-400 transition-colors">Login</Link>
                        <Link 
                            href={route('register')}
                            className="bg-gray-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transform transition-transform">
                            Get Started
                        </Link>
                    </div>
                )}
                

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button 
                        className="text-white focus:outline-none" 
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 text-white shadow-lg">
                    <nav className="flex flex-col space-y-4 p-4">
                        <a href="#features" className="text-lg font-medium hover:text-gray-400 transition-colors">Features</a>
                        <a href="#pricing" className="text-lg font-medium hover:text-gray-400 transition-colors">Pricing</a>
                        <a href="#testimonials" className="text-lg font-medium hover:text-gray-400 transition-colors">Testimonials</a>
                        <a href="#contact" className="text-lg font-medium hover:text-gray-400 transition-colors">Contact</a>
                        <a href="#login" className="text-sm font-semibold hover:text-gray-400 transition-colors">Login</a>
                        <button className="bg-gray-700 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-600 hover:scale-105 transform transition-transform">
                            Get Started
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default HeaderSection;
