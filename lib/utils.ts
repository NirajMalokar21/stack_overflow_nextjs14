import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

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

export const getJoinedDate = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`;

  return joinedDate;
}

interface URLQueryParams {
  params: string,
  key: string,
  value: string | null
}

export const formUrlQuery = ({ params, key, value }: URLQueryParams) =>  {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  { skipNull:  true})
}

interface RemoveURLQueryParams {
  params: string,
  keysToRemove: string[],

}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveURLQueryParams) =>  {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  { skipNull:  true})
}

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[]
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  }

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if(count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1
      }
    })
  })

  return badgeCounts
}