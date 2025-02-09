import { Controller } from "react-hook-form";

const CheckboxGroup = ({
  // title,
  name,
  options,
  control,
  handleCheckboxChange,
  allValues,
  setFilterUrlCompare,
  setFilters,
}) => {
  return (
    <div>
      {/* <p className="text-sm font-medium text-property-txt-700 mb-2">{title}</p> */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-3">
            {options.map(({ value, label }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={value}
                  checked={field.value?.includes(value)}
                  onChange={(e) =>
                    handleCheckboxChange({
                      e,
                      value,
                      allValues,
                      field,
                      setFilterUrlCompare,
                      setFilters,
                      filters_key: name,
                    })
                  }
                  className="custom-checkbox"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default CheckboxGroup;
