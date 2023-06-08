import Image from "next/image";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <h1>Home</h1>

      <p>Server side rendered: </p>
      <p>{JSON.stringify(session)}</p>
    </section>
  );
}
