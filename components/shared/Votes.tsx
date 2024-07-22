"use client"
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import { toast } from '../ui/use-toast';

interface Props {
    type: string;
    itemId: string;
    userId?: string;
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
    const [isDisabled, setIsDisabled] = useState(false)
    
    
    const handleSave = async () => {
      if(!userId) {
        return toast({
          title: 'Please log in!',
          description: 'You need to log in to do this action'
        });
      }
      await toggleSaveQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathname,
      })

      return toast({
        title: `Question ${hasSaved ? 'Removed from' : 'Added to'} your collection.`,
        variant: hasSaved ? 'destructive' : 'default'
      })
    }

    const handleVote = async (action: string) => {
        if(!userId) {
          toast({
            title: 'Please log in!',
            description: 'You need to log in to do this action'
          });
          return;
        }

        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 3000);
    
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
    
          toast({
            title: `Upvote ${hasupVoted ? 'Removed' : 'Added'} Succesfully`,
            variant: !hasupVoted ? 'default' : 'destructive'
          });
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
    
          toast({
            title: `Upvote ${hasupVoted ? 'Removed' : 'Added'} Succesfully`,
            variant: !hasupVoted ? 'default' : 'destructive'
          });
        }
    }

    useEffect(() => {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      })
    }, [itemId, userId, pathname])


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
                onClick={!isDisabled ? () => handleVote('upvote') : undefined}
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
                onClick={!isDisabled ? () => handleVote('downvote') : undefined}
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
                  onClick={!isDisabled ? () => handleSave() : undefined}
              /> :
              <Image 
                  src='/assets/icons/star-red.svg'
                  alt="Star"
                  height={25}
                  width={25}
                  className="cursor-pointer pl-2"
                  onClick={!isDisabled ? () => handleSave() : undefined}
              />  : <></>
            }
            
        </div>
    )
}

export default Votes