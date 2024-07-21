/* eslint-disable tailwindcss/no-custom-classname */
import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.action'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { SearchParamsProps } from '@/types'
import Pagination from '@/components/shared/Pagination'

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if(!userId) return null;
    
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 5
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900 pt-28'>Saved Questions</h1>

      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar 
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder='Search for Questions'
          otherClasses="flex-1"
        />

        <Filter 
          filters={QuestionFilters}
          otherClasses='min-h-[56px] sm:min-2-[170px]'
        />
      </div>

      {result && result.questions.length > 0 ?
        result.questions.map((question: any) => (
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
          title="There are no saved questions to show"
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
          isNext={result?.isNext}
        />
      </div>
    </>
    
  )
}

