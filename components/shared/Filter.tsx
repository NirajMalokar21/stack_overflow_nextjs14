/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

interface CustomFilterTypes {
    filters: {
        name: string,
        value: string
    }[];
    otherClasses?: string;
    containerClasses?: string;
}



const Filter = ( {filters, otherClasses, containerClasses}: CustomFilterTypes ) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const paramFilter = searchParams.get('filter')

    const handelTypeClick = (value: string) => {
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'filter',
            value
          })
      
          router.push(newUrl, { scroll: false })
    }  
  return (
    <>
        <div className={`relative ${containerClasses}`}>
            <Select
                onValueChange={handelTypeClick}
                defaultValue={paramFilter || ''}
            >
                <SelectTrigger className={`background-light800_dark300 text-dark500_light700 relative
                    flex px-5 py-2.5 dark:border-none ${otherClasses}`}>
                    <div className='line-clamp-1 flex-1 text-left'>
                        <SelectValue placeholder="Select a filter" />
                    </div>    
                    
                </SelectTrigger>
                <SelectContent className='text-dark500_light700 small-regular bg-light-900 dark:bg-dark-300 border-none'>
                    <SelectGroup>
                        {filters.map((filter) => {
                            return(
                                <SelectItem 
                                    key={filter.value}
                                    onChange={() => handelTypeClick(filter.value)}
                                    className='hover:bg-light-800 hover:dark:bg-slate-800'
                                    value={filter.value}>
                                        {filter.name}</SelectItem>
                                    
                            )
                        })}
                    </SelectGroup>                 
                </SelectContent>
            </Select>
        </div>
        <div className="flex"></div>
    </>
    
  )
}

export default Filter