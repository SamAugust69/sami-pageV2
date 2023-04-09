"use client"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

// Renders children and themes to page
const Providers = ({ children }: {children: ReactNode}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default Providers