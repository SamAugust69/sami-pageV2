import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sami Scouting",
  description: "Purpose built scouting app for team 155"
}

export default function Home() {
  return (
    <main className=''>
      <p>test</p>
    </main>
  )
}
