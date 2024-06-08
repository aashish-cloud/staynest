"use client";

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        isSearchable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={({ flag, label, region }) => (
          <div className="flex flex-row items-center gap-3">
            <div>{flag}</div>
            <div>
              {label}, <span className="text-neutral-500 ml-1">{region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#FFE4E6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
