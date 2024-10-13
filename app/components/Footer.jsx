"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="footer bg-base-300 text-neutral-content p-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex justify-start items-start flex-col"
      >
        <img src="/images/logoy.png" alt="" className=" max-w-sm" />

        <p></p>
      </motion.aside>
      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-ROW gap-4">
          <a href="tel:+2349021055672">Call Now : 09021055672</a>
          <a href="tel:+2347049698473">Call Now : 07049698473</a>
          {/* address div */}
          <div>
            <p className="max-w-lg">
              Address: SHOP 4 I.K UMAR AUDI OLD AIRPORT ROAD, AFTER BOMAS
              SUPERMARKET, MINNA, NIGER STATE.
            </p>
          </div>
        </div>
      </motion.nav>
    </motion.footer>
  );
}
