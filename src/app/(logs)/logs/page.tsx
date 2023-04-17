"use client"

import { FC, useState } from 'react'
import { Metadata } from 'next'
import { uuid as uuidv4 } from 'uuidv4';
import ServerLogs from '@/components/ServerLogs'

export const metadata: Metadata = {
    title: "Sami Scouting | Logs",
    description: "Purpose built scouting app for team 155"
}

const serverLogs = [
    {
        "id": uuidv4(),
        "info":{
            "match": ["7"],
            "team": ["6346"]
        }
    },
    {
        "id": uuidv4(),
        "info":{
            "match": ["7"],
            "team": ["657"]
        }
    },
    {
        "id": uuidv4(),
        "info":{
            "match": ["8"],
            "team": ["657"]
        }
    },
    {
        "id": uuidv4(),
        "info":{
            "match": ["8"],
            "team": ["6346"]
        }
    },
]

const matchInfo: any = []
// {
//     "match": "1",
//     "first_name": "Fart",
//     "teams": [
//         {"team": "345"},
//         {"team": "2345"},
//         {"team": "1234"},
//         {"team": "654"},
//         {"team": "123"},
//         {"team": "234"},
//     ]
// },

interface pageProps {

}

const page: FC<pageProps> = () => {
    const [serverLogs, setServerLogs] = useState([])

    const fetchServerLogs = async () => {
        // add fetch functionality later
        setServerLogs(serverLogs)
    }
    return (
        <main className='py-32 px-2 flex justify-center flex-wrap items-start'>
            <ServerLogs matchInfo={matchInfo}/>
        </main>
    )
}

export default page