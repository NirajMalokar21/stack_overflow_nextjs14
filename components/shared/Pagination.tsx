/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    pageNumber: number,
    isNext?: boolean
}

const Pagination = ({ pageNumber, isNext}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === 'prev'
        ? pageNumber - 1
        : pageNumber + 1

    const newUrl = formUrlQuery({ 
        params: searchParams.toString(),
        key: 'page',
        value: nextPageNumber.toString()
    })

    router.push(newUrl)
  }
  
  return (
    <div className='flex w-full items-center justify-center pt-4'>
        <div className="flex flex-row gap-2">
                <Button 
                    className='btn light-border-2 min-h-[36px] rounded-md border'
                    disabled={pageNumber === 1} 
                    onClick={() => handleNavigation('prev')}
                >
                    <p className='body-medium text-dark200_light800'>Prev</p>
                </Button>
                <div className='bg-primary-500 flex w-full items-center justify-center rounded-md px-4'>
                    <p className='body-semibold text-light-900'>{pageNumber}</p>
                </div>
                <Button 
                    className='btn light-border-2 min-h-[36px] rounded-md border'
                    disabled={!isNext}
                    onClick={() => handleNavigation('next')}
                >
                    <p className='body-medium text-dark200_light800'>Next</p>
                </Button>
        </div> 
    </div>
  )
}

export default Pagination