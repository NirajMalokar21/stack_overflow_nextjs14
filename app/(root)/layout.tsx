/* eslint-disable tailwindcss/no-custom-classname */
import LeftSidebar from '@/components/shared/LeftSidebar'
import Navbar from '@/components/shared/navbar/Navbar'
import React from 'react'

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col p-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full">
            
          </div>
        </section>

        Right sidebar
      </div>
      Toaster
    </main>
  )
}

export default Layout