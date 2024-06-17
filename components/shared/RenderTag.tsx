/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import React from 'react'
import { Badge } from '../ui/badge';

interface Props {
    _id: number;
    name: string;
    totalQuestions ?: number;
    showCount?: boolean
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
    return(
        <Link href={`/tags/${_id}`} className='flex justify-between gap-2'>
            <Badge className='subtle-medium background-light800_dark300 text-dark400_light500 py2 rounded-md 
            border-none px-4 uppercase'>{name}</Badge>

            {showCount && (
                <p className='small-medium text-dark400_light500'>{totalQuestions}+</p>
            )}
        </Link>
    )
}
    
export default RenderTag