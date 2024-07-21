/* eslint-disable tailwindcss/no-custom-classname */
import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { getQuestions } from '@/lib/actions/question.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5
  });

  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 pt-28 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient !text-light-900 min-h-[46px] px-4 py-3'>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder='Search for Questions'
          otherClasses="flex-1"
        />

        <Filter 
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-2-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>

      <HomeFilters />
      {result && result.questions.length > 0 ?
        result.questions.map((question) => (
          <QuestionCard 
            key={question._id}
            clerkId={question.author.clerkId}
            _id={JSON.stringify(question._id)}
            answers={question.answers}
            title={question.title}
            tags={question.tags}
            user={question.author}
            votes={question.upvotes.length}
            views={question.views}
            createdAt={question.createdAt}
          />
        )) :
        <NoResult 
          title="There are no questions to show"
          description='Be the first to break the silence! 🚀 
              Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. 
              Get involved!'
          link='/ask-question'
          linkTitle='Ask a Question'
        />
      }

      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
      
    </>
    
  )
}

