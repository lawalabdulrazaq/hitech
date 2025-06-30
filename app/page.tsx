import Navbar from "./components/Navbar"
import Hero from "./Hero"
import About from "./About"
import WhyChooseUs from "./WhyChooseUs"
import Sponsors from "./Sponsors"
import Footer from "./components/Footer"
import Carousel from "./components/Carousel"
import type React from "react"

export default function Home(): React.ReactElement {
  return (
    <main className="">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="whyus">
        <WhyChooseUs />
      </section>
      <section id="carousel">
        <Carousel />
      </section>
      <section id="sponsors">
        <Sponsors />
      </section>
      <Footer />
    </main>
  )
}
