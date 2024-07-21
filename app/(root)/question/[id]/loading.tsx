import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='pt-28'>
      <div className="flex-start w-full flex-row justify-between py-4">
        <div className="flex-start w-full flex-row">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="ml-4 h-8 w-1/4" />
        </div>
        <div className="flex items-center">
          <Skeleton className="mr-2 h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <Skeleton className="mb-6 mt-4 h-8 w-3/4" />
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>

      <Skeleton className="h-60 w-full bg-gray-300" />

      <div className='flex flex-row gap-3 py-5'>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="mt-5">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
      </div>
    </div>
  );
};

export default Loading;
