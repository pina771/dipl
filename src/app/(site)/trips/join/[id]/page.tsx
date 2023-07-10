import { UserPlus } from "lucide-react";
import { getTripInfoAndMembers } from "../../../../../lib/functions/trips";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import JoinTripButtons from "../../components/JoinTripButtons";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
async function JoinTripPage({ params }: { params: { id: string } }) {
  const tripInfo = await getTripInfoAndMembers(params.id);
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <div className="flex h-full justify-center items-center bg-background ">
      <Card className="p-8 pb-2">
        <UserPlus className=" ml-auto" size={32} />
        <CardHeader>
          <CardTitle className="text-3xl"> Invitation </CardTitle>
          <CardDescription className="text-lg">
            You have been invited to the following trip:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" rounded-md border p-4">
            <h2 className="font-semibold tracking-tight text-2xl">
              {tripInfo.name}
            </h2>
            <p className="text-muted-foreground">{tripInfo.desc}</p>
            <h3 className="font-semibold text-lg mt-2">Members:</h3>
            <ul className="ml-4">
              {tripInfo.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <JoinTripButtons userId={session.user.id} tripId={params.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
export default JoinTripPage;
