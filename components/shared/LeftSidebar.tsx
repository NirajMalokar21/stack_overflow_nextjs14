"use client"
/* eslint-disable tailwindcss/no-custom-classname */
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '../ui/button'

const LeftSidebar = () => {
    const pathname = usePathname()
    return (
        <section className="background-light900_dark200 light-border custom-scrollbar shadow-light-300 sticky left-0 top-0 flex h-screen flex-col justify-between gap-6 overflow-y-auto border-r pt-8 max-sm:hidden lg:w-[266px] dark:shadow-none">
                <div className="flex flex-col p-2">
                    {sidebarLinks.map((item) => {
                        const isActive = (pathname.includes(item.route) && item.route.length > 1 || pathname === item.route)
                        return(
                            <Link
                                key={item.route}
                                href={item.route}
                                className={`${isActive ? 'primary-gradient text-light-900 rounded-lg' : 'text-dark300_light900'} 
                                flex items-center justify-start gap-4 bg-transparent p-4`}
                            >
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    className={`${isActive ? "" : "invert-colors"}`} 
                                />
                                <p className={`${isActive ? "base-bold" : "base-medium"}`}>{item.label}</p>
                            </Link>
                        )
                    })}
                </div>
                <SignedOut>
                    <div className="flex flex-col gap-3">                       
                        <Link href='/sign-in'>
                            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                <span className='primary-text-gradient'>Log In</span>
                            </Button>
                        </Link>
                    
                        <Link href='/sign-up'>
                            <Button className='small-medium btn-tertiarty text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                Sign Up
                            </Button>
                        </Link>                       
                    </div> 
                </SignedOut>
                <SignedIn>
                    <div className="flex flex-col gap-3">                       
                        <Link
                            href='/'
                            className={'text-dark300_light900 flex items-center justify-start gap-4 bg-transparent p-4'} 
                        >
                            <Image
                                src='/assets/icons/user.svg'
                                alt='log out'
                                width={20}
                                height={20}
                                className='invert-colors'
                            />
                            <p className='base-medium'>Log Out</p>
                        </Link>                
                    </div> 
                </SignedIn>
                
        </section>
    )
}

export default LeftSidebar