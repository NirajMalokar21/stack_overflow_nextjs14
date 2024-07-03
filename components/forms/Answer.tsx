/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { answerSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import Image from 'next/image'

const Answer = () => {
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
        answer: ''
    }
  })
  const editorRef = useRef(null)
  const handleCreateAnswer = (data) => {}

  return (
    <div>
        <div className='flex flex-col justify-between gap-5 pt-4 sm:flex-row sm:items-center sm:gap-2'>
            <h4 className='paragraph-semibold text-dark400_light800'>Write your answer here!</h4>
            <Button className='btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 
            rounded-md px-4 py-2.5 shadow-none'>
                <Image 
                   src='/assets/icons/stars.svg'
                   alt='star'
                   width={12}
                   height={12} 
                   className='object-contain'
                />
                Generate AI answer
            </Button>
        </div>
        <Form {...form}>
            <form
                className='mt-6 flex w-full flex-col gap-10'
                onSubmit={form.handleSubmit(handleCreateAnswer)}
            >
                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormControl className='mt-3.5'>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                            onInit={(_evt, editor) => {
                            // @ts-ignore
                            editorRef.current = editor
                            }}
                            onBlur={field.onBlur}
                            onEditorChange={(content) => field.onChange(content)}
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                            height: 350,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'codesample | bold italic forecolor | alignleft aligncenter |' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Inter; font-size:16px }',
                            skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                            content_css: mode === 'dark' ? 'dark' : 'light',
                            }}
                        />
                        </FormControl>
                        <FormMessage className='text-red-500'/>
                    </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        type='submit'
                        className='primary-gradient w-fit text-white'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default Answer