import { FC } from 'react'
import Paragraph from '@/ui/Paragraph'

interface LogProps {

}

const Log: FC<LogProps> = ({}) => {
    return (
        <div className='container border w-72 h-64  rounded'>
            <Paragraph size="sm">Log Example</Paragraph>
        </div>
    )
}

export default Log

