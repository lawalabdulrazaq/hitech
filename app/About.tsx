import Image from "next/image"
import { CheckCircle, Users, Award, Zap } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Solar Energy Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 10 years of experience in the solar industry, we're committed to providing high-quality solar
            solutions that help you save money and protect the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Solar Energy?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Reduce Energy Bills</h4>
                  <p className="text-gray-600">Save up to 90% on your monthly electricity costs</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Increase Property Value</h4>
                  <p className="text-gray-600">Solar installations can increase your home value by up to 4%</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Environmental Impact</h4>
                  <p className="text-gray-600">Reduce your carbon footprint and help fight climate change</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Government Incentives</h4>
                  <p className="text-gray-600">Take advantage of federal and state tax credits</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/images/w2.jpg"
              alt="Solar installation team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1000+ Happy Customers</h3>
            <p className="text-gray-600">We've helped over 1000 families switch to solar energy</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning Service</h3>
            <p className="text-gray-600">Recognized for excellence in solar installation and customer service</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">25 Year Warranty</h3>
            <p className="text-gray-600">All our solar panels come with a comprehensive 25-year warranty</p>
          </div>
        </div>
      </div>
    </section>
  )
}
