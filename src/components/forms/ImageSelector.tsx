"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Camera, RotateCcw, X } from "lucide-react";

interface ImageSelectorProps {
  name?: string;
  defaultSrc?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | File,
    name?: string
  ) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  name = "image-selector",
  defaultSrc = "",
  onChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (defaultSrc) {
      setPreviewUrl(defaultSrc);
    } else {
      setPreviewUrl("/images/user-avatar.png");
    }
  }, [defaultSrc]);

  // Start camera when modal opens
  useEffect(() => {
    const startCamera = async () => {
      if (showCamera && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      }
    };
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

const capturePhoto = () => {
  if (!videoRef.current || !canvasRef.current) return;
  const context = canvasRef.current.getContext("2d");
  if (context) {
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${name}.png`, { type: "image/png" });
        setPreviewUrl(URL.createObjectURL(file));
        if (onChange) onChange(file, name); // <-- call with File
        setShowCamera(false);
      }
    }, "image/png");
  }
};

 const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setPreviewUrl(URL.createObjectURL(file));
    if (onChange) onChange(event); // <-- works with your existing handler
  }
};

  return (
    <div>
      {/* Avatar Preview */}
      <label
        htmlFor={`${name}-input`}
        className="cursor-pointer block w-[100px] h-[100px] rounded-full border border-gray-300 relative"
      >
        <Image
          src={previewUrl || ""}
          alt={`${name} preview`}
          width={100}
          height={100}
          className="object-cover rounded-full w-full h-full"
        />

        {/* Camera button */}
        <button
          type="button"
          onClick={() => setShowCamera(true)}
          className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full shadow-md hover:bg-blue-700"
        >
          <Camera size={18} />
        </button>
      </label>

      {/* File Input */}
      <input
        id={`${name}-input`}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative">
            <button
              onClick={() => setShowCamera(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-center mb-4">
              Capture Profile Photo
            </h2>
            <video ref={videoRef} autoPlay className="rounded-xl shadow-md w-full" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex justify-center mt-4">
              <button
                onClick={capturePhoto}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                <Camera size={18} /> Capture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
