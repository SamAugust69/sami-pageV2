import { FC } from 'react'
import Paragraph from '@/ui/Paragraph'
import Heading from '@/ui/Heading'

interface TopCardsProps {
    serverLength: number
    localLength: number
}


const TopCards: FC<TopCardsProps> = ({serverLength, localLength}) => {
    return (
        <div className='grid gap-4 lg:grid-cols-2' >
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 p-6 py-4 w-full'>
                <Heading className='font-bold text-left'>218</Heading>
                <Heading size="sm" className='font-normal text-slate-600 dark:text-slate-400 text-left'>Total Logs</Heading>
            </div>
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 px-6 py-2 w-full flex justify-between'>
                <div className='rounded bg-slate-300 p-2 w-1/2 flex items-center justify-center flex-col'>
                    <Heading size="xs" className='font-normal text-slate-500'>Server Logs</Heading>
                    <p className='font-normal text-xl'>{serverLength}</p>
                </div>
                <div className='rounded p-2 w-1/2 flex items-center justify-center flex-col'>
                    <Heading className='font-normal text-slate-500' size="xs">Local Logs</Heading>
                    <p className='font-normal text-xl'>{localLength}</p>
                </div>
            </div>
        </div>
    )
}

export default TopCards