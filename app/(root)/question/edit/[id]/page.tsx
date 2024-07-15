import Question from '@/components/forms/Question'
import { getQuestionById } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  const questionId = params.id;


  if(!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({questionId})

  if(JSON.stringify(result.author._id) !== JSON.stringify(mongoUser._id)) return 

  return (
    <div className='pt-28'>
      <h1 className='h1-bold text-dark100_light900'>Edit Question</h1>
      <div>
        <Question 
          type='Edit'
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </div>
  )
}

export default page