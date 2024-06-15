"use client"
import React from 'react'
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton
} from '@clerk/nextjs'
const Home = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      Home 
    </div>
  )
}

export default Home