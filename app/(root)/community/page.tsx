/* eslint-disable tailwindcss/no-custom-classname */
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import Pagination from '@/components/shared/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { UserFilters } from '@/constants/filters'
import { getUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community | Dev Overflow'
}

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 0,
    pageSize: 6
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 pt-28">All Users</h1> 

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar 
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
            otherClasses="flex-1"
          />

          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result && result.users.length > 0 ? (
          result.users.map((user)=> (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="text-accent-blue mt-2 font-bold">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>

      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      </div>
    </>
  )
}

export default Page