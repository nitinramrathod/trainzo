import Coach from "@/components/website/Coach";
import ContactUs from "@/components/website/ContactUs";
import Equipments from "@/components/website/Equipment";
import Footer from "@/components/website/Footer";
import Landing from "@/components/website/Landing";
import Navbar from "@/components/website/Navbar";
import Plans from "@/components/website/Plans";
import Testimonials from "@/components/website/Testimonials";

export default function Home() {
  return (
    <main>
      <section className="max-w-[1440px] mx-auto px-4 md:px-14">
        <Navbar />
      </section>
      <Landing />
      <Equipments />
      <section className="max-w-[1440px] mx-auto sm:px-4 md:px-14">
        <Plans />
      </section>
      {/* <section className="max-w-[1440px]  mx-auto px-4 md:px-14"> */}
        <Testimonials />
      {/* </section> */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-14">
        <Coach />
      </section>
      <ContactUs />
      <Footer/>
    </main>
  );
}
