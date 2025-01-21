import React from 'react';

interface FlashProps {
  message: string;
  type: 'warning' | 'error' | 'success';
  visible: boolean;
  position?: 'bottom-right' | 'top-right'; // Optional prop to control position
}

const Flash: React.FC<FlashProps> = ({ message, type, visible, position = 'top-right' }) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-300';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return '';
    }
  };

  // Tailwind CSS classes for positioning based on the `position` prop
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <>
      {visible && (
        <div
          className={`fixed ${getPositionClasses()} mt-4 p-4 text-white rounded-md ${getColor()} transition-all duration-300 max-w-xs`}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Flash;
