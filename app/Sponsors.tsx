import Image from "next/image"

export default function Sponsors() {
  const sponsors = [
    { name: "Tesla", logo: "/images/sp1.jpg" },
    { name: "SunPower", logo: "/images/w3.jpg" },
    { name: "LG", logo: "/images/w4.jpg" },
    { name: "Panasonic", logo: "/images/w22.jpg" },
    { name: "Canadian Solar", logo: "/images/w33.jpg" },
    { name: "Jinko Solar", logo: "/images/w44.jpg" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Brands</h2>
          <p className="text-lg text-gray-600">
            We partner with the world's top solar manufacturers to bring you the best products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={sponsor.logo || "/placeholder.svg"}
                alt={sponsor.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
