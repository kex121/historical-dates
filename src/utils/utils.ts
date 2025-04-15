export const calculateGeometry = (width: number, height: number) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const minSize = Math.min(width, height);
  const circleRadius = Math.min(minSize * 0.25, 400);
  
  return { centerX, centerY, minSize, circleRadius };
};

export const calculatePaddings = (width: number) => {
  const leftPadding = width * 0.22;
  const rightPadding = width * 0.11;
  
  return { leftPadding, rightPadding };
};

export const calculateGradientLine = (height: number) => {
  const gradientLineY = height * 0.17;
  const gradientLineHeight = Math.min(height * 0.14, 180);
  
  return { gradientLineY, gradientLineHeight };
};

export const calculateDots = (centerX: number, centerY: number, circleRadius: number) => {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 6;
    return {
      x: centerX + circleRadius * Math.cos(angle),
      y: centerY + circleRadius * Math.sin(angle)
    };
  });
};

export const calculateSizes = (minSize: number) => {
  const lineStrokeWidth = Math.min(Math.max(minSize * 0.001, 0.5), 1.5);
  const gradientLineWidth = Math.min(Math.max(minSize * 0.003, 3), 5);
  const dotRadius = Math.min(Math.max(minSize * 0.004, 3), 6);
  
  return { lineStrokeWidth, gradientLineWidth, dotRadius };
};