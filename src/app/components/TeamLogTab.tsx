import { FC, HTMLAttributes, useEffect, useState } from 'react';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { ChevronRight, ChevronsRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleDeleteLog } from '@/lib/api';

interface TeamLogTabProps extends HTMLAttributes<HTMLDivElement> {
	teamData: any;
	className?: any;
	displayedLogs: any;
	currentData: any;
	setDisplayedLogs: any;
	matchData: any;
}

const TeamLogTab: FC<TeamLogTabProps> = ({ currentData, teamData, className, displayedLogs, setDisplayedLogs }) => {
	const [isPresent, setIsPresent] = useState(false);

	// fart is bad work
	const [logs, setLogs] = useState<any>(displayedLogs);

	useEffect(() => {
		logs.some((item: any) => item.id === teamData.id) ? setIsPresent(true) : setIsPresent(false);
		setDisplayedLogs(logs);
	}, [logs]);

	const addLog = () => {
		currentData.map((log: any) => {
			if (log.id === teamData.id && displayedLogs.some((item: any) => item.id === teamData.id) != true) {
				setLogs([...displayedLogs, log]);
			}
		});
	};

	const removeLog = (id: any) => {
		console.log(logs);
		var i = displayedLogs.findIndex((object: any) => object.id === id);
		var newLogs = displayedLogs.filter((log: any) => log !== displayedLogs[i]);
		setLogs(newLogs);
		//setLogs(newLogs)
	};

	const deleteLocalLog = (id: any) => {
		console.log(id);
	};

	console.log(teamData);
	return (
		<div
			className={cn(
				'group relative px-4 py-1 md:py-2 bg-slate-200 dark:bg-slate-600 flex items-center justify-between',
				className
			)}
		>
			<div className="flex">
				<Paragraph
					size="xs"
					onClick={() => {
						teamData.disabled ? handleDeleteLog(teamData.id) : deleteLocalLog(teamData.id);
					}}
					className={`hover:line-through hover:text-red-500 dark:hover:text-red-500 hover:cursor-pointer m-0 transition-colors ${
						isPresent ? 'text-[#6c837d] dark:text-[#a3c8be]' : ''
					}`}
				>
					{teamData.team}
				</Paragraph>
				{/* <Paragraph size="xs" className='m-0 pl-2 font-mono text-xs'>{isPresent ? "true" : "false"}</Paragraph> */}
			</div>
			<Button
				className="flex"
				variant="hidden"
				size="xs"
				onClick={() => {
					!isPresent ? addLog() : removeLog(teamData.id);
				}}
			>
				<ChevronRight className="group-hover:scale-0 transition-all" />
				{!isPresent && <ChevronsRight className="absolute scale-0 group-hover:scale-100 transition-all" />}
				{isPresent && <X className="absolute scale-0 group-hover:scale-100 transition-all text-rose-500" />}
			</Button>
		</div>
	);
};

export default TeamLogTab;

// add to displayed logs based on id from active logs`
