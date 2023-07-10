"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

export function MapControl({
  tripId,
  action,
  poiId,
}: {
  tripId: string;
  action?: string | null;
  poiId?: string | null;
}) {
  const queryClient = useQueryClient();

  const map = useMapEvents({
    click: (ev) => {
      if (action != "add") return;
      else mutation.mutate(ev.latlng);
    },
  });
  const mutation = useMutation({
    mutationFn: async (ev: LatLng) => mutateBasedOnClick(ev),
    onSuccess: () => {
      queryClient.invalidateQueries([`trip-${tripId}-pointsOfInterest`]);
    },
  });

  const mutateBasedOnClick = (ev: LatLng) => {
    return fetch(`/api/trips/${tripId}/point-of-interest/${poiId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat: ev.lat, lon: ev.lng }),
    });
  };

  return null;
}
