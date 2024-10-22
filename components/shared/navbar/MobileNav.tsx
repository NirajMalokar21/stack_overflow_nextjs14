"use client"
/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SignedOut, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const NavContent = () => {
    const pathname = usePathname()
    const { userId } = useAuth()

    return (
        <section className="flex h-full flex-col gap-6 pt-6">
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1 || pathname === item.route)
                if(item.route === '/profile') {
                    if(userId) {
                        item.route = `${item.route}/${userId}`
                    }
                }

                return (
                <SheetClose asChild key={item.route}>
                    <Link 
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
                </SheetClose>)
            })}
        </section>
    )
}
  

const MobileNav = () => {
  return (
    <Sheet>
    <SheetTrigger asChild>
        <Image 
            src='/assets/icons/hamburger.svg'
            alt='menu'
            width={36}
            height={36}
            className='invert-colors sm:hidden'
        />
    </SheetTrigger>
    <SheetContent side='left' className='background-light900_dark200 h-full overflow-y-auto border-none'>
        <Link href="/" className='flex items-center gap-1'>
            <Image src="/assets/images/site-logo.svg" width={23} height={23} alt="devOverflow" />
            <p className='h2-bold text-dark100_light900 dark:text-light-900'>
              Dev <span className='text-primary-500'>OverFlow</span>
            </p>
        </Link>
        <div>
            <SignedOut>
                <div className="flex flex-col gap-3 pt-12">
                    <SheetClose asChild>
                        <Link href='/sign-in'>
                            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                <span className='primary-text-gradient'>Log In</span>
                            </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href='/sign-up'>
                            <Button className='small-medium btn-tertiarty text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                                Sign Up
                            </Button>
                        </Link>
                    </SheetClose>
                </div> 
            </SignedOut>
            <SheetClose asChild>
                <NavContent />
            </SheetClose>


        </div>
    </SheetContent>
    </Sheet>

  )
}

export default MobileNav
