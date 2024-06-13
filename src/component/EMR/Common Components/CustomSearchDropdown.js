import React from "react";
import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";

const CustomSearchDropdown = ({
  name,
  control,
  defaultValue,
  error,
  options,
  placeholder,
  onChange,
  className,
  styles,
  onCreateOption,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      error={error}
      render={({ field }) => (
        <CreatableSelect
          {...field}
          options={options}
          placeholder={placeholder}
          onChange={(selectedOption) => {
            field.onChange(selectedOption);
            onChange(selectedOption); // Pass the selected option to the parent component
          }}
          className={className}
          styles={styles}
          isClearable
          onCreateOption={onCreateOption}
        />
      )}
    />
  );
};

export default CustomSearchDropdown;
