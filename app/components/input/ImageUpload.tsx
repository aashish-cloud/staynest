"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  return (
    <div className="my-4 w-full">
      <div className={`${value ? "hidden" : "block"}`}>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => onChange(res?.[0]?.url)}
        />
      </div>
      {value && (
        <Image
          className="rounded-md max-h-[50vh]"
          alt="Upload"
          height={500}
          width={500}
          style={{ objectFit: "cover" }}
          src={value}
        />
      )}
    </div>
  );
};

export default ImageUpload;
