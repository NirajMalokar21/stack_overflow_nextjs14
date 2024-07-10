import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Page = async({ params, searchParams}: any) => {
    const result = await getQuestionById({ questionId: params.id })
    const { userId: clerkId } = auth();

    let mongoUser;
    if(clerkId) {
        mongoUser = await getUserById({ userId: clerkId })
    }

    return (
        <>
            <div className="flex-start w-full flex-row justify-between py-4 pt-28">
                <div className="flex-start w-full flex-row">
                    <Image
                        src={result.author.picture}
                        alt="User Image"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <p className="h3-bold text-dark200_light800 px-4">
                        {result.author.name}
                    </p>
                </div>
                <Votes 
                    type='Question'
                    itemId={JSON.stringify(result._id)}
                    userId={JSON.stringify(mongoUser._id)}
                    upvotes={result.upvotes.length}
                    downvotes={result.downvotes.length}
                    hasupVoted={result.upvotes.includes(mongoUser._id)}
                    hasdownVoted={result.downvotes.includes(mongoUser._id)}
                    hasSaved={mongoUser?.saved.includes(result._id)}
                />
            </div>
            <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
               {result.title} 
            </h2>
            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric 
                    imgUrl="/assets/icons/clock.svg"
                    alt="clock icon"
                    value={`- asked ${getTimeStamp(result.createdAt)}`}
                    title="Asked"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric 
                    imgUrl="/assets/icons/message.svg"
                    alt="clock icon"
                    value={`${formatNumber(result.answers.length)}`}
                    title="Answers"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric 
                    imgUrl="/assets/icons/eye.svg"
                    alt="clock icon"
                    value={`${formatNumber(result.views)}`}
                    title="Views"
                    textStyles="small-medium text-dark400_light800"
                />
            </div>
            <ParseHTML data={result.content} />
            <div className='flex flex-row gap-3 py-5'>
                {result.tags.map((tag: {_id: number; name: string}) => (
                    <RenderTag   
                    key={tag._id}
                    _id={tag._id}
                    name={tag.name}
                    /> 
                ))}
            </div>
            <Answer 
                question={result.content}
                questionId={JSON.stringify(result._id)}
                authorId={JSON.stringify(mongoUser._id)}
            />
            <AllAnswers 
                questionId={result._id}
                userId={mongoUser._id}
                totalAnswers={result.answers.length}
            />
        </>
    )
}

export default Page