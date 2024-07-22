"use server"

import Question from "@/database/question.model";
import { connectToDatabse } from "../mongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams, RecommendedParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions (params: GetQuestionsParams) {
    try {
        connectToDatabse();

        const { searchQuery, filter, page=1, pageSize=20 } = params

        const query: FilterQuery<typeof Question> = {}

        let sortOptions = {}

        if(filter) {
          switch (filter) {
            case "newest":
              sortOptions = { createdAt: -1}
              break;
            
            case "recommended":
              sortOptions = { views: -1 }
              break;
            
            case "unanswered": 
              sortOptions = { answers: 1 }
              break;

            case "frequent":
              sortOptions = { views: -1 }
              break;
          }
        }

        if(searchQuery){
          query.$or = [
            { title: { $regex: new RegExp(searchQuery, 'i')}},
            { content: { $regex: new RegExp(searchQuery, 'i')}},
          ]
        }

        const questions = await Question.find(query)
            .populate({ path: 'tags', model: Tag})
            .populate({ path: 'author', model: User})
            .sort(sortOptions)
            .skip( page > 0 ? ((page - 1) * pageSize) : 0)
            .limit( pageSize )

        const totalQuestions = await Question.countDocuments(query)
          
        const isNext = totalQuestions > ((page - 1) * pageSize) + questions.length;

        return {questions, isNext}
    } catch(error){
        console.log(error)
        throw error
    }
}

export async function deleteQuestion (params: DeleteQuestionParams) {
  try {
    connectToDatabse()

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId}});

    revalidatePath(path)
    
  } catch (error) {
    console.log(error)
  }
}

export async function createQuestion (params: CreateQuestionParams) {
    try {
        connectToDatabse()


        const { title, content, tags, author, path } = params;

        const question = await Question.create({
            title,
            content,
            author,
        })

        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {name: {$regex: new RegExp(`^${tag}$`, "i")}},
                {$setOnInsert: {name: tag}, $push: {questions: question._id}},
                { upsert: true, new: true}
            )

            tagDocuments.push(existingTag._id)
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: {tags: {$each: tagDocuments}}
        })

        await Interaction.create({
          user: author,
          action: 'ask_question',
          question: question._id,
          tags: tagDocuments
        })
        console.log(author)
        await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } })
        
        revalidatePath(path)
    }
    catch (error) {
      console.log(error)
      throw error
    }
}

export async function editQuestion (params: EditQuestionParams) {
  try {
    connectToDatabse()

    const { questionId, title, content, path } = params

    const question = await Question.findById(questionId)

    if(!question) throw new Error("Question not found")

    question.title = title;
    question.content = content;
    await question.save()

    revalidatePath(path)
    
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionById (params: GetQuestionByIdParams) {
    try {
        connectToDatabse()
        const {questionId} = params

        const question = Question.findById(questionId)
            .populate({ path: 'tags', model: Tag, select: '_id name'})
            .populate({ path: 'author', model: User, select: '_id clerkId name picture'})

        return question;

    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabse();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if(hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }}
    } else if (hasdownVoted) {
      updateQuery = { 
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { upvotes: userId }}
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) {
      throw new Error("Question not found");
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    })

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    })

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
  
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabse();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if(hasdownVoted) {
      updateQuery = { $pull: { downvote: userId }}
    } else if (hasupVoted) {
      updateQuery = { 
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else {
      updateQuery = { $addToSet: { downvotes: userId }}
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if(!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -2 : 2}
    })

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? -10 : 10}
    })

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotQuestions() {
  try {
    connectToDatabse();

    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5)

    return hotQuestions;
    
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getRecommendedQuestions(params: RecommendedParams) {
  try {
    await connectToDatabse();

    const { userId, page = 1, pageSize = 20, searchQuery } = params;

    // find user
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    const skipAmount = (page - 1) * pageSize;

    // Find the user's interactions
    const userInteractions = await Interaction.find({ user: user._id })
      .populate("tags")
      .exec();

    // Extract tags from user's interactions
    const userTags = userInteractions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }
      return tags;
    }, []);

    // Get distinct tag IDs from user's interactions
    const distinctUserTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    const query: FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
        { author: { $ne: user._id } }, // Exclude user's own questions
      ],
    };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const totalQuestions = await Question.countDocuments(query);

    const recommendedQuestions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalQuestions > skipAmount + recommendedQuestions.length;

    return { questions: recommendedQuestions, isNext };
  } catch (error) {
    console.error("Error getting recommended questions:", error);
    throw error;
  }
}