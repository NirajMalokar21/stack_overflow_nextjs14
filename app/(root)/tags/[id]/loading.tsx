import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; 

const Loading = () => {
  return (
    <div className='pt-28'>
      {/* Title */}
      <Skeleton className="mb-8 h-8 w-1/4" />

      {/* Search Bar */}
      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>

      {/* Questions Placeholder */}
      <div className="mt-8 flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-lg border bg-gray-100 p-6 shadow-md">
            <Skeleton className="mb-4 h-6 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <Skeleton className="mb-2 h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
