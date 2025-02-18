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

export const handleMinMaxChange = (e, setStateObject, name) => {
  const { value } = e.target;

  setStateObject((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const handleCheckboxChange = ({
  e,
  value,
  allValues,
  field,
  setFilterUrlCompare,
  setFilters,
  filters_key,
}) => {
  let newValue;

  if (value === allValues) {
    // Prevent unchecking "all_properties" unless another checkbox is checked
    if (e.target.checked) {
      newValue = [allValues];
    } else {
      // Only allow unchecking if another checkbox is checked
      if (field.value?.some((val) => val !== allValues)) {
        newValue = [];
      } else {
        newValue = [allValues];
      }
    }
  } else {
    // If any other option is checked, update the array
    newValue = e.target.checked
      ? [...field.value, value]
      : field.value.filter((val) => val !== value);

    // If "all_properties" is in the array and any other is selected, remove "all_properties"
    if (newValue.includes(allValues) && e.target.checked) {
      newValue = newValue.filter((val) => val !== allValues);
    }
  }

  // If no checkboxes are selected, automatically check "all_properties"
  if (newValue.length === 0) {
    newValue = [allValues];
  }

  // Handle the change in form input and filters state
  setFilterUrlCompare((prevState) => ({
    ...prevState,
    modifiedFilterValues: {
      ...prevState.modifiedFilterValues,
      [filters_key]: newValue,
    },
  }));

  setFilters((prevFilters) => ({
    ...prevFilters,
    [filters_key]: newValue, // Update the property_type in the filters
  }));

  field.onChange(newValue); // Also update React Hook Form state
};

// Search by city, track input value
export const citySearchChange = (
  e,
  dataList,
  setInputValue,
  setFilteredData
) => {
  const value = e.target.value;
  setInputValue(value);

  if (value) {
    // Filter the keys of dataList (cities) based on the input value
    const matches = Object.keys(dataList).filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    // If no matches, display the "No properties at this location" message
    if (matches.length === 0) {
      setFilteredData(["No properties at this location"]);
    } else {
      setFilteredData(matches); // Set filtered city names (keys)
    }
  } else {
    setFilteredData([]); // Clear the list when the input is empty
  }
};
