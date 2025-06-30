"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import Image, { type StaticImageData } from "next/image"
import w1 from "./image/1w.jpg"
import w2 from "./image/2w.jpeg"
import w3 from "./image/3w.webp"
import w4 from "./image/4w.png"
import w5 from "./image/5w.jpg"
import w6 from "./image/6w.webp"
import w7 from "./image/7w.webp"
import w8 from "./image/8w.png"
import w9 from "./image/9w.webp"

interface CarouselImage {
  src: StaticImageData
  alt: string
  caption: string
}

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  const carouselData = {
    images: [
      { src: w1, alt: "First slide", caption: "Solar street light" },
      { src: w2, alt: "Second slide", caption: "Lithium solar batteries" },
      { src: w7, alt: "Seventh slide", caption: "DC Protector" },
      { src: w9, alt: "Ninth slide", caption: "Solar Street Light" },
      { src: w3, alt: "Third slide", caption: "Lithium solar batteries" },
      { src: w5, alt: "Fifth slide", caption: "Surge protector" },
      { src: w6, alt: "Sixth slide", caption: "DC Protector" },
      { src: w4, alt: "Fourth slide", caption: "Lithium solar batteries" },
      { src: w8, alt: "Eighth slide", caption: "DC Protector" },
    ] as CarouselImage[],
  }

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex === carouselData.images.length - 1 ? 0 : prevIndex + 1))
    }
  }, [isTransitioning, carouselData.images.length])

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselData.images.length - 1 : prevIndex - 1))
    }
  }, [isTransitioning, carouselData.images.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-14">
      <div className="relative h-[400px] w-full">
        {carouselData.images.map((image, index) => {
          const offset = ((index - currentIndex + carouselData.images.length) % carouselData.images.length) - 1
          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out`}
              style={{
                transform: `translateX(${offset * 100}%)`,
                opacity: Math.abs(offset) <= 1 ? 1 : 0,
                zIndex: offset === 0 ? 2 : 1,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-center text-lg">{image.caption}</p>
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10"
      >
        <MdChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10"
      >
        <MdChevronRight className="w-8 h-8" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselData.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
