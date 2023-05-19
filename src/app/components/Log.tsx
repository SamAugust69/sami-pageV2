
import { FC } from 'react'
import Heading from '@/ui/Heading'
import Paragraph from './ui/Paragraph'

interface LogProps {
    data: any
}

const Log: FC<LogProps> = ({data}) => {

    return (
        <div className='flex-shrink-0 self-start rounded border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-2xl w-80 md:w-96'>
            <div className='flex py-2 justify-between items-center'>
                <div className='flex items-center gap-4 px-4'>
                    <div>
                        <Paragraph size="sm" className='m-0 text-left text-slate-500'>MATCH</Paragraph>
                        <Paragraph size="sm" className='m-0 text-left font-semibold text-slate-700'>{typeof data.info.match[0] === "string" ? data.info.match : "N/A"}</Paragraph>
                    </div>
                    <div>
                        <Paragraph size="sm" className='m-0 text-left text-slate-500'>TEAM</Paragraph>
                        <Paragraph size="sm" className='m-0 text-left font-semibold text-slate-700'>{typeof data.info.team[0] === "string" ? data.info.team : "N/A"}</Paragraph>
                    </div>
                    <span className='border-r-2 h-10 border-slate-400 rounded hidden md:block'></span>
                    <div className='hidden md:block'>
                        <Paragraph size="sm" className='m-0 text-left text-slate-500'>SCOUT</Paragraph>
                        <Paragraph size="sm" className='m-0 text-left font-semibold text-slate-700'>{typeof data.info.scout[0] === "string" ? data.info.scout : "N/A"}</Paragraph>
                    </div>
                </div>
                <div className='bg-[#6c837d] h-8 flex items-center justify-center px-2 rounded-l border-[#98aa9c] border-y-2 border-l-2'>
                    <Paragraph size="sm" className='m-0 text-left font-medium tracking-wide text-slate-200'>{typeof data.info.scout[0] === "string" ? "SERVER" : "LOCAL"}</Paragraph>
                </div>
            </div>
        </div>
    )
}

export default Log