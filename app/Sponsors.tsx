"use client"

import type React from "react"
import { motion } from "framer-motion"

export default function Sponsors(): React.ReactElement {
  return (
    <div className="py-8 p-8 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
              },
            },
          }}
          whileInView="visible"
          initial="hidden"
          className="uppercase px-2 text-3xl font-bold text-primary"
        >
          Partners
        </motion.h1>
        <motion.div
          className="mt-8 flex items-center justify-center max-w-md p-4 glass rounded-lg"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                delay: 0.2,
              },
            },
          }}
          whileInView="visible"
          initial="hidden"
        >
          <img src="/images/sp1.jpg" alt="" />
        </motion.div>
      </div>
    </div>
  )
}
