/* eslint-disable tailwindcss/no-custom-classname */
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { TagFilters } from '@/constants/filters'
import { getTags } from '@/lib/actions/tag.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const page = async ({searchParams }: SearchParamsProps) => {
    const result = await getTags({
      searchQuery: searchParams.q
    });
    return (
      <div className='pt-28'>
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
              <Link href={`/tags/${tag._id}`} key={tag._id} className="shadow-light100_darknone max-xs:min-w-full xs:w-[240px] w-full">
                <div className="background-light900_dark200 light-border flex w-full flex-col items-center
                rounded-2xl border p-8" >
                    <div className="background-light800_dark400 mt-4 w-fit rounded-md px-5 py-1.5 text-center">
                      <p className="paragraph-semibold text-dark300_light900">
                        {tag.name}
                      </p>
                    </div>
                    <p className='body-medium text-dark200_light800 pt-5'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quas ea tenetur earum 
                    </p>
                    <p className='body-medium text-dark200_light800 justify-start py-3'><span className='h3-bold text-primary-500 px-2'>{tag.questions.length}+</span> Questions</p>
                </div>
              </Link>
            )))
            : (
              <NoResult 
                title='No Tags Found'
                description='It looks like there are no tags found!'
                link='/ask-question'
                linkTitle='Ask Question'
              />
            ))}
        </div>
      </div>
    )
  }
  
  export default page