import ContactUs from "@/components/website/ContactUs";
import Footer from "@/components/website/Footer";
import Landing from "@/components/website/Landing";
import Navbar from "@/components/website/Navbar";
import Plans from "@/components/website/Plans";

export default function Home() {
  return (
    <main>
      <section className="max-w-[1440px] mx-auto px-4 md:px-14">
        <Navbar />
      </section>
      <Landing />
      <section className="max-w-[1440px] mx-auto px-4 md:px-14">
        <Plans/>
      </section>
      <section className="max-w-[1440px] mx-auto px-4 md:px-14">
        <ContactUs/>
      </section>
      <Footer></Footer>
    </main>
  );
}
