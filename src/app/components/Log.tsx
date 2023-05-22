
import { FC, useEffect, useState } from 'react'
import Heading from '@/ui/Heading'
import EditableLable from "@/ui/EditableLabel"
import Paragraph from './ui/Paragraph'
import { Button } from './ui/Button'

interface LogProps {
    data: any
}

const EditableLog: FC<LogProps> = ({data}) => {

    const [ open, setOpen ] = useState(false)
    const [ logData, setLogData ] = useState(data)

    useEffect(() => {
        console.log(logData)
        console.log(data)
    }, [logData])

    return (
        <div className='flex-shrink-0 self-start rounded border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-md w-80 md:w-96'>
            <div className='flex py-2 justify-between items-center'>
                <div className='flex items-center gap-4 px-4'>
                    <Button size="sm" onClick={() => setOpen(!open)}>Close</Button>
                    <div>
                        {/* setLogData({...logData, info: {...logData.info, match: [e.target.value]}}) */}
                        {/* data.info.match[0] = e.target.value */}
                        <EditableLable label="MATCH:" onChange={(e: any) => setLogData({...logData, info: {...logData.info, match: [e.target.value]}})}/>
                        <EditableLable label="TEAM:" onChange={(e: any) => data.info.team[0] = e.target.value}/>
                    </div>
                    <span className='border-r-2 h-10 border-slate-400 rounded hidden md:block'></span>
                    <div className='hidden md:block'>
                        <Paragraph size="sm" className='m-0 text-left text-slate-500'>SCOUT</Paragraph>
                        <Paragraph size="sm" className='m-0 text-left font-semibold text-slate-700'>{typeof data.info.scout[0] === "string" ? data.info.scout : "N/A"}</Paragraph>
                    </div>
                </div>
                <div className={`h-8 flex items-center justify-center px-2 rounded-l ${data.disabled === true ? "border-[#98aa9c] bg-[#6c837d]" : "border-[#ee1145] bg-[#f2524f]"} border-y-2 border-l-2`}>
                    <Paragraph size="sm" className='m-0 text-left font-medium tracking-wide text-slate-200'>{data.disabled === true ? "SERVER" : "LOCAL"}</Paragraph>
                </div>
            </div>
            {open &&
            <div className='border-t-2 dark:border-slate-800 px-4'>
                {JSON.stringify(logData)}
            </div>
            }
        </div>
    )
}

export {
    EditableLog
}