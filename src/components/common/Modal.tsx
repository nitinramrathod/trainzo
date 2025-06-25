import { cross_icon } from "@/assets/icons/website";
import React, { useEffect } from "react";

interface ModalProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.style.overflow = open ? "hidden" : "auto";
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex w-full transition-all duration-300 ease-in-out overflow-auto p-10 h-full items-center justify-center bg-black/30 backdrop-blur-md bg-opacity-50 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`bg-white px-8 py-4 m-auto rounded-md min-w-[300px] relative transition-all duration-300 ease-in-out ${open ? "translate-y-0": "translate-y-10"}`}>
        {children}
        <button
          className="bg-red-100 p-1 rounded-md hover:bg-red-200 transition-all duration-300 ease-in-out cursor-pointer absolute top-3 text-md right-3"
          onClick={() => setOpen && setOpen(false)}
        >
          {cross_icon}
        </button>
      </div>
    </div>
  );
};

export default Modal;
