import { ratingStarsNumber } from '../rating.component';

export const convertToRating = (value: number, maxValue: number): number => {
  const percentFilled = value / maxValue * 100;
  const starsFilled = ratingStarsNumber / 100 * percentFilled;

  // rounded to 0.5
  return Math.round(starsFilled * 2) / 2;
};
