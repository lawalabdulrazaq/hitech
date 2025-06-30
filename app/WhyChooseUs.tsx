import { Shield, Clock, DollarSign, Wrench, Leaf, Star } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Trusted & Reliable",
      description: "Over 10 years of experience with thousands of successful installations",
    },
    {
      icon: Clock,
      title: "Quick Installation",
      description: "Most installations completed within 1-2 days with minimal disruption",
    },
    {
      icon: DollarSign,
      title: "Best Pricing",
      description: "Competitive pricing with flexible financing options available",
    },
    {
      icon: Wrench,
      title: "Expert Installation",
      description: "Certified technicians ensure perfect installation every time",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Help reduce carbon emissions and create a sustainable future",
    },
    {
      icon: Star,
      title: "5-Star Service",
      description: "Rated 5 stars by our customers for exceptional service quality",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another solar company. We're your partners in creating a sustainable energy future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
