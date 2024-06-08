"use client";

import useRentModal from "@/app/hooks/useRentModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import CountrySelect from "../input/CountrySelect";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupee } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const MapComponent = useMemo(
    () =>
      dynamic(() => import("../MapComponent"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast("Listing created!", {
          description: "Your property has been listed successfully!.",
        });
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast("Uh oh! Something went wrong.", {
          description: "Please enter the details correctly.",
        });
      })
      .finally(() => setIsLoading(false));
  };

  let dialogTitle = "Which of these best describes your place?";

  let dialogDescription = "Select a category";

  let dialogContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto my-4">
      {categories.map((item, _) => (
        <div key={_} className="col-span-1">
          <CategoryInput
            onClick={(category) => setCustomValue("category", category)}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        </div>
      ))}
    </div>
  );

  if (step === STEPS.LOCATION) {
    dialogTitle = "Where is your place located?";
    dialogDescription = "Help guests find you!";
    dialogContent = (
      <div className="flex flex-col gap-6 my-4">
        <CountrySelect
          value={location}
          onChange={(location) => setCustomValue("location", location)}
        />
        <MapComponent center={location.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    dialogTitle = "Share some basics about your place";
    dialogDescription = "What amenities do you have?";
    dialogContent = (
      <div className="flex flex-col gap-8 my-8">
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(guestCount) => setCustomValue("guestCount", guestCount)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(roomCount) => setCustomValue("roomCount", roomCount)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(bathroomCount) =>
            setCustomValue("bathroomCount", bathroomCount)
          }
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    dialogTitle = "Add a photo of your place";
    dialogDescription = "Show guests what your place looks like!";
    dialogContent = (
      <ImageUpload
        value={imageSrc}
        onChange={(imageSrc) => setCustomValue("imageSrc", imageSrc)}
      />
    );
  }

  if (step === STEPS.DESCRIPTION) {
    dialogTitle = "How would you describe your place?";
    dialogDescription = "Short and sweet works best!";
    dialogContent = (
      <div className="flex flex-col gap-8 my-4">
        <Input
          disabled={isLoading}
          type="text"
          id="title"
          placeholder="Title"
          {...register("title", {
            required: true,
          })}
        />
        <hr />
        <Textarea
          disabled={isLoading}
          id="description"
          placeholder="Type your description here."
          {...register("description", {
            required: true,
          })}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    dialogTitle = "Now, set your price";
    dialogDescription = "How much does your place cost per night?";
    dialogContent = (
      <div className="my-4 relative">
        <IndianRupee className="w-4 h-4 absolute top-3 left-2" />
        <Input
          disabled={isLoading}
          id="price"
          placeholder="Price"
          className="pl-7"
          type="number"
          {...register("price", { required: true })}
        />
      </div>
    );
  }

  return (
    <>
      <Dialog open={rentModal.isOpen} onOpenChange={rentModal.setOpen}>
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
                  step === STEPS.CATEGORY ? "hidden" : "block"
                }`}
                onClick={step === STEPS.CATEGORY ? undefined : onBack}
              >
                Back
              </Button>
              <Button
                variant={"primary"}
                className="flex-1"
                onClick={handleSubmit(onSubmit)}
              >
                {step === STEPS.PRICE ? "Create" : "Next"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RentModal;
