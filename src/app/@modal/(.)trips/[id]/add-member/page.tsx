import Modal from "@/components/modals/Modal";
import AddMemberForm from "../../../../(site)/trips/components/AddMemberForm";
import { getFriendsForUser } from "../../../../../lib/functions/user";

// TODO: Swap link in field with real site URL
// localhost is not valid

async function AddMembersModal({ params }: { params: { id: string } }) {
  const { friends } = await getFriendsForUser();
  return (
    <Modal>
      <AddMemberForm tripId={params.id} friends={friends} />
    </Modal>
  );
}
export default AddMembersModal;
