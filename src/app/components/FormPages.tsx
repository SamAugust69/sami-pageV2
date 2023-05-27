import { FC, HTMLAttributes } from 'react'
import Input from './ui/Input'
import Paragraph from './ui/Paragraph'
import { Button, ToggleButton } from './ui/Button'
import ScoringGrid from './ScoringGrid'

interface FormPagesProps extends HTMLAttributes<HTMLDivElement> {
    data: any
    unsavedLogs: any
    setUnsavedLogs: any
}

const AutoPage: FC<FormPagesProps> = ({
    data, unsavedLogs, setUnsavedLogs
}) => {

    const saveInfoAt = () => {
        if (unsavedLogs.includes(data) == false) {
            setUnsavedLogs([...unsavedLogs, data]) 
        } else {
            var newUnsavedLogs = unsavedLogs.map((val: any) => {
                if (val.id == data.id) {
                    return data
                } else {
                    return val
                }
            })
            setUnsavedLogs(newUnsavedLogs)
        }
        console.log(unsavedLogs)
    }   

    return (
        <div className='p-2 flex flex-col'>
            <div className='mx-4 flex justify-center gap-2 flex-wrap'>
                <ToggleButton toggled={data.auto.move}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Moved</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.leave}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Leave</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.dock}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Docked</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.score}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Scored</Paragraph>
                </ToggleButton>
                <ToggleButton toggled={data.auto.engage}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Engage</Paragraph>
                </ToggleButton>
            </div>
            <span className='border-b-2 mx-auto w-72 border-slate-400 rounded my-2'></span>
            <Input onChange={(e: any) => { data.auto.cones[0] = parseInt(e.target.value); saveInfoAt()}} placeholder={data.auto.cones}>Cones Scored</Input>
            <Input onChange={(e: any) => { data.auto.cubes[0] = parseInt(e.target.value); saveInfoAt()}} placeholder={data.auto.cubes}>Cubes Scored</Input>

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