import { FC, HTMLAttributes } from 'react'
import Input from './ui/Input'
import Paragraph from './ui/Paragraph'
import { Button, ToggleButton } from './ui/Button'

interface FormPagesProps extends HTMLAttributes<HTMLDivElement> {
    data: any
}

const AutoPage: FC<FormPagesProps> = ({
    data
}) => {
    console.log(data)
    return (
        <div className='p-2 flex flex-col'>
            <div className='mx-4 flex justify-center gap-2'>
                <ToggleButton toggled={data.dock}>
                    <Paragraph size="sm" className={`m-0 text-slate-600`}>Docked</Paragraph>
                </ToggleButton>

            </div>
            <span className='border-b-2 mx-auto w-72 border-slate-400 rounded my-2'></span>
            <Input onChange={(e: any) => { data.cones[0] = parseInt(e.target.value)}} placeholder={data.cones}>Cones Scored</Input>
            <Input onChange={(e: any) => { data.cones[0] = parseInt(e.target.value)}} placeholder={data.cubes}>Cubes Scored</Input>
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