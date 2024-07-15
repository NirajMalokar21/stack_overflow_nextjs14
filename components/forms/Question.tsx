/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import React, { useRef, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Editor } from '@tinymce/tinymce-react';
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { questionSchema } from '@/lib/validations'
import { useTheme } from '@/context/ThemeProvider'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { createQuestion, editQuestion } from '@/lib/actions/question.action'
import { useRouter, usePathname } from 'next/navigation'

interface Props {
  mongoUserId: string;
  type?: string;
  questionDetails?: string;
}

const Question = ({ mongoUserId, questionDetails, type }: Props) => {
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const parsedQuestionDetails = questionDetails && JSON.parse(questionDetails || '');

  const groupedTags = parsedQuestionDetails?.tags.map((tag: any) => tag.name)


  const editorRef = useRef(null)
   // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
      tags: groupedTags || []
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true)
    try{
      if(type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname
        })
        router.push(`/question/${parsedQuestionDetails?._id}`)
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname
        })
  
        router.push('/')
      }
      
    } catch(error) {
      
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if(e.key === 'Enter' && field.name === 'tags'){
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if(tagValue !== ""){
        if(tagValue.length > 15){
          return form.setError('tags', {
            type: 'required',
            message: 'Tag mustbe less than 15 characters.'
          })
        }

        if(!field.value.includes(tagValue as never)){
          form.setValue('tags', [...field.value, tagValue])
          tagInput.value = ''
          form.clearErrors('tags');
        }
      } else {
        form.trigger();
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag)

    form.setValue('tags', newTags)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input className='np-focus paragraph-regular background-light700_dark300 light-border-2 
                  text-dark300_light700 min-h-[56px] border'
                  {...field} />
                </FormControl>
                <FormDescription className='body-regular text-light-500 mt-2.5'>
                  Be specific and imagine you&apos;re asking a question to another person.
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Detailed explanation of your problem <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={parsedQuestionDetails?.content || ""}
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
                <FormDescription className='body-regular text-light-500 mt-2.5'>
                  Be specific and imagine you&apos;re asking a question to another person.
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-semibold text-dark400-light800'>
                  Tags <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <>
                    <Input className='np-focus paragraph-regular background-light900_dark300 light-border-2 
                    text-dark300_light700 min-h-[56px] border'
                    disabled={type === "Edit"}
                    placeholder='Add tags...' onKeyDown={(e) => handleInputKeyDown(e, field)}/>

                    {field.value.length > 0 && (
                      <div className='flex-start mt-2.5 gap-2.5'>
                        {field.value.map((tag: any) => (
                          <Badge key={tag}
                          className='paragraph-regular background-light800_dark300 text-light400_light500 rounded0md flex
                          items-center justify-center gap-2 border-none px-4 py-2 capitalize'>
                            {tag}
                            {type !== "Edit" && (<Image 
                              src='/assets/icons/close.svg'
                              alt='Close icon'
                              width={12}
                              height={12}
                              className='cursor-pointer object-contain invert-0 dark:invert'
                              onClick={() => handleTagRemove(tag, field)}
                            />) }
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormDescription className='body-regular text-light-500 mt-2.5'>
                  Add up to 3 tags to decribe what your question is about.
                </FormDescription>
                <FormMessage className='text-red-500'/>
              </FormItem>
            )}
          />
          <Button type="submit" className='primary-gradient !text-light-900 w-fit' 
          disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                {type === 'Edit' ? 'Editing...' : 'Posting'}
              </>) : ( 
              <>
                {type === 'Edit' ? 'Edit Question' : 'Ask a Question'}  
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Question