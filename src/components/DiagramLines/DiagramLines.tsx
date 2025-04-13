import React from 'react';

interface DiagramLinesProps {
  width: number;
  height: number;
}

const DiagramLines: React.FC<DiagramLinesProps> = ({ width, height }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  const circleRadius = 265;
  
  const leftPadding = 320;
  const rightPadding = 160;
  
  return (
    <svg 
      width={width} 
      height={height} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none' 
      }}
    >
      <line 
        x1={leftPadding} 
        y1={centerY} 
        x2={width - rightPadding} 
        y2={centerY} 
        stroke="#42567A" 
        strokeWidth="1" 
        opacity="0.1" 
      />
      
      <line 
        x1={centerX} 
        y1="0" 
        x2={centerX} 
        y2={height} 
        stroke="#42567A" 
        strokeWidth="1" 
        opacity="0.1" 
      />
      
      <line 
        x1={leftPadding} 
        y1="0" 
        x2={leftPadding} 
        y2={height} 
        stroke="#42567A" 
        strokeWidth="1" 
        opacity="0.1" 
      />
      
      <line 
        x1={width - rightPadding} 
        y1="0" 
        x2={width - rightPadding} 
        y2={height} 
        stroke="#42567A" 
        strokeWidth="1" 
        opacity="0.1" 
      />
      
      <circle 
        cx={centerX} 
        cy={centerY} 
        r={circleRadius} 
        fill="none" 
        stroke="#42567A" 
        strokeWidth="1" 
        opacity="0.2" 
      />
    </svg>
  );
};

export default DiagramLines; 