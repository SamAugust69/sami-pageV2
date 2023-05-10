import { FC } from 'react'


interface LogsSectionProps {
    logsToDisplay: any
}

const LogsSection: FC<LogsSectionProps> = ({logsToDisplay}) => {
    return (
        !logsToDisplay === null &&
        logsToDisplay.map((val: any, key: number) => {
            return (
                <div key={key}>fart</div>
            )
        })
    )
}

export default LogsSection