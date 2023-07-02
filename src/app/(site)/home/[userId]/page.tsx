import { getFriendsForUser } from "../../../../lib/functions/user";
import AddFriendForm from "../../../components/AddFriendForm";

const HomeDashboard = async ({ params }: { params: { userId: string } }) => {
  const friendsForUser = await getFriendsForUser(params.userId);

  return (
    <div>
      <AddFriendForm />
      <ul>
        {friendsForUser?.map((friend) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomeDashboard;
