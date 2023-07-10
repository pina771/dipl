import { getFriendsForUser } from "@/lib/functions/user";
import { Separator } from "@/components/ui/separator";
import { ConfirmFriendButtons } from "./ConfirmFriendButtons";

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });
}

export const FriendsList = async () => {
  const { friends, friendshipRequests } = await getFriendsForUser();
  await resolveAfter2Seconds();

  return (
    <div className="max-h-72 overflow-y-auto">
      {friends.length > 0 ? (
        <ul>
          {friends?.map((friend) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          Add friends using the above bar...
        </p>
      )}
      <p className="mt-2 text-sm text-muted-foreground">Friendship requests.</p>
      <Separator className="mb-2" />
      <ul>
        {friendshipRequests?.map((friend) => (
          <li key={friend.id} className="flex items-center justify-between">
            {friend.name}
            <ConfirmFriendButtons friend={friend} />
          </li>
        ))}
      </ul>
    </div>
  );
};
