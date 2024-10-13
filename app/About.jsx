"use client";

import { motion } from "framer-motion";
import { Rubik } from "next/font/google";
import Image from "next/image";
import AboutUSIMG from "../public/images/ik.webp";

const rubik = Rubik({ subsets: ["latin"] });

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 2 } },
};

export default function About() {
  return (
    <div className={`${rubik.className} overflow-x-hidden`} id="about">
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col-reverse lg:flex-row mt-16 lg:mt-0 md:mt-0 px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={imageVariants}
            className="w-full lg:w-1/2 p-4 glass rounded-2xl md:mx-4"
          >
            <Image
              alt="Hero Image"
              src={AboutUSIMG}
              className="w-full  rounded-2xl"
              layout="responsive"
            />
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 lg:max-w-md"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
          >
            <p className="my-2 w-[200px] p-1 text-primary font-medium rounded-xl">
              About us
            </p>
            <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide text-white">
              We specialize in{" "}
              <div className="text-xl p-4">
                <span className="text-primary">Electrical Installations</span>{" "}
                <br />
                <span className="text-primary">Solar Installations</span> <br />
                <span className="text-primary">CCTV Installations</span> <br />
                <span className="text-primary">Maintenance Services</span>
              </div>
            </h1>
            <div className="py-6 text-white text-sm lg:text-md mb-2 font-semibold">
              <p className="mb-2">
                Our team of experts guarantees swift and reliable solutions,
                ensuring minimum downtime and maximum effciency. With a strong
                focus on quality and customer satisfaction, we have established
                ourselves as a trusted name in the industry. Count on us for all
                your electrical, solar, and security needs.
              </p>
            </div>
            <div className="flex flex-row">
              <motion.button
                className="btn btn-primary mr-1 text-white text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
              >
                <a href="tel:+2349021055672">Call Now : 09021055672</a>{" "}
              </motion.button>
              {/* <motion.button
                className="btn btn-secondary ml-1 text-white text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
              >
                Learn more
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
