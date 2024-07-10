/* eslint-disable tailwindcss/no-custom-classname */
import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.action'
import React from 'react'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = auth();
  if(!userId) return null;
    
  const result = await getSavedQuestions({clerkId: userId});
  return (
    <>
      <h1 className='h1-bold text-dark100_light900 pt-28'>Saved Questions</h1>


      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar 
          route="/"
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
            _id={question._id}
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
      
    </>
    
  )
}

