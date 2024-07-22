import NoResult from '@/components/shared/NoResult'
import React from 'react'

const page = () => {
  return (
    <div className="pt-28">
        <NoResult
            title="You are not logged in!"
            description="Please log in to visit your profile page"
            link="/sign-in"
            linkTitle="Sign In"
        />
    </div>
  )
}

export default page