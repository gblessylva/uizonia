import React from 'react';

interface SvgProps {
    className?: string;
    size?: number;
    color?: string;
}

const DesktopOutline: React.FC<SvgProps> = ({ className = '', size = 24, color = 'currentColor' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox={`0 0 ${size} ${size}`} // Adjust viewBox based on size
            strokeWidth={1}
            stroke={color}
            className={`animate-svg ${className}`} // Add an animation class
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>

    );
};

export default DesktopOutline;
