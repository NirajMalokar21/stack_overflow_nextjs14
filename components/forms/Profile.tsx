/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from 'next/navigation'
import { profileSchema } from '@/lib/validations'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { updateUser } from '@/lib/actions/user.action'
import { toast } from '../ui/use-toast'

interface Props {
    clerkId: string;
    user: string
}

const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        name: parsedUser.name ||  "",
        username: parsedUser.username || "",
        bio: parsedUser.bio || "",
        portfolioWebsite: parsedUser.portfolioWebsite || "",
        location: parsedUser.location || "",
    }
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true)
    try{
      await updateUser({
        clerkId,
        updateData: {
            name: values.name,
            username: values.username,
            portfolioWebsite: values.portfolioWebsite,
            location: values.location,
            bio: values.bio
        },
        path: pathname
      })
      router.push(`/profile/${clerkId}`)

      return toast({
        title: 'Profile updated successfully!'
      })
      
    } catch(error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Bio 
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Portfolio Website
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Location 
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          

          
          <Button type="submit" className='primary-gradient !text-light-900 w-full' 
          disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                Updating
              </>) : ( 
              <>
                Update  
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Profile