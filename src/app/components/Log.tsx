import { FC, useEffect, useState } from 'react';
import { EditableTextLabel } from '@/ui/Labels';
import Paragraph from './ui/Paragraph';
import { Button } from './ui/Button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { REDUCER_ACTION_TYPE } from '@/lib/unsavedReducer';
import { AutoPage, TeleopPage } from '@/components/FormPages';
import { handleExportLog } from '../lib/api';

interface LogProps {
	data: any;
	unsavedLogs: any;
	dispatch: any;
	disabledInput: boolean;
}

const EditableLog: FC<LogProps> = ({ data, unsavedLogs, dispatch, disabledInput }) => {
	//const [fuck, setFuck] = useState(data)

	const { info, auto } = data;

	const pages: any = {
		0: {
			page: <AutoPage disabled={disabledInput} data={data} unsavedLogs={unsavedLogs} dispatch={dispatch} />,
			title: 'Auto',
			num: 1,
		},
		1: {
			page: <TeleopPage disabled={disabledInput} data={data} unsavedLogs={unsavedLogs} dispatch={dispatch} />,
			title: 'Teleop',
			num: 2,
		},
	};

	const saveInfo = () => {
		if (unsavedLogs.includes(data) === false) {
			console.log('adding');
			dispatch({ type: REDUCER_ACTION_TYPE.ADDED_LOG, payload: data });
		} else {
			console.log('updating');
			dispatch({ type: REDUCER_ACTION_TYPE.UPDATED_LOG, payload: data });
		}
	};

	useEffect(() => {
		unsavedLogs.includes(data) ? setSaved(false) : setSaved(true);
		console.log(unsavedLogs);
	}, [unsavedLogs]);

	const [open, setOpen] = useState(false);
	const [saved, setSaved] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);

	return (
		<div className="relative flex-shrink-0 self-start rounded border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-md w-80 md:w-96">
			<div className="flex py-2 justify-between items-center">
				<div className="flex items-center gap-4 px-4">
					<Button size="sm" onClick={() => setOpen(!open)}>
						Close
					</Button>
					<div>
						{/* setLogData({...logData, info: {...logData.info, match: [e.target.value]}}) */}
						{/* data.info.match[0] = e.target.value */}
						<EditableTextLabel
							disabled={disabledInput}
							label="MATCH:"
							placeholder={data.info.match[0]}
							onChange={(e: any) => {
								data.info.match[0] = e.target.value;
								saveInfo();
							}}
						/>
						<EditableTextLabel
							disabled={disabledInput}
							label="TEAM:"
							placeholder={data.info.team[0]}
							onChange={(e: any) => {
								data.info.team[0] = e.target.value;
								saveInfo();
							}}
						/>
					</div>
					<span className="border-r-2 h-10 border-slate-400 rounded hidden md:block"></span>
					<div className="hidden md:block">
						<EditableTextLabel
							disabled={disabledInput}
							label="SCOUT:"
							className="flex flex-col items-center"
							placeholder={data.info.scout[0]}
							onChange={(e: any) => {
								data.info.scout[0] = e.target.value;
								saveInfo();
							}}
						/>
					</div>
				</div>
				<div
					className={`h-8 flex items-center justify-center px-2 rounded-l ${
						data.disabled === true ? 'border-[#98aa9c] bg-[#6c837d]' : 'border-[#ee1145] bg-[#f2524f]'
					} border-y-2 border-l-2 absolute right-0`}
				>
					<Paragraph size="sm" className="m-0 text-left font-medium tracking-wide text-slate-200">
						{data.disabled === true ? 'SERVER' : 'LOCAL'}
					</Paragraph>
				</div>
			</div>
			{open && (
				<div className="border-t-2 border-slate-400 dark:border-slate-800 flex flex-col">
					{pages[currentPage].page}
					<div className="bg-slate-300 dark:bg-slate-500 flex flex-col">
						{disabledInput === false && (
							<Button
								variant="link"
								className="h-6 focus:ring-0"
								onClick={() => handleExportLog([data], setLoading)}
								isLoading={loading}
							>
								Export
							</Button>
						)}
						<div className="bg-slate-300 dark:bg-slate-700 flex mt-auto h-12 items-center justify-center">
							<Button
								className="group transition-colors h-full w-1/2"
								variant="hidden"
								onClick={() => currentPage >= 1 && setCurrentPage(currentPage - 1)}
							>
								<ChevronLeft className="scale-100 group-hover:scale-0 transition-transform" />
								<ChevronsLeft className="absolute scale-0 group-hover:scale-100 transition-transform" />
							</Button>
							<div className="px-4">
								<Paragraph size="xs" className="m-0 font-medium">
									{pages[currentPage].title}
								</Paragraph>
								<Paragraph size="xs" className="m-0">
									{pages[currentPage].num}
								</Paragraph>
							</div>
							<Button
								className="group transition-colors h-full w-1/2"
								variant="hidden"
								onClick={() => currentPage < 1 && setCurrentPage(currentPage + 1)}
							>
								<ChevronRight className="scale-100 group-hover:scale-0 transition-transform" />
								<ChevronsRight className="absolute scale-0 group-hover:scale-100 transition-transform" />
							</Button>
						</div>
					</div>
				</div>
			)}
			{!saved && (
				<Paragraph size="xs" className="absolute -top-5 w-full">
					unsaved
				</Paragraph>
			)}
		</div>
	);
};

export { EditableLog };
