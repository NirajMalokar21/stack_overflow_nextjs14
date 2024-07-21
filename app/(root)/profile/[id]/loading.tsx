import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='pt-28'>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="size-36 rounded-full object-cover" />
          <div className="mt-3 flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="mt-8 h-6 w-3/4" />
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <div className="flex-1">
          <Skeleton className="mb-4 h-8 w-1/4" />
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
