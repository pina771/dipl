"use client";

import type { PointOfInterest } from "@prisma/client";
import { Link } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";

export const MapInfo = ({ poiName }: { poiName: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="p-2 bg-card border mb-1 rounded-md flex items-center justify-between">
      <p className="text-sm">
        Adding <span className="font-semibold">{poiName}</span>
      </p>
      <Button
        onClick={() => {
          router.replace(pathname);
        }}
        variant="secondary"
        size="sm"
      >
        Confirm
      </Button>
    </div>
  );
};
