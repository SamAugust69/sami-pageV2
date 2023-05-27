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
    setUnsavedLogs: any
    unsavedLogs: any
}

const LogButtons: FC<LogButtonsProps> = ({displayedLogs, setDisplayedLogs, localLogs, setLocalLogs, setUnsavedLogs, unsavedLogs}) => {

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

    const saveLogs = () => {
        var newLogs: any = []
        unsavedLogs.map((val: any) => {
            console.log(`--------------`)
            console.log(unsavedLogs)
            console.log(`adding unsaved log to local`)
            console.log(`${val.info.match}, ${val.info.team}, ${val.id}`)
            if (localLogs.some((ele: any) => ele.id === val.id) === false) {
                console.log("log wasn't found in local, adding new log")
                setLocalLogs([...localLogs, val])
                setUnsavedLogs(unsavedLogs.filter((item: any) => item.id !== val.id))
            } else {
                console.log("log was found in local, updating log")
                setLocalLogs(localLogs.map((item: any) => {
                    if (item.id == val.id) {
                        console.log(`Found log ${item.info.match}, ${item.info.team}, ${item.id}`)
                        setUnsavedLogs(unsavedLogs.filter((item: any) => item.id !== val.id))
                        return val
                    } else {
                        console.log(`Log not found, adding existing ${item.info.match}, ${item.info.team}, ${item.id}`)
                        return item
                    }
                }))
            }
            console.log(`Finished, updating with new logs =>`)
            console.log(localLogs)
            console.log(`--------------`)
            //setLocalLogs([...newLogs])
        })
    }

    return (
        <div className='flex items-center justify-center'>
            <Button size="icon" onClick={() => addNewLog()}><GrFormAdd className='w-5 h-5'/></Button>
            <Button size="lg" onClick={() => saveLogs()}>Save Local Logs</Button>
        </div>
    )
}

export default LogButtons