/* eslint-disable tailwindcss/no-custom-classname */
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { UserFilters } from '@/constants/filters'
import { getUsers } from '@/lib/actions/user.action'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const result = await getUsers({});
    return (
      <div className='pt-28'>
        <h1 className='h1-bold text-dark100_light900'>All Users</h1>
        <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar 
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder='Search for Users'
            otherClasses="flex-1"
          />

          <Filter 
            filters={UserFilters}
            otherClasses='min-h-[56px] sm:min-2-[170px]'
          />
        </div>
        <div className='mt-12 flex flex-wrap gap-4'>
          { result && (result.users.length > 0 ?
            (result.users.map((user) => (
              <UserCard 
                key={user._id}
                user={user}
              />
            )))
            : (
              <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                <p>No users yet</p>
                <Link href="/sign-up" className="text-accent-blue mt-2 font-bold">
                  Join to be the first!
                </Link>
              </div>
            ))}
        </div>
      </div>
    )
  }
  
  export default page