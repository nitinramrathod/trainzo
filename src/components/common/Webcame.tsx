"use client";

import { useEffect, useRef, useState } from "react";
import { X, Camera, RotateCcw } from "lucide-react";

type Props = {
  onClose: () => void;
  onCapture: (image: Blob) => void;
};

export default function WebcamModal({ onClose, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

 const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // Convert canvas to Blob (binary)
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          setCapturedBlob(blob);
          setPreview(URL.createObjectURL(blob)); // show preview
        }
      }, "image/png");
    }
  };

  const handleRetry = () => setPreview(null);

   const handleSave = () => {
    if (capturedBlob) {
      onCapture(capturedBlob); // return blob to parent
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">Capture Profile Photo</h2>

        {/* Camera or Preview */}
        <div className="flex justify-center mb-4">
          {!preview ? (
            <video ref={videoRef} autoPlay className="rounded-xl shadow-md w-full" />
          ) : (
            <img src={preview} alt="Preview" className="rounded-xl shadow-md w-full" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {!preview ? (
            <button
              onClick={capturePhoto}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <Camera size={18} /> Capture
            </button>
          ) : (
            <>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
              >
                <RotateCcw size={18} /> Retry
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
