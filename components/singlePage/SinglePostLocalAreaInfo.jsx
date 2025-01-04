// app/[postcode]/page.js or app/posts/[postcode]/page.js

export default async function SinglePostLocalAreaInfo({ postcode }) {
  const url = `https://api.postcodes.io/postcodes/${postcode}`;

  let longitude = null;
  let latitude = null;
  let error = null;

  try {
    // Fetch location info using postcode
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch location info");
    }
    const locationInfo = await response.json();

    if (locationInfo.result) {
      longitude = locationInfo.result.longitude;
      latitude = locationInfo.result.latitude;
    } else {
      throw new Error("Location result not found");
    }
  } catch (err) {
    error = err.message;
  }

  // Handle error scenario
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Now fetch the nearby places (schools, stations, shops) using Overpass API
  const radius = 10000; // Search radius in meters (1 km)
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(
    node["amenity"="school"](around:${radius},${latitude},${longitude});
    node["railway"="station"](around:${radius},${latitude},${longitude});
    node["shop"](around:${radius},${latitude},${longitude});
  );out body qt;`;

  let placesError = null;
  let closestSchools = [];
  let closestStations = [];
  let closestShops = [];

  try {
    const placesResponse = await fetch(overpassUrl);
    if (!placesResponse.ok) {
      throw new Error("Failed to fetch nearby places");
    }
    const placesData = await placesResponse.json();

    // Process the data to categorize places and calculate distances
    const schools = [];
    const stations = [];
    const shops = [];

    placesData.elements.forEach((place) => {
      if (place.lat && place.lon) {
        const distance = calculateDistance(
          latitude,
          longitude,
          place.lat,
          place.lon
        );

        if (place.tags && place.tags.amenity === "school") {
          schools.push({ ...place, distance });
        } else if (place.tags && place.tags.railway === "station") {
          stations.push({ ...place, distance });
        } else if (place.tags && place.tags.shop) {
          shops.push({ ...place, distance });
        }
      }
    });

    // Sort by distance and get the closest two places
    schools.sort((a, b) => a.distance - b.distance);
    stations.sort((a, b) => a.distance - b.distance);
    shops.sort((a, b) => a.distance - b.distance);

    closestSchools = schools.slice(0, 2);
    closestStations = stations.slice(0, 2);
    closestShops = shops.slice(0, 2);
  } catch (err) {
    placesError = err.message;
  }

  // Handle error fetching places
  if (placesError) {
    return <p>Error fetching nearby places: {placesError}</p>;
  }

  // Display results
  return (
    <div>
      <p>Postcode: {postcode}</p>
      <p>Longitude: {longitude}</p>
      <p>Latitude: {latitude}</p>

      <h3>Closest Schools:</h3>
      {closestSchools.length > 0 ? (
        <ul>
          {closestSchools.map((school, index) => (
            <li key={index}>
              {school.tags.name} - {school.distance.toFixed(2)} miles away
            </li>
          ))}
        </ul>
      ) : (
        <p>No schools found.</p>
      )}

      <h3>Closest Train Stations:</h3>
      {closestStations.length > 0 ? (
        <ul>
          {closestStations.map((station, index) => (
            <li key={index}>
              {station.tags.name} - {station.distance.toFixed(2)} miles away
            </li>
          ))}
        </ul>
      ) : (
        <p>No train stations found.</p>
      )}

      <h3>Closest Shops:</h3>
      {closestShops.length > 0 ? (
        <ul>
          {closestShops.map((shop, index) => (
            <li key={index}>
              {shop.tags.name} - {shop.distance.toFixed(2)} miles away
            </li>
          ))}
        </ul>
      ) : (
        <p>No shops found.</p>
      )}
    </div>
  );
}

// Helper function to calculate distance between two coordinates (in miles)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}
