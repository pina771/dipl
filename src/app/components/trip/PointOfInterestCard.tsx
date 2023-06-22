import { Category, PointOfInterest } from "@prisma/client";
import { Separator } from "@/app/components/ui/separator";
import { DynamicCategoryIcon } from "./DynamicCategoryIcon";

function PointOfInterestCard({
  pointOfInterest,
}: {
  pointOfInterest: PointOfInterest & { categories: Category[] };
}) {
  return (
    <div className="p-2">
      <h2 className="text-lg font-medium leading-none">
        {pointOfInterest.name}
      </h2>
      <p className="text-muted-foreground my-2">{pointOfInterest.desc}</p>
      <Separator orientation="horizontal" className="mb-2 w-2/5" />
      <div className="space-x-2">
        {pointOfInterest.categories.map((category) => (
          <DynamicCategoryIcon
            className="w-5 h-5"
            category={category}
            key={category.id}
            withTooltip
          />
        ))}
      </div>
    </div>
  );
}
export default PointOfInterestCard;
