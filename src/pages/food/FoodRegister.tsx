import React, { useEffect } from "react";

async function getLatLonFromAddress(address: string) {
  return new Promise<google.maps.LatLng>((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results !== null) {
        console.log(results);
        const location = results[0].geometry.location;
        resolve(location);
      } else {
        reject(
          new Error(
            "Geocode was not successful for the following reason: " + status
          )
        );
      }
    });
  });
}

const FoodRegister: React.FC = () => {
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

    searchBox.addListener("places_changed", async () => {
      const places = searchBox.getPlaces();

      if (places.length === 0 || typeof places === "undefined") {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach(async (place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        });

        marker.addListener("click", async () => {
          if (place.formatted_address && place.name) {
            try {
              const location = await getLatLonFromAddress(
                place.formatted_address
              );
              const { lat, lng } = location;
              const url = `https://www.google.com/maps/place/${lat},${lng}?hl=en&entry=ttu`;
              window.open(url, "_blank");
            } catch (error) {
              console.error(error);
            }
          }
        });

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
      <div id="map" style={{ height: "50vh", width: "80vw" }}></div>
    </div>
  );
};

export default FoodRegister;
