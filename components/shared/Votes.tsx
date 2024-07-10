"use client"
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
    type: string;
    itemId: string;
    userId: string;
    upvotes: number;
    hasupVoted: boolean;
    downvotes: number;
    hasdownVoted: boolean;
    hasSaved?: boolean
}

const Votes = ({
    type,
    itemId,
    userId,
    upvotes= 0,
    hasupVoted,
    downvotes= 0,
    hasdownVoted,
    hasSaved
}: Props) => {
    const pathname = usePathname()
    
    const handleSave = async () => {
      await toggleSaveQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathname,
      })
    }

    const handleVote = async (action: string) => {
        if(!userId) {
          return;
        }
    
        if(action === 'upvote') {
          if(type === 'Question') {
            await upvoteQuestion({ 
              questionId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            })
          } else if(type === 'Answer') {
            await upvoteAnswer({ 
              answerId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            })
          }
    
          // todo: show a toast
          return;
        }
    
        if(action === 'downvote') {
          if(type === 'Question') {
            await downvoteQuestion({ 
              questionId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            })
          } else if(type === 'Answer') {
            await downvoteAnswer({ 
              answerId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            })
          }
    
          // todo: show a toast
          
        }
      }

    return (
        <div className="flex items-center">
            <Image 
                src={hasupVoted
                    ? '/assets/icons/upvoted.svg'
                    : '/assets/icons/upvote.svg'
                }
                alt="Upvote"
                height={25}
                width={25}
                className="cursor-pointer"
                onClick={() => handleVote('upvote')}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 px-2">
                <p className="subtle-medium text-dark400_light900">
                    {formatNumber(upvotes)}
                </p>
            </div>
            <Image 
                src={hasdownVoted
                    ? '/assets/icons/downvoted.svg'
                    : '/assets/icons/downvote.svg'
                }
                alt="Downvote"
                height={25}
                width={25}
                className="cursor-pointer"
                onClick={() => handleVote('downvote')}
            />
            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                <p className="subtle-medium text-dark400_light900">
                    {formatNumber(downvotes)}
                </p>
            </div>
            {type === 'Question' ?
              hasSaved ? <Image 
                  src='/assets/icons/star-filled.svg'
                  alt="Star"
                  height={25}
                  width={25}
                  className="cursor-pointer pl-2"
                  onClick={() => handleSave()}
              /> :
              <Image 
                  src='/assets/icons/star-red.svg'
                  alt="Star"
                  height={25}
                  width={25}
                  className="cursor-pointer pl-2"
                  onClick={() => handleSave()}
              />  : <></>
            }
            
        </div>
    )
}

export default Votes