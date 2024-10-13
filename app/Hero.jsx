"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <motion.div
        className="hero min-h-screen bgImg bg-cover bg-no-repeat"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="hero-content text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </motion.div>
    </>
  );
}
