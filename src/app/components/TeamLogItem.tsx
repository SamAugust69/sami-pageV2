import { FC, HTMLAttributes } from 'react'
import Paragraph from '@/ui/Paragraph'
import {Button} from '@/ui/Button'
import { ChevronRight, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamLogTabProps {
    teamData: any
    className?: any
}

const TeamLogTab: FC<TeamLogTabProps> = ({teamData, className}) => {
    return (
        <div className={cn('group relative px-2 m-1 bg-slate-310 dark:bg-slate-800 flex justify-between', className)}>
            <Paragraph size="xs">{teamData.team}</Paragraph>
            <Button className='flex' variant="hidden" size="xs">
                <ChevronRight className='group-hover:scale-0 transition-all'/>
                <ChevronsRight className='absolute scale-0 group-hover:scale-100 transition-all'/>
            </Button>
        </div>
    )
}

export default TeamLogTab