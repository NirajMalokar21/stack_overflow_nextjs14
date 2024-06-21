/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'

import LocalSearchBar from '@/components/shared/search/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'

interface CustomCardType {
  _id: string,
  title: string,
  tags: {
    _id: number,
    name: string,
  }[],
  user: {
    _id: string,
    name: string,
    picture: string
  },
  votes: number,
  answers: Array<object>,
  views: number,
  createdAt: Date
}

const questions: CustomCardType[] = [
  {
    _id: "1",
    title: "How to use TypeScript with React?",
    tags: [
      { _id: 1, name: "TypeScript" },
      { _id: 2, name: "React" }
    ],
    user: {
      _id: "user1",
      name: "Alice",
      picture: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    votes: 42,
    answers: [
      { text: "You can start by using the `create-react-app` tool with the TypeScript template." },
      { text: "Ensure your tsconfig.json is properly configured." }
    ],
    views: 1234,
    createdAt: new Date("2022-05-15")
  },
  {
    _id: "2",
    title: "What is the best way to learn JavaScript?",
    tags: [
      { _id: 3, name: "JavaScript" },
      { _id: 4, name: "Learning" }
    ],
    user: {
      _id: "user2",
      name: "Bob",
      picture: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    votes: 76,
    answers: [
      { text: "Start with the basics and practice a lot." },
      { text: "Follow tutorials and build projects." }
    ],
    views: 2345,
    createdAt: new Date("2024-04-20")
  },
  {
    _id: "3",
    title: "How to improve CSS skills?",
    tags: [
      { _id: 5, name: "CSS" },
      { _id: 6, name: "Web Development" }
    ],
    user: {
      _id: "user3",
      name: "Charlie",
      picture: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    votes: 89,
    answers: [
      { text: "Practice by building responsive layouts." },
      { text: "Learn about CSS preprocessors like SASS." }
    ],
    views: 3456,
    createdAt: new Date("2024-03-10")
  }
];

const Home = () => {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient !text-light-900 min-h-[46px] px-4 py-3'>
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder='Search for Questions'
          otherClasses="flex-1"
        />

        <Filter 
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-2-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>

      <HomeFilters />
      {questions.map((question) => (
        <QuestionCard 
          key={question._id}
          _id={question._id}
          answers={question.answers}
          title={question.title}
          tags={question.tags}
          user={question.user}
          votes={question.votes}
          views={question.views}
          createdAt={question.createdAt}
        />
      ))}
      {/* <NoResult 
        title="There are no questions to show"
        description='Be the first to break the silence! 🚀 
            Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. 
            Get involved!'
        link='/ask-question'
        linkTitle='Ask a Question'
      /> */}
    </>
    
  )
}

export default Home