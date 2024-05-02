import React from 'react';
import './ErrorPopup.css';

interface ErrorPopupProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ errorMessage, onClose }) => {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <h3>Error</h3>
        <p>{errorMessage}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ErrorPopup;