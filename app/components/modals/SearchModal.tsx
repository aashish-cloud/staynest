"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Loader } from "lucide-react";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";

import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../input/Calendar";
import Counter from "../input/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const MapComponent = useMemo(
    () =>
      dynamic(() => import("../MapComponent"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue: location?.value,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  let dialogTitle = "Where do you wanna go?";
  let dialogDescription = "Find the perfect location!";
  let dialogContent = (
    <div className="flex flex-col gap-4 my-4">
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <MapComponent center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    dialogTitle = "When do you plan to go?";
    dialogDescription = "Make sure everyone is free!";
    dialogContent = (
      <div className="flex flex-col gap-4 my-4">
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    dialogTitle = "More information";
    dialogDescription = "Find your perfect place!";
    dialogContent = (
      <div className="flex flex-col gap-8 my-8">
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <>
      <Dialog open={searchModal.isOpen} onOpenChange={searchModal.setOpen}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {dialogContent}
          <DialogFooter>
            <div className="flex flex-row gap-2 w-full">
              <Button
                variant={"outline"}
                className={`flex-1 ${
                  step === STEPS.LOCATION ? "hidden" : "block"
                }`}
                onClick={step === STEPS.LOCATION ? undefined : onBack}
              >
                Back
              </Button>
              <Button variant={"primary"} className="flex-1" onClick={onSubmit}>
                {step === STEPS.INFO ? "Search" : "Next"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;
