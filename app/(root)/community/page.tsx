import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { UserFilters } from '@/constants/filters'
import React from 'react'

const dummyUser = {
  _id: "1",
  clerkId: "user_2iSYIiau7LTogQEMvmOwkZggWaQ",
  name: "Niraj Malokar",
  username: "Kips21",
  tags: [
    {
      _id: 1,
      name: "HTML",
    },
    {
      _id: 2,
      name: "CSS"
    },
    {
      _id: 3,
      name: "JAVA"
    },
  ],
  picture: "/assets/icons/like.svg"
}

const page = async () => {

    return (
      <div>
        <h1 className='h1-bold text-dark100_light900'>All Users</h1>
        <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar 
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder='Search for Questions'
            otherClasses="flex-1"
          />

          <Filter 
            filters={UserFilters}
            otherClasses='min-h-[56px] sm:min-2-[170px]'
            containerClasses=''
          />
        </div>
        <div className='mt-12 flex flex-wrap gap-4'>
          <UserCard user={dummyUser}/>
          <UserCard user={dummyUser}/>
          <UserCard user={dummyUser}/>
          <UserCard user={dummyUser}/>
        </div>
      </div>
    )
  }
  
  export default page