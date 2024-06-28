/* eslint-disable tailwindcss/no-custom-classname */
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { TagFilters } from '@/constants/filters'
import { getTags } from '@/lib/actions/tag.action'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const result = await getTags({});
    return (
      <div>
        <h1 className='h1-bold text-dark100_light900'>Tags</h1>
        <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar 
            route="/tags"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder='Search for Tags'
            otherClasses="flex-1"
          />

          <Filter 
            filters={TagFilters}
            otherClasses='min-h-[56px] sm:min-2-[170px]'
          />
        </div>
        <div className='mt-12 flex flex-wrap gap-4'>
          { result && (result.tags.length > 0 ?
            (result.tags.map((tag) => (
              <UserCard 
                key={tag._id}
                user={tag}
              />
            )))
            : (
              <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                <p>No Tags yet</p>
                <Link href="/sign-up" className="text-accent-blue mt-2 font-bold">
                  Post a question with a tag to add it!
                </Link>
              </div>
            ))}
        </div>
      </div>
    )
  }
  
  export default page