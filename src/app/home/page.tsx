import { getSession } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const HomeDashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Link href={`/trips/add`}>Add Trip</Link>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};
export default HomeDashboard;
