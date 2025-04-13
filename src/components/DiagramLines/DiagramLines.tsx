import React from 'react';
import './diagramLines.css';
import { 
  calculateGeometry, 
  calculatePaddings, 
  calculateGradientLine, 
  calculateDots, 
  calculateSizes 
} from '@utils/utils';

interface DiagramLinesProps {
  width: number;
  height: number;
}

const DiagramLines: React.FC<DiagramLinesProps> = ({ width, height }) => {
  const { centerX, centerY, minSize, circleRadius } = calculateGeometry(width, height);
  const { leftPadding, rightPadding } = calculatePaddings(width);
  const { gradientLineY, gradientLineHeight } = calculateGradientLine(height);
  const dots = calculateDots(centerX, centerY, circleRadius);
  const { lineStrokeWidth, gradientLineWidth, dotRadius } = calculateSizes(minSize);

  return (
    <svg
      width={width}
      height={height}
      className="diagram-lines"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="blueToRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3877EE" />
          <stop offset="100%" stopColor="#EF5DA8" />
        </linearGradient>
      </defs>

      <line
        className="diagram-line"
        x1={leftPadding}
        y1={centerY}
        x2={width - rightPadding}
        y2={centerY}
        strokeWidth={lineStrokeWidth}
      />

      <line
        className="diagram-line"
        x1={centerX}
        y1={0}
        x2={centerX}
        y2={height}
        strokeWidth={lineStrokeWidth}
      />

      <line
        className="diagram-line"
        x1={leftPadding}
        y1={0}
        x2={leftPadding}
        y2={height}
        strokeWidth={lineStrokeWidth}
      />

      <rect
        className="gradient-line"
        x={leftPadding - gradientLineWidth / 2}
        y={gradientLineY}
        width={gradientLineWidth}
        height={gradientLineHeight}
      />

      <line
        className="diagram-line"
        x1={width - rightPadding}
        y1={0}
        x2={width - rightPadding}
        y2={height}
        strokeWidth={lineStrokeWidth}
      />

      <circle
        className="diagram-circle"
        cx={centerX}
        cy={centerY}
        r={circleRadius}
        strokeWidth={lineStrokeWidth}
      />

      {dots.map((dot, index) => (
        <circle
          key={index}
          className="diagram-dot"
          cx={dot.x}
          cy={dot.y}
          r={dotRadius}
        />
      ))}
    </svg>
  );
};

export default DiagramLines;
