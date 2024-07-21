import { SearchParamsProps } from '@/types'
import React from 'react'
import { getUserAnswers } from '@/lib/actions/user.action'
import AnswerCard from '../cards/AnswerCard'

interface Props extends SearchParamsProps{
  userId: string,
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserAnswers({userId, page: 1})
  return (
    <>
      {results.answers.map((answer) => (
        <AnswerCard 
            key={answer._id}
            clerkId={clerkId}
            _id={JSON.stringify(answer._id)}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
        />
      ))}
    </>
  )
}

export default AnswersTab