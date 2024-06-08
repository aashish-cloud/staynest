"use client";

import { Button } from "@/components/ui/button";
import { Check, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  cancel?: boolean;
  success?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  cancel,
  success,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      {cancel && (
        <XCircle className="w-12 h-12 mb-2 rounded-full bg-rose-500/30 text-rose-500 p-2" />
      )}
      {success && (
        <Check className="w-12 h-12 mb-2 rounded-full bg-green-500/30 text-green-500 p-2" />
      )}
      <h1 className="font-bold text-xl">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
      <div className="w-48 mt-4 text-center">
        {showReset && (
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
