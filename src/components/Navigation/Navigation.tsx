import React from 'react';

import { type Theme } from '@utils/index';

import './navigation.css';

interface NavigationProps {
  selectedTheme: Theme | null;
  onPrev: () => void;
  onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ selectedTheme, onPrev, onNext }) => {
  return (
    <div className="navigation">
      <div className="counter">
        {selectedTheme ? String(selectedTheme.id).padStart(2, '0') : '01'}/
        <span className="total">06</span>
      </div>
      <div className="controls">
        <button className="nav-button" onClick={onPrev} aria-label="Previous theme">
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.49988 13.0001L2.99988 7.00006L8.49988 1.00006"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button className="nav-button" onClick={onNext} aria-label="Next theme">
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.50012 13.0001L7.00012 7.00006L1.50012 1.00006"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
