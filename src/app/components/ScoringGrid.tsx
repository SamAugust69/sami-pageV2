import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import {REDUCER_ACTION_TYPE} from "@/lib/unsavedReducer"


interface ScoringGridButtonProps extends HTMLAttributes<HTMLButtonElement> {
    buttonInfo: any
    data: any
    unsavedLogs: any
    dispatch: any
}

const ScoringGridButton: FC<ScoringGridButtonProps> = ({
    buttonInfo, data, unsavedLogs, dispatch
}) => {
    const [ active, setActive ] = useState(buttonInfo[0][1])

    const saveInfo = () => {
        if (unsavedLogs.includes(data) === false) {
            console.log("adding")
            dispatch({ type: REDUCER_ACTION_TYPE.ADDED_LOG, payload: data})
        } else {
            console.log("updating")
            dispatch({ type: REDUCER_ACTION_TYPE.UPDATED_LOG, payload: data})
        }
    }   

    return (
        <Button 
            onClick={() => {
                setActive(active === "0" ? "1" : "0"); 
                active === "0" ? buttonInfo[0] = `${buttonInfo[0][0]}1` : buttonInfo[0] = `${buttonInfo[0][0]}0`
                saveInfo(); 
                console.log(data)}
            } 
            size="square"
            variant="unstyled" 
            className={`
                ${active === "1" ? "brightness-100 border-2 border-slate-700 dark:border-slate-100" : "brightness-90"} 
                ${buttonInfo[0][0] === "0" ? "bg-purple-400 dark:bg-purple-500" : ""} 
                ${buttonInfo[0][0] === "1" ? "bg-orange-400 dark:bg-orange-500" : ""} 
                ${buttonInfo[0][0] === "2" ? "bg-slate-400 dark:bg-slate-500" : ""}
            `}
        />
    )
}


interface ScoringGridProps {
    grid: any
    data: any
    unsavedLogs: any
    dispatch: any
}


const ScoringGrid: FC<ScoringGridProps> = ({
    grid, data, unsavedLogs, dispatch
}) => {
    return (
        <div className='flex flex-col items-center gap-2'>
            {grid.map((row: any) => {
                return (
                    <div className='flex gap-2'>
                        {row.map((piece: any) => {

                            return (
                                <ScoringGridButton buttonInfo={piece} data={data} unsavedLogs={unsavedLogs} dispatch={dispatch}/>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default ScoringGrid