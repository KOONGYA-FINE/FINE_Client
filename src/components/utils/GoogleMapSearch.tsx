import React, { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { placesState } from "../../store/atom";

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const GoogleMapSearch: React.FC = () => {
  const setPlacesInfo = useSetRecoilState(placesState);
  // const [country, setCountry] = useRecoilState(TestcountryAtom);
  // const [food, setFood] = useState("");
  const resetPlacesInfo = useResetRecoilState(placesState);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [value, setValue] = useState("");
  // const [reset, setReset] = useState(false);
  // const handleChange = () => {
  //   setValue(country);
  // };
  // const changeClick = () => {
  //   setReset(!reset);
  // };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_KEY as string
    }&libraries=places&region=kr&language=en&callback=initAutocomplete`;
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
        zoom: 15,
        minZoom: 14,
        maxZoom: 20,
        styles: myStyles,
        mapTypeId: "roadmap",
      }
    );

    const koreaBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.25134, 124.393069), // 남서쪽 좌표
      new google.maps.LatLng(38.61474, 131.86897) // 북동쪽 좌표
    );

    // const input = document.getElementById("fac-input") as HTMLInputElement;
    const input = document.getElementById("final-input") as HTMLInputElement;

    const searchBox = new window.google.maps.places.SearchBox(input, {
      bounds: koreaBounds,
    });

    // const searchBox =
    //   country === ""
    //     ? new window.google.maps.places.SearchBox(input, {
    //         bounds: koreaBounds,
    //       })
    //     : new window.google.maps.places.SearchBox(selectInput, {
    //         bounds: koreaBounds,
    //       });

    // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    const infoWindow = new window.google.maps.InfoWindow();

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (typeof places === "undefined" || places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      resetPlacesInfo();

      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        //상태이상 담기
        if (
          place.place_id &&
          place.geometry &&
          place.geometry.location &&
          place.name &&
          place.types &&
          (place.types.includes("restaurant") || place.types.includes("cafe"))
        ) {
          const service = new window.google.maps.places.PlacesService(map);
          service.getDetails(
            {
              placeId: place.place_id,
            },
            (placeResult, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const phtotoProp =
                  typeof placeResult?.photos === "undefined"
                    ? ""
                    : placeResult!.photos[0].getUrl();
                const name = placeResult!.name as string;
                const address = placeResult!.formatted_address as string;
                const rating = placeResult!.rating as number;
                const url = `${placeResult!.url}&hl=en`;
                const lat = placeResult!.geometry?.location?.lat() as number;
                const lng = placeResult!.geometry?.location?.lng() as number;
                const tag = placeResult!.types?.includes("restaurant")
                  ? ""
                  : "cafe";
                setPlacesInfo((prev) => [
                  ...prev,
                  {
                    phtotoProp,
                    name,
                    address,
                    rating,
                    url,
                    lat,
                    lng,
                    tag,
                  },
                ]);
              }
            }
          );
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
            place.name &&
            place.types &&
            (place.types.includes("restaurant") || place.types.includes("cafe"))
          ) {
            const service = new window.google.maps.places.PlacesService(map);
            service.getDetails(
              {
                placeId: place.place_id,
              },
              (placeResult, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  resetPlacesInfo();
                  const phtotoProp =
                    typeof placeResult?.photos === "undefined"
                      ? ""
                      : placeResult!.photos[0].getUrl();
                  const name = placeResult!.name as string;
                  const address = placeResult!.formatted_address as string;
                  const rating = placeResult!.rating as number;
                  const url = `${placeResult!.url}&hl=en`;
                  const lat = placeResult!.geometry?.location?.lat() as number;
                  const lng = placeResult!.geometry?.location?.lng() as number;
                  const tag = placeResult!.types?.includes("restaurant")
                    ? ""
                    : "cafe";
                  setPlacesInfo((prev) => [
                    ...prev,
                    {
                      phtotoProp,
                      name,
                      address,
                      rating,
                      url,
                      lat,
                      lng,
                      tag,
                    },
                  ]);
                  // window.open(url, "_blank");
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
      {/* {reset === false ? (
        <>
          <label>
            <input
              type="checkbox"
              name="color"
              value="blue"
              onClick={() => {
                setCountry("japan");
              }}
              checked={country === "japan"}
            />{" "}
            Japan
          </label>
          <label>
            <input
              type="checkbox"
              name="color"
              value="blue"
              onClick={() => {
                setCountry("french");
              }}
              checked={country === "french"}
            />{" "}
            French
          </label>
          <label>
            <input
              type="checkbox"
              name="color"
              value="red"
              onClick={() => {
                setFood("restaurant");
              }}
              checked={food === "restaurant"}
            />{" "}
            Restaurant
          </label>
        </>
      ) : null} */}
      {/* {reset === false ? (
        <input
          id="final-input"
          className="controls"
          type="text"
          value={`${country} ${food}`}
          onChange={handleChange}
          placeholder="Enter a location"
          disabled={food !== "" ? false : true}
        />
      ) : ( */}
      <input
        id="final-input"
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

export default GoogleMapSearch;
