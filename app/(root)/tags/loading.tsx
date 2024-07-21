import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='pt-28'>
      <Skeleton className="mb-8 h-10 w-1/4" />

      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-1/4" />
      </div>

      <div className='mt-12 flex flex-wrap gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="max-xs:min-w-full xs:w-[240px] w-full">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="flex flex-col items-center p-4">
              <Skeleton className="mb-4 h-6 w-1/2 rounded-md" />
              <Skeleton className="mb-2 h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <div className='mt-10 flex justify-center'>
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
};

export default Loading;
