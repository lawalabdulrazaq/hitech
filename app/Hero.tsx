import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Power Your Future with Solar Energy</h1>
            <p className="text-xl mb-8">
              Join thousands of homeowners who have made the switch to clean, renewable solar energy. Save money while
              saving the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="#about"
                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/w1.jpg"
              alt="Solar panels on house"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
