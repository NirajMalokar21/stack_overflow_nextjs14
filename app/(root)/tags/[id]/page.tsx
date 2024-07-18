import QuestionCard from "@/components/cards/QuestionCard"
import NoResult from "@/components/shared/NoResult"
import LocalSearchBar from "@/components/shared/search/LocalSearchBar"
import { getQuestionByTagId } from "@/lib/actions/tag.action"
import { URLProps } from "@/types"


const Page = async({ params, searchParams}: URLProps) => {
    const tagId = params.id
    const result = await getQuestionByTagId({
        tagId,
        searchQuery: searchParams.q
    })
    
    return (
        <>
            <h1 className="h1-bold text-dark100_light900 pt-28">{result.tagTitle}</h1> 
            <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar 
                route={`/tags/${tagId}`}
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder='Search for Questions'
                otherClasses="flex-1"
                />
            </div>

            {result && result.questions.length > 0 ?
                result.questions.map((question: any) => (
                <QuestionCard 
                    key={question._id}
                    clerkId={question.author.clerkId}
                    _id={JSON.stringify(question._id)}
                    answers={question.answers}
                    title={question.title}
                    tags={question.tags}
                    user={question.author}
                    votes={question.upvotes.length}
                    views={question.views}
                    createdAt={question.createdAt}
                />
                )) :
                <NoResult 
                title="There are no tag question saved to show"
                description='Be the first to break the silence! 🚀 
                    Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. 
                    Get involved!'
                link='/ask-question'
                linkTitle='Ask a Question'
                />
            }
        </>
    )
}

export default Page