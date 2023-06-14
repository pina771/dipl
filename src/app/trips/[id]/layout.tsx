import { prisma } from "@/lib/prisma";
import TopBar from "../../components/TopBar";

const fetchTripInfo = async (id: string) =>
  prisma.trip.findFirst({
    include: { users: { select: { id: true, name: true } } },
  });

const TripLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <div>
      <TopBar id={params.id} />
      {children}
    </div>
  );
};
export default TripLayout;
