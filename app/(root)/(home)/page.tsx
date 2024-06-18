/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import Filter from '@/components/shared/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const filters = [
  {
    name: 'Newest',
    value: 'newest'
  },
  {
    name: 'Recommended',
    value: 'recommended'
  },
  {
    name: 'Frequent',
    value: 'frequent'
  },
  {
    name: 'Unanswered',
    value: 'unanswered'
  },
]

const Home = () => {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient !text-light-900 min-h-[46px] px-4 py-3'>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder='Search for Questions'
          otherClasses="flex-1"
        />

        <Filter 
          filters={filters}
          
        />
      </div>
    </>
    
  )
}

export default Home