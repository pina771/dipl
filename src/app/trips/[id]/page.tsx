import { getCategories } from "../../../lib/functions/categories";
import { getTripPointsOfInterest } from "../../../lib/functions/trips";
import { DynamicCategoryIcon } from "../../components/trip/DynamicCategoryIcon";
import { PointOfInterestForm } from "../../components/trip/PointOfInterestForm";

async function Trip({ params }: { params: { id: string } }) {
  const categories = await getCategories();

  const pointsOfInterest = await getTripPointsOfInterest(params.id);

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 h-full justify-between max-w-prose ml-4 ">
        <div>{JSON.stringify(pointsOfInterest)}</div>

        <div>
          <PointOfInterestForm tripId={params.id} categories={categories} />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full"></div>
    </div>
  );
}
export default Trip;
