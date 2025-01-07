import { calculateDistance } from "@/lib/functions";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import SinglePostAmenities from "./SinglePostAmenities";
export default async function SinglePostLocalAreaInfo({ longitude, latitude }) {
  const radius = 8000; // Search radius in meters (1 km)

  const overpassUrlUnderground = `https://overpass-api.de/api/interpreter?data=[out:json];(
    node["subway"="yes"](around:${radius},${latitude},${longitude});
  );out body qt 10;`;
  const overpassUrlShops = `https://overpass-api.de/api/interpreter?data=[out:json];
  node["shop"="supermarket"](around:${radius},${latitude},${longitude});
  out body qt 4;`;
  const overpassUrlTrain = `https://overpass-api.de/api/interpreter?data=[out:json];
  node["railway"="station"]["network"="National Rail"](around:${radius},${latitude},${longitude});
  out body qt 20;`;

  // Initialize arrays for results
  let closestUnderground = [];
  let closestTrainStation = [];
  let closestShops = [];
  const uniqueUndergroundNames = new Set(); // Track unique station names

  // Fetch and filter data from both endpoints
  try {
    const [undergroundResponse, shopsResponse, trainResponse] =
      await Promise.all([
        fetch(overpassUrlUnderground),
        fetch(overpassUrlShops),
        fetch(overpassUrlTrain),
      ]);

    if (!undergroundResponse.ok || !shopsResponse.ok || !trainResponse.ok) {
      throw new Error("Failed to fetch data for places");
    }

    const undergroundData = await undergroundResponse.json();
    const trainData = await trainResponse.json();
    const shopsData = await shopsResponse.json();

    // Process Underground data
    undergroundData.elements.forEach((place) => {
      if (place.lat && place.lon && place.tags && place.tags.name) {
        // Filter duplicates by name
        if (!uniqueUndergroundNames.has(place.tags.name)) {
          const distance = calculateDistance(
            latitude,
            longitude,
            place.lat,
            place.lon
          );
          closestUnderground.push({ ...place, distance });
          uniqueUndergroundNames.add(place.tags.name); // Add name to set
        }
      }
    });

    // Process Shops data
    shopsData.elements.forEach((place) => {
      if (place.lat && place.lon) {
        const distance = calculateDistance(
          latitude,
          longitude,
          place.lat,
          place.lon
        );
        if (place.tags && place.tags.shop) {
          closestShops.push({ ...place, distance });
        }
      }
    });

    trainData.elements.forEach((place) => {
      if (place.lat && place.lon && place.tags && place.tags.name) {
        // Check for 'name' instead of 'shop'
        const distance = calculateDistance(
          latitude,
          longitude,
          place.lat,
          place.lon
        );
        closestTrainStation.push({ ...place, distance });
      }
    });

    // Sort both arrays by distance
    closestUnderground.sort((a, b) => a.distance - b.distance);
    closestTrainStation.sort((a, b) => a.distance - b.distance);
    closestShops.sort((a, b) => a.distance - b.distance);

    // Slice to get only the closest 4 places from each category
    closestUnderground = closestUnderground.slice(0, 4);
    closestTrainStation = closestTrainStation.slice(0, 4);
    closestShops = closestShops.slice(0, 4);
    console.log("Train stations details", closestTrainStation);
    console.log("Shop details", closestShops);
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }

  // Display results
  return (
    <div className="p-10 rounded-xl  bg-white w-full mb-6 shadow-small">
      <SinglePostAmenities data={closestUnderground} title={"Underground"} />
      <SinglePostAmenities data={closestTrainStation} title={"Train"} />
      <SinglePostAmenities data={closestShops} title={"Shops"} />
    </div>
  );
}
