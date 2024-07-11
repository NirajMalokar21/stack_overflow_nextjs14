

const Page = async({ params, searchParams}: any) => {
    const tagId = params.id
    
    return (
        <>
            <h1 className="pt-28">{params.id}</h1>
        </>
    )
}

export default Page