import Question from '@/components/forms/Question'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const { userId } = auth()

  if(!userId) redirect('/sign-in')

  const mongoUser = await getUserById({ userId })

  console.log(mongoUser)

  return (
    <div className='pt-28'>
      <h1 className='h1-bold text-dark100_light900 pb-6'>Ask a Question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  )
}

export default page