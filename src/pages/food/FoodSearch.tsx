import React, { useEffect } from "react";

const FoodSearch: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_KEY as string
    }&libraries=places&language=en&callback=initAutocomplete`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initAutocomplete = () => {
      initMap();
    };
  }, []);

  const initMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 37.5649867, lng: 126.985575 },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );

    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new window.google.maps.places.SearchBox(input);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    const infoWindow = new window.google.maps.InfoWindow();

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0 || typeof places === "undefined") {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };

        const marker = new window.google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        });
        marker.addListener("click", () => {
          if (
            place.place_id &&
            place.geometry &&
            place.geometry.location &&
            place.name
          ) {
            const service = new window.google.maps.places.PlacesService(map);
            service.getDetails(
              { placeId: place.place_id },
              (placeResult, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  const url = `${placeResult!.url}&hl=en`;
                  window.open(url, "_blank");
                }
              }
            );
          }
        });
        // const name = encodeURIComponent(place.name);
        // const placeId = encodeURIComponent(place.place_id);
        //     if (typeof place.url === "undefined") {
        //       console.log(place.adr_address);
        //       const url = `https://www.google.com/maps/place/${encodeURIComponent(
        //         place.name
        //       )}/@${place.geometry.location.lat()},${place.geometry.location.lng()},16z`;
        //       window.open(url, "_blank");
        //     } else {
        //       const url = `${place.url}&hl=en`;
        //       window.open(url, "_blank");
        //     }
        //   }
        // });
        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  return (
    <div>
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Enter a location"
      />
      <div>
        <div id="map" style={{ height: "50vh", width: "80vw" }}></div>
      </div>
    </div>
  );
};

export default FoodSearch;
