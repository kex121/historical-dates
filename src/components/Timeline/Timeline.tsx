import React, { useState, useEffect, useRef } from 'react';

import DiagramLines from '../DiagramLines';
import Title from '../Title';

import './timeline.css';

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  return (
    <div className='timeline-container' ref={containerRef}>
      <div className='background-rectangle'></div>
      <Title />
      
      {dimensions.width > 0 && dimensions.height > 0 && (
        <DiagramLines width={dimensions.width} height={dimensions.height} />
      )}
    </div>
  );
};

export default Timeline;
