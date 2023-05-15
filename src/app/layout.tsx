import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Providers from "@/components/Providers"
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { buttonVariants } from '@/ui/Button'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(
        "bg-slate-400 antialiased ", inter.className
      )}>
      <head>
        <link rel="manifest" href="./manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </head>
      <body className="flex min-h-screen bg-slate-300 dark:bg-slate-700 antialiased">
        <Providers>
          <Navbar/>
          {children}
          <span className='text-sm absolute bottom-0 right-0 mx-2'>ver-3!</span>
        </Providers>
      </body>
    </html>
  )
}
