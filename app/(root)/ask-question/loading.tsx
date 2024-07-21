import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className='pt-28'>
      <h1 className='h1-bold text-dark100_light900 pb-6'>
        <Skeleton className="h-8 w-1/2" />
      </h1>
      <div>
        <Skeleton className="mb-4 h-10 w-full" />
        <Skeleton className="mb-4 h-40 w-full" />
        <Skeleton className="mb-4 h-10 w-full" />
      </div>
    </div>
  );
};

export default Loading;
