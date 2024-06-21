import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const differenceInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} hour(s) ago`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 30) {
    return `${differenceInDays} day(s) ago`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} month(s) ago`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);
  return `${differenceInYears} year(s) ago`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'; // Divide by 1,000,000 and append 'M'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'; // Divide by 1,000 and append 'K'
  } else {
    return num.toString(); // Return the number as a string if it's less than 1,000
  }
};
