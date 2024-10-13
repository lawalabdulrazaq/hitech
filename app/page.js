import Navbar from "./components/Navbar";
import Hero from "./Hero";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import Sponsors from "./Sponsors";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Carousel />
      <Sponsors />

      <Footer />
    </main>
  );
}
