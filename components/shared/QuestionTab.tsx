import { getUserQuestions } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionCard'

interface Props extends SearchParamsProps{
  userId: string,
  clerkId?: string
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserQuestions({userId, page: 1})
  return (
    <>
      {results.questions.map((question) => (
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
      ))}
    </>
  )
}

export default QuestionTab