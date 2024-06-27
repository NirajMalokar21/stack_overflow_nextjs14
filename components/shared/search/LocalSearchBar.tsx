/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import Image from 'next/image'
import React from 'react'
import { Input } from '../../ui/input'

interface CustomInputProps {
  route: string
  iconPosition: string
  imgSrc: string
  placeholder: string
  otherClasses: string
}

const LocalSearchBar = ({
  route, 
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses
}: CustomInputProps) => {
  return (
    <div className={`background-light800_darkgradient relative flex min-h-[56px] w-full grow cursor-pointer
    flex-row items-center gap-1 rounded-xl border-r-4 border-none px-4 ${otherClasses}`}>
        {iconPosition === 'left' && (<Image
            src={imgSrc}
            alt='Seach Icon'
            width={24}
            height={24} 
        />)}
        <Input
            type='text'
            placeholder={placeholder}
            className='paragraph-regular no-focus placeholder:dark:text-light-700 text-dark400_light700 placeholder border-none bg-transparent shadow-none outline-none'
        />
        {iconPosition === 'right' && (<Image
            src={imgSrc}
            alt='Seach Icon'
            width={24}
            height={24} 
        />)}
    </div>
  )
}

export default LocalSearchBar