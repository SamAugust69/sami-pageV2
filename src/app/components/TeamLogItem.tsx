import { FC, HTMLAttributes } from 'react'
import Paragraph from '@/ui/Paragraph'
import {Button} from '@/ui/Button'
import { ChevronRight, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamLogTabProps extends HTMLAttributes<HTMLDivElement> {
    teamData: any
    className?: any
}

const TeamLogTab: FC<TeamLogTabProps> = ({teamData, className, onClick}) => {
    return (
        <div className={cn('group relative px-4 bg-slate-200 dark:bg-slate-600 flex justify-between', className)}>
            <Paragraph size="xs">{teamData.team}</Paragraph>
            <Button className='flex' variant="hidden" size="xs" onClick={() => onClick}>
                <ChevronRight className='group-hover:scale-0 transition-all'/>
                <ChevronsRight className='absolute scale-0 group-hover:scale-100 transition-all'/>
            </Button>
        </div>
    )
}

export default TeamLogTab