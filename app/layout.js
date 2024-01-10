"use client"

import { Tektur } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { NavigationMenuDemo } from "@/components/ui/navigation"
import { Toaster } from "sonner"

const tektur = Tektur({ subsets: ["latin"] })

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <body className={tektur.className}>
          <NavigationMenuDemo />
          {/* <Toaster /> */}
          {children}
          <Toaster position="top-right" />
        </body>
      </ThemeProvider>
    </html>
  )
}

export default RootLayout
