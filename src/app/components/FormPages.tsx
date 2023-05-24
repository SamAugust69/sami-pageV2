import { FC } from 'react'

interface FormPagesProps {

}

const AutoPage: FC<FormPagesProps> = ({}) => {
    return (
        <div>
            auto
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