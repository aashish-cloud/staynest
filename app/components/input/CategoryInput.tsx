"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  selected: boolean;
  icon: IconType;
}

const CategoryInput = ({
  onClick,
  label,
  icon: Icon,
  selected,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 border-2 p-4 hover:border-black rounded-lg transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      {label}
    </div>
  );
};

export default CategoryInput;
