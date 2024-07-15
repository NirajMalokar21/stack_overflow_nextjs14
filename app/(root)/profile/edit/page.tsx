import Profile from '@/components/forms/Profile'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import React from 'react'


const page = async () => {
  const { userId } = auth()
  console.log(userId)

  if(!userId) return null

  const mongoUser = await getUserById({userId})

  return (
    <div className='pt-28'>
      <h1 className='h1-bold text-dark100_light900 pb-6'>Edit Profile</h1>
      <Profile 
        clerkId={userId}
        user={JSON.stringify(mongoUser)}
      />
    </div>
  )
}

export default page