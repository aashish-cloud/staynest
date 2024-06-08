"use client";

import { Range } from "react-date-range";
import Calendar from "../input/Calendar";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold flex flex-row items-center">
          <IndianRupee className="h-5 w-5" /> {price}
        </div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="p-4">
        <Button
          disabled={disabled}
          onClick={onSubmit}
          variant={"primary"}
          size={"lg"}
          className="text-lg w-full"
        >
          Reserve
        </Button>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center font-semibold justify-between text-lg">
        <div>Total</div>
        <div className="flex flex-row gap-1 items-center">
          <IndianRupee className="h-4 w-4" /> {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
