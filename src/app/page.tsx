import { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import Heading from '@/components/ui/Heading'
import { cn } from '@/lib/utils'
import Paragraph from '@/components/ui/Paragraph'
import Link from 'next/link'


const urbanist = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sami Scouting",
  description: "Purpose built scouting app for team 155"
}

export default function Home() {
  return (
    <main className='pt-32 px-16 md:px-48 flex flex-col'>
      <Heading size="lg" className={cn("text-left", urbanist.className)}>Sami Scouting</Heading>
      <Heading size="sm" className='text-left font-semibold dark:text-slate-300'>Purpose-Built Scouting App</Heading>

      <Paragraph className='text-left py-8'>Get started, create your{" "}<Link className="underline hover:text-slate-900 hover:dark:text-slate-300 transition-colors" href="/logs"> First Log</Link></Paragraph>
    </main>
  )
}
