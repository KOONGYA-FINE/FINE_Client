import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import { styled } from "styled-components";

const center = {
  lat: 37.5649867,
  lng: 126.985575,
};

const OPTIONS = {
  minZoom: 4,
  maxZoom: 18,
};

interface Place {
  position: google.maps.LatLngLiteral;
  marker?: google.maps.Marker; // Marker 인스턴스를 저장할 속성 추가
}

function FineGoogleMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);

    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);

    const inputElement = document.getElementById(
      "search-box-input"
    ) as HTMLInputElement;
    const searchBoxInstance = new window.google.maps.places.SearchBox(
      inputElement
    );
    setSearchBox(searchBoxInstance);

    searchBoxInstance.addListener("places_changed", () => {
      const newPlaces = searchBoxInstance.getPlaces();

      if (typeof newPlaces === "undefined" || newPlaces.length === 0) {
        return;
      }

      // Clear existing markers
      places.forEach((place) => {
        if (place.marker) {
          place.marker.setMap(null);
        }
      });

      // Create new places with markers
      const updatedPlaces: Place[] = [];

      newPlaces.forEach((newPlace) => {
        if (newPlace.geometry && newPlace.geometry.location) {
          const newMarker = new google.maps.Marker({
            position: newPlace.geometry.location.toJSON(),
            map: mapInstance,
          });

          updatedPlaces.push({
            position: newPlace.geometry.location.toJSON(),
            marker: newMarker,
          });
        }
      });

      setPlaces(updatedPlaces);
    });
  };

  const onUnmount = () => {
    setMap(null);
    setSearchBox(null);
  };

  return (
    <Wrapper>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_KEY as string}
        libraries={["places"]}
        language="en"
      >
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={OPTIONS}
        >
          {places.map((place, index) => (
            <Marker key={index} position={place.position} />
          ))}
        </GoogleMap>
        <StandaloneSearchBox
          onLoad={(searchBoxInstance) => setSearchBox(searchBoxInstance)}
        >
          <input
            id="search-box-input"
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 999,
            }}
          />
        </StandaloneSearchBox>
      </LoadScript>
    </Wrapper>
  );
}

export default React.memo(FineGoogleMap);

const Wrapper = styled.div`
  .map-container {
    width: 80vw;
    height: 60vh;
  }
`;
