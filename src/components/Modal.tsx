// SimpleModal.tsx
import React from 'react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-gray-700 p-4 md:p-6 rounded-lg max-w-lg w-full m-4">
        <button onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-xl font-semibold z-50"
          aria-label="Kapat"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default SimpleModal;
