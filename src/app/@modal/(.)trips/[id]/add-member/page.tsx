import Modal from "@/app/components/modals/Modal";
import { getServerSession } from "next-auth";
import AddMemberForm from "../../../../components/AddMemberForm";
import { getFriendsForUser } from "../../../../../lib/functions/user";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";

// TODO: Swap link in field with real site URL
// localhost is not valid

async function AddMembersModal({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("AddMembersModal : No session object.");
  const friends = await getFriendsForUser(session?.user.id);
  return (
    <Modal>
      <AddMemberForm tripId={params.id} friends={friends} />
    </Modal>
  );
}
export default AddMembersModal;
