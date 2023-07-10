import { getFriendsForUser } from "../../../../../lib/functions/user";
import AddMemberForm from "../../components/AddMemberForm";

async function AddMembersPage({ params }: { params: { id: string } }) {
  const { friends } = await getFriendsForUser();

  return (
    <div className="pt-4">
      <AddMemberForm tripId={params.id} friends={friends} />;
    </div>
  );
}
export default AddMembersPage;
