/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Navbar from '@/components/shared/navbar/Navbar'


const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col p-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>

        <RightSidebar />
      </div>
      Toaster
    </main>
  )
}

export default Layout