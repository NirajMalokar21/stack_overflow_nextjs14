import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ProfileLinkProps {
    imgUrl: string;
    href?: string;
    title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className='flex flex-row items-center gap-2'>
        <Image 
            alt='icon'
            width={20}
            height={20}
            src={imgUrl}
        />
         {href ? 
            (
                <Link href={href} target="_blank" className='paragraph-medium text-blue-500'>
                    {title}
                </Link>
            ) 
            : 
            (
                <p className="paragraph-medium text-dark100_light900">{title}</p>
            )}
    </div>
  )
}

export default ProfileLink