export function calculateDistance(lat1, lon1, lat2, lon2) {
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

// Check distance between lat and lng - display properties in range
export const haversineDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Radius of Earth in meters
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Function to fetch filtered properties (similar properties)

export const similarPropertiesFetch = (properties, data) => {
  const { userLat, userLng, radius } = data;

  if (!Array.isArray(properties)) {
    console.error("Properties is not an array:", properties);
    return [];
  }

  return properties.filter((property) => {
    const lat = property.latitude;
    const lng = property.longitude;

    if (lat == null || lng == null) {
      console.warn("Skipping property with missing lat/lng:", property);
      return false;
    }

    // Check if the property is within the specified radius
    const distance = haversineDistance(userLat, userLng, lat, lng);
    if (distance > radius) return false;

    return true;
  });
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Covert  [ ] to %5B and %5D for url parameters
export const encodeBrackets = (str) =>
  str.replace(/\[/g, "%5B").replace(/\]/g, "%5D");

// Generate max number bases on first select (used in min/max bedrooms, bathrooms, receptions)
export const generateOptions = (initialValue, maxValue) => {
  const fromValue = parseInt(initialValue, maxValue);
  if (isNaN(fromValue) || fromValue >= maxValue) return []; // No options if input is invalid or too high

  const options = [];
  for (let i = fromValue + 1; i <= maxValue; i++) {
    options.push(
      <option key={i} value={i === maxValue ? `${maxValue}` : i}>
        {i === maxValue ? `${maxValue}` : i}
      </option>
    );
  }

  return options;
};

export const generateIntervalOptionsRent = (initialValue, maxValue) => {
  const fromValue = parseInt(initialValue);
  if (isNaN(fromValue) || fromValue >= maxValue) return []; // No options if input is invalid or too high

  const options = [];
  let i = 25;

  while (i <= maxValue) {
    if (i > fromValue) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    if (i < 500) {
      i += 25; // Increments of 25 up to 500
    } else if (i < 1000) {
      i += 50; // Increments of 50 from 500 to 1000
    } else if (i < 3000) {
      i += 250; // Increments of 250 from 1000 to 3000
    } else if (i < 12000) {
      i += 1000; // Increments of 1000 from 3000 to 12000
    } else {
      break;
    }
  }

  return options;
};

export const generateIntervalOptionsSale = (initialValue, maxValue) => {
  const fromValue = parseInt(initialValue);
  if (isNaN(fromValue) || fromValue >= maxValue) return []; // No options if input is invalid or too high

  const options = [];
  let i = 25000;

  while (i <= maxValue) {
    if (i > fromValue) {
      options.push(
        <option key={i} value={i}>
          {i.toLocaleString()} {/* Formats numbers like 250,000 */}
        </option>
      );
    }

    if (i < 200000) {
      i += 25000; // Increments of 25,000 up to 200,000
    } else if (i < 700000) {
      i += 50000; // Increments of 50,000 from 200,000 to 700,000
    } else if (i < 2000000) {
      i += 50000; // Increments of 50,000 from 700,000 to 2,000,000
    } else if (i < 10000000) {
      i += 1000000; // Increments of 1,000,000 from 2,000,000 to 10,000,000
    } else {
      break;
    }
  }

  return options;
};

// Handle min/max input change values

export const handleMinMaxChange = (e, setState) => {
  const value = e.target.value;
  setState(value);
};
