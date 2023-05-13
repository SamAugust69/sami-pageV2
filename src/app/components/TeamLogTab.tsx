import { FC, HTMLAttributes } from 'react'
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

const TeamLogTab: FC<TeamLogTabProps> = ({currentData, teamData, className, displayedLogs, setDisplayedLogs, matchData}) => {

    const addLog = () => {
        // console.log(matchData)
        // matchData.map((matchInfo: any) => {
        //     if (matchInfo.match === teamData.match) {
        //         console.log(matchInfo)
        //         console.log(currentData)
        //         currentData.map((log: any) => {
        //             console.log(log.info.team[0])
        //             matchInfo.teams.map((fart: any) => {console.log(fart.team)})

        //         })
        //     }
        // })
        // setDisplayedLogs([...displayedLogs, {}])

        // to achieve: add log from currentData with the same id as the button pressed
        currentData.map((log: any) => {
            if (log.id === teamData.id) {
                setDisplayedLogs([...displayedLogs, log])
                console.log(displayedLogs)
            }
        })
    }

    return (
        <div className={cn('group relative px-4 bg-slate-200 dark:bg-slate-600 flex justify-between', className)}>
            <Paragraph size="xs">{teamData.team}</Paragraph>
            
            <Button className='flex' variant="hidden" size="xs" onClick={() => {addLog()}}>
                <ChevronRight className='group-hover:scale-0 transition-all'/>
                <ChevronsRight className='absolute scale-0 group-hover:scale-100 transition-all'/>
            </Button>
        </div>
    )
}

export default TeamLogTab

// add to displayed logs based on id from active logs`