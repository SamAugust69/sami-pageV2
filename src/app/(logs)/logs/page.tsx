import { FC } from 'react'
import { Metadata } from 'next'
import ServerLogs from '@/components/ServerLogs'

export const metadata: Metadata = {
    title: "Sami Scouting | Logs",
    description: "Purpose built scouting app for team 155"
}

const matchInfo = [
    {
        "match": "1",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },
    {
        "match": "2",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },
    {
        "match": "1",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },
    {
        "match": "2",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },
    {
        "match": "1",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },
    {
        "match": "2",
        "first_name": "Fart",
        "teams": [
            {"team": "345"},
            {"team": "2345"},
            {"team": "1234"},
            {"team": "654"},
            {"team": "123"},
            {"team": "234"},
        ]
    },

]

interface pageProps {

}

const page: FC<pageProps> = ({}) => {
    return (
        <main className='py-32 px-2 flex justify-center flex-wrap items-start'>
            <ServerLogs matchInfo={matchInfo}/>
        </main>
    )
}

export default page