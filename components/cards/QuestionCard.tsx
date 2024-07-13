/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'
import RenderTag from '../shared/RenderTag'
import Metric from '../shared/Metric'
import { formatNumber, getTimeStamp } from '@/lib/utils'
import Link from 'next/link'

interface QuestionProps {
  _id: string,
  title: string,
  tags: {
    _id: number,
    name: string,
  }[],
  user: {
    _id: string,
    clerkId: string,
    name: string,
    picture: string
  },
  votes: number,
  answers: Array<object>,
  views: number,
  createdAt: Date,
}

const QuestionCard = ( {
  _id,
  title,
  tags,
  user,
  votes,
  answers,
  views,
  createdAt,

}: QuestionProps) => {
  return (
    <div className='background-light900_dark200 border-light shadow-light-300 relative my-6 flex flex-col
    rounded-lg p-3'>
      <div className='flex flex-row items-center justify-between gap-3'>
        <Link href={`/question/${_id}`}>
          <h3 className='h3-bold text-dark200_light900 line-clamp-1'>{title}</h3>
        </Link>
        
      </div>
      
      <div className='flex flex-row gap-3 py-5'>
        {tags.map((tag) => (
            <RenderTag   
              key={tag._id}
              _id={tag._id}
              name={tag.name}
            /> 
        ))}
      </div>
      <div className="flex flex-row justify-between gap-3">
          <Metric 
            imgUrl={user.picture}
            alt="user"
            value={user.name}
            title={` - asked ${getTimeStamp(createdAt)}`}
            href={`/profile/${user.clerkId}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
        <div className='flex flex-row gap-3'>
          <Metric 
            imgUrl='/assets/icons/like.svg'
            alt='upvotes'
            value={formatNumber(votes)}
            title='Votes'
            textStyles='small-medium text-dark400_light800'
          />
          <Metric 
            imgUrl='/assets/icons/message.svg'
            alt='message'
            value={formatNumber(answers.length)}
            title='Answers'
            textStyles='small-medium text-dark400_light800'
          />
          <Metric 
            imgUrl='/assets/icons/eye.svg'
            alt='eye'
            value={formatNumber(views)}
            title='Views'
            textStyles='small-medium text-dark400_light800'
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard