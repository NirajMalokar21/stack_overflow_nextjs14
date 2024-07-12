/* eslint-disable tailwindcss/no-custom-classname */
import ProfileLink from "@/components/shared/ProfileLink"
import { Button } from "@/components/ui/button"
import { getUserInfo } from "@/lib/actions/user.action"
import { getJoinedDate } from "@/lib/utils"
import { URLProps } from "@/types"
import { SignedIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"

const Page = async({ params, searchParams}: URLProps) => {
    const { userId: clerkId } = auth()
    const userInfo = await getUserInfo({clerkId: params.id})
    return (
        <>
            <div className="flex flex-col-reverse items-start justify-between pt-28 sm:flex-row">
                <div className="flex flex-col items-start gap-4 lg:flex-row">
                    <Image 
                        alt="Profile Picture"
                        width={140}
                        height={140}
                        src={userInfo?.user.picture}
                        className="rounded-full object-cover"
                    />
                    <div className="mt-3">
                        <h2 className="h2-bold text-dark100-light900 capitalize">{userInfo.user.name}</h2>
                        <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>
                        
                        <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                            {userInfo.user.portfolioWebsite && (
                                <ProfileLink 
                                    imgUrl="/assets/icons/link.svg"
                                    href={userInfo.user.portfolioWebsite}
                                    title="Portfolio"
                                />
                            )}
                            {userInfo.user.location && (
                                <ProfileLink
                                    imgUrl="/assets/icons/location.svg"
                                    title={userInfo.user.location}
                                />
                                )
                            }
                            <ProfileLink 
                                imgUrl="/assets/icons/calendar.svg"
                                title={`Joined ${getJoinedDate(userInfo.user.joinDate)}`}
                            />
                        </div>
                        {userInfo.user.bio && (
                            <p className="paragraph-regular text-dark400_light800 mt-8">
                                {userInfo.user.bio}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                    <SignedIn>
                        {clerkId === userInfo.user.clerkId && (
                            <Link href='profile/edit'>
                                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px]
                                px-4">
                                    Edit Profile
                                </Button>
                            </Link>
                        )}
                    </SignedIn>
                </div>

            </div>
        </>
    )
}

export default Page