import Hero from "./Hero"
import About from "./About"
import WhyChooseUs from "./WhyChooseUs"
import Sponsors from "./Sponsors"
import ClientProviders from "./ClientProviders"

export default function Home() {
  return (
    <ClientProviders>
      <div className="min-h-screen">
        <Hero />
        <About />
        <WhyChooseUs />
        <Sponsors />
      </div>
    </ClientProviders>
  )
}
