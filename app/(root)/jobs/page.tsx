import JobCard from "@/components/cards/JobCard";
import JobFilter from "@/components/shared/JobFilter";
import Pagination from "@/components/shared/Pagination";

import {
  fetchCountries,
  fetchJobs,
  getUserLocation,
} from "@/lib/actions/job.actions";

import { Job } from "@/types";

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const userLocation = await getUserLocation();

  const jobs = await fetchJobs({
    query:
      `${searchParams.q}, ${searchParams.location}` ??
      `Software Engineer in ${userLocation}`,
    page: searchParams.page ?? 1,
  });

  const countries = await fetchCountries();
  const page = parseInt(searchParams.page ?? 1);

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Jobs</h1>

      <div className='flex'>
        <JobFilter countriesList={countries} />
      </div>

      <section className='light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9'>
        {jobs.length > 0 ? (
          jobs.map((job: Job) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={job.id} job={job} />;

            return null;
          })
        ) : (
          <div className='paragraph-regular text-dark200_light800 w-full text-center'>
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;