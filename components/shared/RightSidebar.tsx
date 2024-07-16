/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image'
import React from 'react'
import RenderTag from './RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import Link from 'next/link'

const RightSidebar = async () => {
    const questionArray = [
        "Would it be appropriate to point out an error in another paper during a referee report?",
        "How can an airconditioning machine exist?",
        "Interrogated every time crossing UK Border as citizen",
        "Low digit addition generator",
        "What is an example of 3 numbers that do not make up a vector?"
    ]
    const hotQuestions = await getHotQuestions()

    const popularTags = [
        {
            _id: 1,
            name: "javascript",
            totalQuestions: 12434
        },
        {
            _id: 2,
            name: "python",
            totalQuestions: 11584
        },
        {
            _id: 3,
            name: "react",
            totalQuestions: 7446
        },
        {
            _id: 4,
            name: "django",
            totalQuestions: 5973
        },
        {
            _id: 5,
            name: "php",
            totalQuestions: 1836
        },
    ]

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
                            totalQuestions={item.totalQuestions}
                            showCount={true}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default RightSidebar