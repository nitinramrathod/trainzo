import React from "react";
import Input from "../forms/Input";
import { SectionHeading } from "./Plans";
import Textarea from "../forms/Textarea";
import Button from "../forms/Button";
// import Image from "next/image";
// import gymImage1 from "@/assets/images/gym-image-1.avif"
// import gymImage2 from "@/assets/images/gym-image-2.avif"
import landingImage from '@/assets/images/banner1.jpg'

const ContactUs = () => {
  return (
    <section id="contact-us" className=" px-4 relative py-[6rem] bg-cover bg-center"  style={{ backgroundImage: `url(${landingImage.src})` }}>
       <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 to-transparent"></div>
       
      <SectionHeading className="text-white">Contact Us</SectionHeading>

      <div className="flex justify-end align-center z-10 flex-col lg:flex-row align-top gap-5 max-w-[1140px] mx-auto">
        <div className="bg-indigo-100/30 backdrop-blur-lg shadow-lg border-1 py-12 px-8 rounded-2xl w-full lg:max-w-[450px] grid grid-cols-1 gap-x-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Mobile" placeholder="Enter mobile number" />
          </div>
          <Input optional={true} label="Email" placeholder="Enter your email" />
          <Input optional={true} label="Subject" placeholder="Enter subject" />
          <Textarea label="Message" placeholder="Enter message" />
          <div className="flex justify-end">
            <Button className="px-10">Send</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
