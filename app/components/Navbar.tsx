import { Agbalumo } from "next/font/google"
import type React from "react"
import Link from "next/link"
import { Settings } from "lucide-react"

const roboto = Agbalumo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function Navbar(): React.ReactElement {
  return (
    <>
      <div className={`navbar ${roboto.className} tracking-widest`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-white dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#hero">Homepage</a>
              </li>
              <li>
                <a href="#carousel">Products</a>
              </li>
              <li>
                <a href="#whyus">Why Us</a>
              </li>
              <li>
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center flex justify-center items-center">
          <img src="/images/logoy.png" alt="" className="max-w-36" />
        </div>
        <div className="navbar-end">
          {/* Desktop Admin Button */}
          <div className="hidden md:block">
            <Link
              href="/admin/dashboard"
              className="btn btn-ghost text-white hover:bg-primary hover:text-white flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
