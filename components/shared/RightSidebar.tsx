/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image'
import React from 'react'
import RenderTag from './RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import Link from 'next/link'
import { getTopPopularTags } from '@/lib/actions/tag.action'

const RightSidebar = async () => {
    const hotQuestions = await getHotQuestions()
    const popularTags = await getTopPopularTags()

    return (
        <section className="background-light900_dark200 custom-scrollbar shadow-light-300 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-x p-6 pt-28 max-lg:hidden dark:shadow-none">
            <div className='flex flex-col gap-3 '>
                <h3 className='h3-bold text-dark200_light900 pt-3'>Top Questions</h3>
                {hotQuestions.map((question) => {
                    return (
                        <Link key={question._id} href={`/question/${question._id}`} className="flex flex-row justify-between gap-2 py-1.5">
                            <p className='body-medium text-dark500_light700 line-clamp-1'>{question.title}</p>
                            <Image
                                src='/assets/icons/chevron-right.svg'
                                alt='arrow'
                                height={20}
                                width={20}
                                className='invert-colors'
                            />
                        </Link>

                    )
                })}
            </div>
            <div className="flex flex-col gap-3 pt-8">
                <h3 className='h3-bold text-dark200_light900 py-3'>Popular Tags</h3>
                {popularTags.map((item) => {
                    return (
                        <RenderTag
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            totalQuestions={item.numberOfQuestions}
                            showCount={true}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default RightSidebar