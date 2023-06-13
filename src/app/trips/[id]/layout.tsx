import { prisma } from "../../../utils/prisma";
import TopBar from "../../components/TopBar";

const fetchTripInfo = async (id: string) =>
  prisma.trip.findFirst({ where: { id } });
const TripLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const tripInfo = await fetchTripInfo(params.id);
  return (
    <div>
      <TopBar tripInfo={tripInfo!} />
      {children} {params.id}
    </div>
  );
};
export default TripLayout;
