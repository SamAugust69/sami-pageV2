import { Metadata } from 'next'
import NewLog from '@/components/NewLog'

export const metadata: Metadata = {
  title: "Sami Scouting",
  description: "Purpose built scouting app for team 155"
}

export default function Home() {
  return (
    <main className='pt-32 flex justify-center'>
      <NewLog/>
    </main>
  )
}
