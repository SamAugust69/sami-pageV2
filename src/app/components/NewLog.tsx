"use client"

import { FC, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import Button from '@/ui/Button'
import { motion, AnimatePresence } from "framer-motion"
import Input from '@/ui/Input'

interface NewLogProps {

}

const NewLog: FC<NewLogProps> = ({}) => {
    const [ open, setOpen ] = useState(false)

    return (
        <div className='rounded border border-slate-700 dark:border-slate-600 shadow-md dark:bg-slate-800 w-96'>
            <div className='border-b border-slate-700 dark:border-slate-600 flex justify-between p-2'>
                <Button size="sm" onClick={() => setOpen(!open)}>Close</Button>
                <div className='flex flex-col'>
                    <Paragraph size="sm">Team</Paragraph>
                </div>
            </div>
            <AnimatePresence>
                {open &&
                <motion.div 
                className='px-2 border-slate-600'
                transition={{ duration: .1 }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1}}
                exit={{ y: -10, opacity: 0 }}
                >
                    <Input>Fart</Input>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default NewLog