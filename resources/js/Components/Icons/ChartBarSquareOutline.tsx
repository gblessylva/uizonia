import React from 'react';

interface SvgProps {
  className?: string;
  size?: number;
  color?: string;
}

const ChartBarSquareOutline: React.FC<SvgProps> = ({ className = '', size = 24, color = 'currentColor' }) => {
  return (
    // <div className="flex justify-center"> 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${size} ${size}`} // Adjust viewBox based on size
      strokeWidth={1}
      stroke={color}
      className={`animate-svg ${className}`} // Add an animation class
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
      />
    </svg>
    // </div>
  );
};

export default ChartBarSquareOutline;
