"use client";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import type { PointOfInterest } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import { useSearchParams } from "next/navigation";
import { PointOfInterestCard } from "./PointOfInterestCard";
import { MapControl } from "./mapControl";
import { MapInfo } from "./mapInfo";

const customMarkerIcon = L.icon({
  iconUrl: "/map-pin.png",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, 0],
  tooltipAnchor: [14, 4],
});

async function fetchTripPointsOfInterest(
  tripId: string
): Promise<PointOfInterest[]> {
  return fetch(`/api/trips/${tripId}/point-of-interest`, {
    method: "GET",
  }).then((res) => res.json());
}

function Map({ tripId }: { tripId: string }) {
  debugger;
  const searchParams = useSearchParams()!;

  const action = searchParams.get("action");
  const poiId = searchParams.get("poiId");
  const position = [51.505, -1.2] as L.LatLngExpression;

  const { isLoading, data } = useQuery({
    queryFn: () => fetchTripPointsOfInterest(tripId),
    queryKey: [`trip-${tripId}-pointsOfInterest`],
  });

  const generateMarkers = () => {
    if (isLoading) return null;
    if (!data || data.length < 1) return null;

    return data.map((el) => {
      if (el.lat != null && el.lon != null) {
        return (
          <Marker
            icon={customMarkerIcon}
            key={el.id}
            position={[Number(el.lat), Number(el.lon)]}
          >
            <Tooltip>{el.name}</Tooltip>
            <Popup>
              <PointOfInterestCard pointOfInterest={el} />
            </Popup>
          </Marker>
        );
      } else {
        return null;
      }
    });
  };

  return !isLoading ? (
    <div className="h-full w-full flex flex-col">
      {poiId ? (
        <MapInfo
          poiName={
            data?.find((el) => el.id === Number.parseInt(poiId))?.name ?? ""
          }
        />
      ) : null}
      <div className="h-full w-full">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <MapControl tripId={tripId} action={action} poiId={poiId} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {generateMarkers()}
        </MapContainer>
      </div>
    </div>
  ) : (
    <div className="h-full w-full bg-muted-foreground animate-pulse"></div>
  );
}
export default Map;
