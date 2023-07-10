import { getCategories } from "../../../../../lib/functions/categories";
import { getTripPointsOfInterest } from "../../../../../lib/functions/trips";
import { PointOfInterestCard } from "../../components/PointOfInterestCard";
import { PointOfInterestForm } from "../../components/PointOfInterestForm";

async function Trip({ params }: { params: { id: string } }) {
  const categories = await getCategories();

  const pointsOfInterest = await getTripPointsOfInterest(params.id);

  return (
    <>
      <div className="flex flex-col gap-4">
        {pointsOfInterest.map((poi) => (
          <PointOfInterestCard
            key={poi.id}
            tripId={params.id}
            pointOfInterest={poi}
          />
        ))}
      </div>
      <div className="mt-auto">
        <PointOfInterestForm tripId={params.id} categories={categories} />
      </div>
    </>
  );
}
export default Trip;
