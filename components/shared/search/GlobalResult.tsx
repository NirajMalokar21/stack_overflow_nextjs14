"use client"
/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import GlobalFilters from './GlobalFilters'
import { globalSearch } from '@/lib/actions/general.action'

const GlobalResult = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState([
    { type: 'question', id: 1, title:'NextJS question'},
    { type: 'answer', id: 2, title:'NextJS answer'},
    { type: 'user', id: 3, title:'NextJS user'},
  ])

  const global = searchParams.get('global')
  const type = searchParams.get('type')

  useEffect(() => {
    const fetchResult = async () => {
        setResult([]);
        setIsLoading(true);

        try {
            const result = await globalSearch({query: global, type})
            
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }
  }, [global, type])

  const renderLink = (type: string, id: string) => {return "/"}

  return (
    <div className='bg-light-800 dark:bg-dark-400 absolute top-full z-10 mt-3 w-full rounded-xl py-5 shadow-sm'>
        <p className='text-dark400_light900 paragraph-semibold px-5'>
            <GlobalFilters />
        </p>
        <div className="bg-light-700/50 dark:bg-dark-500/50 my-5 h-px" />
        <div className="space-y-5">
            <p className='text-dark400_light900 paragraph-semibold px-5'>
                Top Match
            </p>
            
            {isLoading ? (
                <div className='flex-center flex-col px-5'>
                    <ReloadIcon className='text-primary-500 my-2 size-10 animate-spin'/>
                    <p className='text-dark200_light800 body-regular'>Browsing the entire database</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                     {result.length > 0 ? (
                        result.map((item: any, index: number) => (
                            <Link
                                href={renderLink('type', 'id')}
                                key={item.type + item.id + index}
                                className='pv-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50 flex w-full cursor-pointer items-start gap-3 px-5
                                py-2.5'
                            >
                                <Image 
                                    src='/assets/icons/tag.svg'
                                    alt='tags'
                                    width={18}
                                    height={18}
                                    className='invert-colors mt-1 object-contain'
                                />

                                <div className="flex flex-col">
                                    <p className='body-medium text-dark200_light800 line-clamp-1'>{item.title}</p>
                                    <p className='text-light400_light500 small-medium mt-1 font-bold capitalize'>{item.type}</p>
                                </div>
                            </Link>
                        )) 
                     ) : (
                        <div className='flex-center flex-col px-5'>
                            <p className='text-dark200_light800 body0regular px-5 py-2.5'>Oops, no results found!</p>
                        </div>
                     )}
                </div>
                )
            }   
        </div>
        
    </div>
  )
}

export default GlobalResult