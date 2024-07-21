import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="pt-28">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex flex-row justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 min-h-[56px] sm:min-w-[170px]" />
      </div>

      <section className="mt-12">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="mb-6">
            <Skeleton className="h-24" />
          </div>
        ))}
      </section>

      <div className='mt-10 flex justify-center'>
        <Skeleton className="h-12 w-1/3" />
      </div>
    </div>
  )
}

export default Loading;
