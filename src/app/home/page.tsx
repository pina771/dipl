import Link from "next/link";

const HomeDashboard = () => {
  return (
    <div>
      <Link href={`/trips/add`}>Add Trip</Link>
    </div>
  );
};
export default HomeDashboard;
