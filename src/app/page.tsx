import Link from "next/link";

export default async function Home() {
  return (
    <section>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="max-w-2xl">
          <h1
            className="my-4 max-w-xl text-5xl font-black 
          leading-[3.5rem]"
          >
            Seamless trip organization and planning with{" "}
            <span className="bg-gradient-to-tr from-fuchsia-500 via-indigo-400 to-indigo-800 bg-clip-text font-bold text-transparent">
              TripPlanner
            </span>
            .
          </h1>
          <h3 className="text-lg  text-gray-600">
            Whether you&apos;re embarking on a solo adventure, planning a family
            vacation or organizing a trip with friends, we have you covered.
            Effortlessly create and manage itineraries and collaborate with
            friends. Say goodbye to travel stress with TripPlanner.
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <Link
              href="/register"
              className=" focus-visible rounded-md bg-indigo-600 px-3 py-2 text-lg text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Join here!
            </Link>
            <Link
              href="/login"
              className=" h-fit w-fit text-lg text-gray-600 hover:underline"
            >
              Already a member? Sign in instead.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
