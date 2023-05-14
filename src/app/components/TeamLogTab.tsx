import { FC, HTMLAttributes, useEffect, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import {Button} from '@/ui/Button'
import { ChevronRight, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamLogTabProps extends HTMLAttributes<HTMLDivElement> {
    teamData: any
    className?: any
    displayedLogs: any
    currentData: any
    setDisplayedLogs: any
    matchData: any
}

const TeamLogTab: FC<TeamLogTabProps> = ({currentData, teamData, className, displayedLogs, setDisplayedLogs}) => {

    const [isPresent, setIsPresent] = useState(false)

    useEffect(() => {
        displayedLogs.some((item: any) => item.id === teamData.id) && setIsPresent(true)
    }, [])

    const addLog = () => {
        currentData.map((log: any) => {
            if (log.id === teamData.id && displayedLogs.some((item: any) => item.id === teamData.id) != true) {
                setDisplayedLogs([...displayedLogs, log])
                setIsPresent(true)
            } else {
                setIsPresent(true)
            }
        })
    }

    return (
        <div className={cn('group relative px-4 bg-slate-200 dark:bg-slate-600 flex items-center justify-between', className)}>
            <Paragraph size="xs" className='m-0'>{teamData.team}</Paragraph>
            <Paragraph>{isPresent ? "true" : "false"}</Paragraph>
            <Button className='flex' variant="hidden" size="xs" onClick={() => {addLog()}}>
                <ChevronRight className='group-hover:scale-0 transition-all'/>
                <ChevronsRight className='absolute scale-0 group-hover:scale-100 transition-all'/>
            </Button>
        </div>
    )
}

export default TeamLogTab

// add to displayed logs based on id from active logs`