import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import {
  calculateGeometry,
  calculatePaddings,
  calculateDots,
  themes,
  type Theme,
  type Dot,
} from '@utils/index';

import './diagramLines.css';

interface DiagramLinesProps {
  width: number;
  height: number;
  selectedTheme: Theme | null;
  onThemeSelect: (theme: Theme) => void;
}

const DiagramLines: React.FC<DiagramLinesProps> = ({
  width,
  height,
  selectedTheme,
  onThemeSelect,
}) => {
  const { centerX, centerY, minSize, circleRadius } = calculateGeometry(width, height);
  const { leftPadding, rightPadding } = calculatePaddings(width);

  const gradientLineY = height * 0.17;
  const gradientLineHeight = Math.min(height * 0.14, 180);

  const dots = calculateDots(centerX, centerY, circleRadius);

  const lineStrokeWidth = Math.min(Math.max(minSize * 0.001, 0.5), 1.5);
  const gradientLineWidth = Math.min(Math.max(minSize * 0.003, 3), 5);
  const dotRadius = Math.min(Math.max(minSize * 0.004, 3), 6);
  const selectedDotRadius = Math.min(Math.max(minSize * 0.012, 18), 30);

  const [hoveredDotId, setHoveredDotId] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const circlesRefs = useRef<(SVGCircleElement | null)[]>([]);
  const textsRefs = useRef<(SVGTextElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);

  const animateDot = (index: number, isSelected: boolean, isHovered: boolean) => {
    const circle = circlesRefs.current[index];
    const text = textsRefs.current[index];

    if (circle) {
      gsap.to(circle, {
        r:
          isSelected || isHovered
            ? isSelected
              ? selectedDotRadius
              : selectedDotRadius * 0.9
            : dotRadius,
        fill: isSelected || isHovered ? '#F4F5F9' : '#42567A',
        stroke: isSelected || isHovered ? 'rgba(48, 62, 88, 0.5)' : 'transparent',
        strokeWidth: isSelected || isHovered ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (text) {
      gsap.to(text, {
        opacity: isSelected || isHovered ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const updateAllDots = () => {
    dots.forEach((_, index) => {
      const dotId = index + 1;
      const isSelected = selectedTheme?.id === dotId;
      const isHovered = hoveredDotId === dotId;
      animateDot(index, isSelected, isHovered);
    });
  };

  useEffect(() => {
    if (!selectedTheme) return;
    setHoveredDotId(null);

    const newRotation = (6 - selectedTheme.id) * 60;
    updateAllDots();

    const tl = gsap.timeline();
    tl.to(
      { value: rotation },
      {
        value: newRotation,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: function () {
          setRotation(this.targets()[0].value);
        },
        onComplete: () => {
          gsap.to(labelRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        },
      },
    );

    gsap.set(labelRef.current, { opacity: 0 });

    return () => {
      tl.kill();
      gsap.killTweensOf(labelRef.current);
    };
  }, [selectedTheme]);

  useEffect(() => {
    updateAllDots();
  }, [hoveredDotId]);

  const rotatePoint = (dot: Dot, angle: number): { x: number; y: number } => {
    const angleRad = (angle * Math.PI) / 180;
    const dx = dot.x - centerX;
    const dy = dot.y - centerY;

    return {
      x: centerX + dx * Math.cos(angleRad) - dy * Math.sin(angleRad),
      y: centerY + dx * Math.sin(angleRad) + dy * Math.cos(angleRad),
    };
  };

  const getLabelPosition = () => {
    if (!selectedTheme) return { x: 0, y: 0 };

    const selectedDotIndex = selectedTheme.id - 1;
    const dot = dots[selectedDotIndex];

    const rotatedPoint = rotatePoint(dot, rotation);

    const labelOffset = selectedDotRadius * 2;

    return {
      x: rotatedPoint.x + labelOffset,
      y: rotatedPoint.y - labelOffset * 1.5,
    };
  };

  const labelPosition = selectedTheme ? getLabelPosition() : { x: 0, y: 0 };

  return (
    <svg
      ref={svgRef}
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

      {dots.map((dot: Dot, index: number) => {
        const dotId = index + 1;
        const isSelected = selectedTheme?.id === dotId;
        const isHovered = hoveredDotId === dotId;

        const rotatedPoint = rotatePoint(dot, rotation);

        return (
          <g key={dotId}>
            <circle
              ref={(el) => (circlesRefs.current[index] = el)}
              className={isSelected ? 'diagram-dot-selected' : 'diagram-dot clickable'}
              cx={rotatedPoint.x}
              cy={rotatedPoint.y}
              r={isSelected || isHovered ? selectedDotRadius : dotRadius}
              fill={isSelected || isHovered ? '#F4F5F9' : '#42567A'}
              stroke={isSelected || isHovered ? 'rgba(48, 62, 88, 0.5)' : 'transparent'}
              strokeWidth={isSelected || isHovered ? '1' : '0'}
              style={{
                transition:
                  'r 0.3s ease-out, fill 0.3s ease-out, stroke 0.3s ease-out, stroke-width 0.3s ease-out',
              }}
              onClick={() =>
                !isSelected && onThemeSelect(themes.find((theme: Theme) => theme.id === dotId)!)
              }
              onMouseEnter={() => !isSelected && setHoveredDotId(dotId)}
              onMouseLeave={() => !isSelected && setHoveredDotId(null)}
            />

            <text
              ref={(el) => (textsRefs.current[index] = el)}
              x={rotatedPoint.x}
              y={rotatedPoint.y}
              className="diagram-dot-number"
            >
              {dotId}
            </text>
          </g>
        );
      })}

      <foreignObject x={labelPosition.x} y={labelPosition.y} width="200" height="60">
        <div ref={labelRef} className="theme-label-container">
          {selectedTheme?.name}
        </div>
      </foreignObject>
    </svg>
  );
};

export default DiagramLines;
