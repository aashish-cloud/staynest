"use client";

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the country side!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in snow!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const urlCategory = params.get("category");

  const path = usePathname();
  const isHomePage = path === "/";

  if (!isHomePage) return null;

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((category, _) => (
          <CategoryBox
            key={_}
            label={category.label}
            selected={urlCategory === category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
