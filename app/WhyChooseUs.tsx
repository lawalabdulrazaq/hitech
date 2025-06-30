"use client"

import Image from "next/image"
import { motion, type HTMLMotionProps } from "framer-motion"
import FirstImage from "../public/images/we.webp"
import SecondImage from "../public/images/we2.webp"
import ThirdImage from "../public/images/we3.jpg"
import { Rubik } from "next/font/google"
import type React from "react"

// Type assertion helper for motion components
const MotionDiv = motion.div as React.ComponentType<HTMLMotionProps<"div">>
const MotionH1 = motion.h1 as React.ComponentType<HTMLMotionProps<"h1">>
const MotionP = motion.p as React.ComponentType<HTMLMotionProps<"p">>
const MotionButton = motion.button as React.ComponentType<HTMLMotionProps<"button">>

const rubik = Rubik({ subsets: ["latin"] })

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      when: "beforeChildren" as const,
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
}

export default function WhyChooseUs(): React.ReactElement {
  return (
    <div className={`${rubik.className} overflow-x-hidden`} id="services">
      <div className="py-8 p-8 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <MotionH1
            variants={titleVariants}
            whileInView="visible"
            initial="hidden"
            className="uppercase px-2 text-3xl font-bold text-primary"
          >
            Why Choose Us
          </MotionH1>
          <MotionP
            variants={subtitleVariants}
            whileInView="visible"
            initial="hidden"
            className="my-4 px-4 text-center text-lg font-semibold text-white mb-10"
          >
            We assure our clients of continued support throughout and after the incorporation process.
          </MotionP>
        </div>

        {/* Grid */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-12"
        >
          <MotionDiv
            className="text-white rounded-xl mb-6 flex flex-col px-4"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
          >
            <Image
              src={FirstImage || "/placeholder.svg"}
              className="rounded-t-xl bg-cover w-full h-[200px]"
              alt="Service 1"
            />
            <div className="p-8 flex flex-col justify-between bg-base-300 rounded-b-box flex-1">
              <div>
                <h1 className="lg:text-xl md:text-xl text-lg font-bold capitalize mb-2 text-start text-white pb-4">
                  Expertise You Can Trust
                </h1>
                <p className="text-start text-md text-white">
                  Our team is composed of industry experts with years of experience. We stay updated with the latest
                  advancements to ensure you receive top-quality service every time.
                </p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className="text-white rounded-xl mb-6 flex flex-col px-4"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
          >
            <Image
              src={SecondImage || "/placeholder.svg"}
              className="rounded-t-xl bg-contain w-full h-[200px]"
              alt="Service 2"
            />
            <div className="p-8 flex flex-col justify-between bg-base-300 rounded-b-box flex-1">
              <div>
                <h1 className="lg:text-xl md:text-xl text-lg font-bold capitalize mb-2 text-start text-white pb-4">
                  Tailored Solutions{" "}
                </h1>
                <p className="text-start text-md text-white">
                  We understand that every project is unique. That's why we offer customized solutions designed to meet
                  your specific needs, ensuring optimal results and complete satisfaction.{" "}
                </p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className="text-white rounded-xl mb-6 flex flex-col px-4"
            variants={itemVariants}
            whileInView="visible"
            initial="hidden"
          >
            <Image
              src={ThirdImage || "/placeholder.svg"}
              className="rounded-t-xl bg-cover w-full h-[200px]"
              alt="Service 3"
            />
            <div className="p-8 flex flex-col justify-between bg-base-300 rounded-b-box flex-1">
              <div>
                <h1 className="lg:text-xl md:text-xl text-lg font-bold capitalize mb-2 text-start text-white pb-4">
                  Commitment to Quality{" "}
                </h1>
                <p className="text-start text-md text-white">
                  Quality is at the heart of everything we do. From the materials we use to the craftsmanship we
                  deliver, we guarantee exceptional standards that you can rely on.{" "}
                </p>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
        <MotionButton
          className="btn btn-primary mr-1 text-white text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
        >
          <a href="tel:+2349021055672">Call Now : 09021055672</a>{" "}
        </MotionButton>
      </div>
    </div>
  )
}
