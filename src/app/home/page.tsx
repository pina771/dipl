import { getServerSession } from "next-auth";
import Link from "next/link";
import { getTripsForUser } from "../../lib/functions/user";
import { authOptions } from "../api/auth/[...nextauth]/route";

const HomeDashboard = async () => {
  const session = await getServerSession(authOptions);
  const data = await getTripsForUser(session!.user.id);

  return (
    <div>
      <Link href={`/trips/add`}>Add Trip</Link>
      <p>{JSON.stringify(session)}</p>
      <hr />
      {JSON.stringify(data)}
    </div>
  );
};
export default HomeDashboard;
