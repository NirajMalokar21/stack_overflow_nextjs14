/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from '../shared/RenderTag'
import { getTopInteractedTags } from '@/lib/actions/tag.action'
import { Badge } from '../ui/badge'

interface UserProps {
    user: {
        _id: string,
        clerkId: string,
        name: string,
        username: string,
        picture: string,
    }
}

const UserCard = async ( {user}: UserProps) => {
  const tags = await getTopInteractedTags({ userId: user._id})
  return (
    <Link href={`/profile/${user.clerkId}`} className="shadow-light100_darknone max-xs:min-w-full xs:w-[240px] w-full">
        <article className="background-light900_dark200 light-border flex w-full flex-col items-center 
        justify-center rounded-2xl border p-8">
            <Image 
                src={user.picture}
                alt='UserImg'
                width={90}
                height={90}
                className='rounded-full'
            />
            <div className="mt-4 text-center">
                <h3 className="h3-bold text-dark200_light900 line-clamp-1">
                    {user.name}
                </h3>
                <p className="body-regular text-dark500_light500 mt-2">@{user.username}</p>
            </div>
            <div className='mt-5'>
                <div className="flex items-center gap-2">
                    {tags && tags.length > 0 ? (tags.map((tag) => (
                        <RenderTag   
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                        /> 
                    ))) : (
                        <Badge>No tags yet</Badge>
                    )

                    }
                </div>
                
            </div>
        </article>
    </Link>
  )
}

export default UserCard