import React, { useState, useEffect, useRef } from 'react';

import { themes, type Theme } from '@utils/index';

import DiagramLines from '../DiagramLines';
import Title from '../Title';
import Navigation from '../Navigation';

import './timeline.css';

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handlePrevTheme = () => {
    const currentIndex = themes.findIndex((t) => t.id === selectedTheme?.id);
    const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
    setSelectedTheme(themes[prevIndex]);
  };

  const handleNextTheme = () => {
    const currentIndex = themes.findIndex((t) => t.id === selectedTheme?.id);
    const nextIndex = (currentIndex + 1) % themes.length;
    setSelectedTheme(themes[nextIndex]);
  };

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="background-rectangle"></div>
      <Title />
      <Navigation selectedTheme={selectedTheme} onPrev={handlePrevTheme} onNext={handleNextTheme} />
      {dimensions.width > 0 && dimensions.height > 0 && (
        <DiagramLines
          width={dimensions.width}
          height={dimensions.height}
          selectedTheme={selectedTheme}
          onThemeSelect={handleThemeSelect}
        />
      )}
    </div>
  );
};

export default Timeline;
