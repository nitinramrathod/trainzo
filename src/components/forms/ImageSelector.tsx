"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageSelectorProps {
  name?: string;
  defaultSrc?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  name = "image-selector",
  defaultSrc = "",
  onChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    debugger;
    if(defaultSrc){
        setPreviewUrl(defaultSrc)        
    }else{        
        setPreviewUrl("/images/user-avatar.png")
    }
  }, [defaultSrc])
  

  return (
    <div>
      <label htmlFor={`${name}-input`} className="cursor-pointer block w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-300">
        <Image
          src={previewUrl || ""}
          alt={`${name} preview`}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      </label>

      <input
        id={`${name}-input`}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        capture="environment"
      />
    </div>
  );
};

export default ImageSelector;
