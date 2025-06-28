import { Toaster } from "react-hot-toast"
import ClientProviders from "./ClientProviders"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
          <Toaster position="top-right" />
        </ClientProviders>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
