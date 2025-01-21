import { useState } from 'react';

type FlashMessageType = 'success' | 'error' | 'warning';

const useFlashMessage = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<FlashMessageType>('success');

  // Function to handle showing the flash message
  const handleShowFlash = (message: string, type: FlashMessageType) => {
    setMessage(message);
    setType(type);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // Hide after 3 seconds
  };

  return {
    visible,
    message,
    type,
    handleShowFlash,
  };
};

export default useFlashMessage;
