import { FC, HTMLAttributes, useEffect, useReducer } from 'react'
import Input from './ui/Input'
import Paragraph from './ui/Paragraph'
import { Button, ToggleButton } from './ui/Button'
import ScoringGrid from './ScoringGrid'
import {unsavedReducer, REDUCER_ACTION_TYPE} from "@/lib/unsavedReducer"

interface FormPagesProps extends HTMLAttributes<HTMLDivElement> {
    data: any
    unsavedLogs: any
    dispatch: any
}


const AutoPage: FC<FormPagesProps> = ({
    data, unsavedLogs, dispatch
}) => {


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
        <div className='p-2 flex flex-col'>
            <div className='mx-4 flex justify-center gap-2 flex-wrap'>
                <ToggleButton toggled={data.auto.move[0]} dispatch={dispatch} data={data} unsavedLogs={unsavedLogs}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Moved</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.leave[0]} dispatch={dispatch} data={data} unsavedLogs={unsavedLogs}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Leave</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.dock[0]} dispatch={dispatch} data={data} unsavedLogs={unsavedLogs}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Docked</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.score[0]} dispatch={dispatch} data={data} unsavedLogs={unsavedLogs}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Scored</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.engage[0]} dispatch={dispatch} data={data} unsavedLogs={unsavedLogs}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Engage</Paragraph>
                </ToggleButton>
            </div>
            <span className='border-b-2 mx-auto w-72 border-slate-400 rounded my-2'></span>
            <Input onChange={(e: any) => { data.auto.cones[0] = parseInt(e.target.value); saveInfo()}} placeholder={data.auto.cones}>Cones Scored</Input>
            <Input onChange={(e: any) => { data.auto.cubes[0] = parseInt(e.target.value); saveInfo()}} placeholder={data.auto.cubes}>Cubes Scored</Input>

            <Paragraph>
                Add the scoring grid later 😃
            </Paragraph>
            <ScoringGrid grid={data.auto.sco}/>
        </div>
    )
}

const TeleopPage: FC<FormPagesProps> = ({}) => {
    return (
        <div>
            teleop
        </div>
    )
}

export {
    AutoPage,
    TeleopPage
}