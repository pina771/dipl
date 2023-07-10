import { Category, PointOfInterest } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { DynamicCategoryIcon } from "./DynamicCategoryIcon";
import { MapPin } from "lucide-react";
import Link from "next/link";

export const PointOfInterestCard = ({
  pointOfInterest,
  tripId,
}: {
  pointOfInterest: PointOfInterest & { categories?: Category[] };
  tripId?: string;
}) => {
  return (
    <div className="p-2">
      <div className="flex items-center">
        <h2 className="text-lg font-medium leading-none">
          {pointOfInterest.name}
        </h2>
        {!!tripId && (
          <Link
            href={`/trips/${tripId}/map?action=add&poiId=${pointOfInterest.id}`}
          >
            <MapPin className="ml-2 w-4 h-4 text-muted-foreground hover:text-primary" />
          </Link>
        )}
      </div>
      <div className="text-muted-foreground  hover:text-primary transition-colors my-2">
        <p className="text-sm ">{pointOfInterest.desc}</p>
      </div>
      {pointOfInterest.categories ? (
        <>
          <Separator orientation="horizontal" className="mb-2 w-2/5" />
          <div className="space-x-2">
            {pointOfInterest.categories?.map((category) => (
              <DynamicCategoryIcon
                className="w-5 h-5"
                category={category}
                key={category.id}
                withTooltip
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
