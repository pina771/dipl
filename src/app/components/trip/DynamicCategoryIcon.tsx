"use client";
import { Category } from "@prisma/client";
import {
  Coffee,
  Flag,
  Home,
  Landmark,
  MountainSnow,
  Music,
  ShoppingBag,
  ShoppingCart,
  Waves,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const DynamicCategoryIcon = ({
  category,
  className = undefined,
  withTooltip = false,
}: {
  category?: Category | undefined;
  className?: string;
  withTooltip?: boolean;
}) => {
  let iconElement = () => {
    if (!category) return null;
    switch (category.id) {
      case 1:
        return (
          <Home className={cn(className)} style={{ stroke: category.color }} />
        ); //accomodation

      case 2:
        return (
          <ShoppingCart
            className={cn(className)}
            style={{ stroke: category.color }}
          />
        ); // groceries
      case 3:
        return (
          <ShoppingBag
            className={cn(className)}
            style={{ stroke: category.color }}
          />
        ); // shopping
      case 4:
        return (
          <Music className={cn(className)} style={{ stroke: category.color }} />
        ); // nightclub
      case 6:
        return (
          <Flag className={cn(className)} style={{ stroke: category.color }} />
        ); // monument
      case 7:
        return (
          <Landmark
            className={cn(className)}
            style={{ stroke: category.color }}
          />
        ); // museum
      case 8:
        return (
          <Coffee
            className={cn(className)}
            style={{ stroke: category.color }}
          />
        ); // cafe
      case 9:
        return (
          <MountainSnow
            className={cn(className)}
            style={{ stroke: category.color }}
          />
        ); // nature spot
      case 10:
        return (
          <Waves className={cn(className)} style={{ stroke: category.color }} />
        ); // water related

      default:
        return null;
    }
  };
  return category ? (
    withTooltip ? (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="">{iconElement()}</TooltipTrigger>
            <TooltipContent>
              <p className="">{category.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    ) : (
      <>{iconElement()}</>
    )
  ) : null;
};
