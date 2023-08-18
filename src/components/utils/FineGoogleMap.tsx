import React, { useMemo, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

// const center = {
//   lat: 37.5649867,
//   lng: 126.985575,
// };

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const OPTIONS = {
  minZoom: 15,
  maxZoom: 19,
  styles: myStyles,
  streetViewControl: false,
};

function FineGoogleMap({ lat, lng }: { lat: number; lng: number }) {
  const location = useLocation().pathname;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const center = useMemo(() => ({ lat: lat, lng: lng }), []);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <Wrapper>
      <GoogleMap
        mapContainerClassName={
          location.includes("edit" || "register")
            ? "map-container"
            : "review-container"
        }
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={OPTIONS}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(FineGoogleMap);

const Wrapper = styled.div`
  .map-container {
    width: 80vw;
    height: 50vh;
    margin: 20px auto;
  }
  .review-container {
    width: 40vw;
    height: 50vh;
    margin: 20px auto;
  }
`;
