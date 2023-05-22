import { FC } from 'react'
import { Button, IconButton } from './ui/Button'
import { GrFormAdd } from "react-icons/gr"
import { HiddenSearchBar } from './ui/SearchBar'
import { v4 } from "uuid"

interface LogButtonsProps {
    displayedLogs: any
    setDisplayedLogs: any
    localLogs: any
    setLocalLogs: any
}

const LogButtons: FC<LogButtonsProps> = ({displayedLogs, setDisplayedLogs, localLogs, setLocalLogs}) => {

    //needs to have the ability to add a new log to local logs, and display it..!!!

    const blankLog = {
        id: v4(),
        disabled: false,
        info: { match: ['0'], team: ['0'], scout: [""], notes: [""]
        },
        auto: { move: [false], score: [false], leave: [false], dock: [false], engage: [false], cones: [0], cubes: [0], scoreLocations: [
                [ ["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"] ],
                [ ["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"] ],
                [ ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"] ]
            ]
        },
        teleop: { conesAttempted: [0], cones: [0], cubes: [0], cubesAttempted: [0], dock: [false], engage: [false], scoreLocations: [
                [ ["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"] ],
                [ ["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"] ],
                [ ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"] ]
            ]
        }
    }
    
    const addNewLog = () => {
        setDisplayedLogs([...displayedLogs, blankLog])
    }

    return (
        <div>
            <Button size="icon" onClick={() => addNewLog()}><GrFormAdd className='w-5 h-5'/></Button>
            <Button onClick={() => setDisplayedLogs(displayedLogs)}>Save Local Logs</Button>
        </div>
    )
}

export default LogButtons