import type { PaddingsResult } from './types';

const calculatePaddings = (width: number): PaddingsResult => {
  const leftPadding = width * 0.22;
  const rightPadding = width * 0.11;

  return { leftPadding, rightPadding };
};

export default calculatePaddings;
