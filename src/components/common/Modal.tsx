import { cross_icon } from "@/assets/icons/website";
import React, { useEffect, useState } from "react";

interface ModalProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  position?: string;
  backgroundBlur?:boolean;
}

const Modal = ({ open, setOpen, title, children, backgroundBlur, position }: ModalProps) => {
  const [positionClass, setPositionClass] = useState<string>('center')
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.style.overflow = open ? "hidden" : "auto";
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    let positionClasses:string

    if(position == 'top'){
      positionClasses='items-start justify-center'
    }else if(position == 'bottom'){
      positionClasses='items-end justify-center'
    }else if(position == 'left'){
      positionClasses='items-center justify-start'
    }else if(position == 'right'){
      positionClasses='items-center justify-end'
    }else{
      positionClasses='items-center justify-center'
    }

    setPositionClass(positionClasses)
  }, [position])
  

  return (
    <div
      className={`fixed inset-0 z-50 flex w-full transition-all duration-300 ease-in-out overflow-auto p-10 h-full bg-black/50 bg-opacity-50 ${positionClass} ${backgroundBlur ? "backdrop-blur-md" : ""} ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`bg-white p-4 ${position == 'center' ? "my-auto": ''} rounded-md min-w-[300px] relative transition-all duration-300 ease-in-out ${open ? "translate-y-0": "translate-y-10"}`}>
        {title &&  <h2 className='text-2xl font-bold mb-3 text-gray-700'>{title}</h2>}
        {children}
        <button
          className="bg-red-100 p-1 text-red-700 rounded-md hover:bg-red-200 transition-all duration-300 ease-in-out cursor-pointer absolute top-3 text-md right-3"
          onClick={() => setOpen && setOpen(false)}
        >
          {cross_icon}
        </button>
      </div>
    </div>
  );
};

export default Modal;
