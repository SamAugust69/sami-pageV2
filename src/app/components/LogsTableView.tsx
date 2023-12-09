import { FC, HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { cn } from '../lib/utils';
import { usePagination } from '@mantine/hooks';

interface LogsTableViewProps {
	displayedMatches: Array<any>;
}

const ITEMS_PER_PAGE = 5;

const LogsTableView: FC<LogsTableViewProps> = ({ displayedMatches }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const [visibleResults, setVisibleResults] = useState(displayedMatches.slice(0, ITEMS_PER_PAGE));

	const pagination = usePagination({
		total: Math.ceil(displayedMatches.length / ITEMS_PER_PAGE),
		initialPage: 1,
		onChange(page) {
			const start = (page - 1) * ITEMS_PER_PAGE;
			const end = start + ITEMS_PER_PAGE;
			setVisibleResults(displayedMatches.slice(start, end));
		},
	});

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		const start = (pagination.active - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		setVisibleResults(displayedMatches.slice(start, end));
	}, [displayedMatches]);

	return (
		<div className="rounded shadow-md border-2 bg-slate-200 dark:bg-slate-600 border-slate-400 dark:border-slate-800 ">
			<div>
				<div className="bg-slate-300 border-b-2 border-slate-400 dark:border-slate-700 flex justify-between">
					<div className="flex">
						<p className="text-left px-4 py-3 font-normal text-sm select-none w-32">Match</p>
						<p className="text-left px-4 py-3 font-normal text-sm select-none">Teams</p>
					</div>
					<div className=""></div>
				</div>
				{isLoaded && (
					<ul>
						<AnimatePresence initial={false}>
							{displayedMatches.length > 0 &&
								visibleResults.map((data: any, key: number) => {
									return (
										<TableRow key={key} className="flex">
											<p className="text-left px-4 py-3 font-normal text-sm select-none w-32">{data.match}</p>
											<p className="text-left px-4 py-3 font-normal text-sm select-none">
												{data.teams.map((teamData: any, key: number) => {
													return `${teamData.team}${key !== data.teams.length - 1 ? ',' : ''}  `;
												})}
											</p>
										</TableRow>
									);
								})}
						</AnimatePresence>
					</ul>
				)}
			</div>
		</div>
	);
};

interface TableRowProps extends HTMLAttributes<HTMLLIElement> {}

const TableRow = forwardRef<HTMLLIElement, TableRowProps>(({ children, className }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<motion.li
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: 'auto' }}
				exit={{ opacity: 0 }}
				transition={{ duration: 2, layout: { type: 'spring' } }}
				layout
				onClick={() => setOpen(!open)}
				className={cn(` ${open ? 'border-0' : 'border-b'} border-slate-400 dark:border-slate-700 flex flex-col`, className)}
			>
				<div className="flex">{children}</div>
				{open && (
					<motion.div className={`border-b border-slate-400 dark:border-slate-700 bg-slate-200 shadow-inner py-3 px-4`}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates odit magnam culpa vero animi, quae
						ratione veniam ducimus optio a dolor et cum sequi exercitationem sapiente neque at praesentium.
					</motion.div>
				)}
			</motion.li>
		</>
	);
});

export default LogsTableView;
