import { FC } from 'react'
import { Button, IconButton } from './ui/Button'
import { GrFormAdd } from "react-icons/gr"
import { HiddenSearchBar } from './ui/SearchBar'

interface LogButtonsProps {

}

const LogButtons: FC<LogButtonsProps> = ({}) => {
    return (
        <div>
            <Button size="icon"><GrFormAdd className='w-5 h-5'/></Button>
            <HiddenSearchBar/>
        </div>
    )
}

export default LogButtons