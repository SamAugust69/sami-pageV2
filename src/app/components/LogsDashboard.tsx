'use client';

import { FC, useEffect, useReducer, useState } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';

import TopCards from '@/components/TopCards';
import Heading from '@/ui/Heading';
import MatchNav from '@/components/MatchNav';
import SearchBar from '@/ui/SearchBar';
import { BiRefresh } from 'react-icons/bi';
import LogsSection from '@/components/LogsSection';
import LogButtons from './LogButtons';
import LogsTableView from './LogsTableView';
import { v4 } from 'uuid';
import { handleExportLog, handleFetchLog } from '@/lib/api';

import { REDUCER_ACTION_TYPE, unsavedReducer } from '@/lib/unsavedReducer';
import { Button } from './ui/Button';
import Dialog from './ui/Dialog';
import { GrFormAdd } from 'react-icons/gr';

const matchSort = (a: any, b: any) => {
	return parseInt(a.match) - parseInt(b.match);
};

const generateMatches = (data: any, setMatches: any) => {
	console.log('generating matches...');
	var newMatches: any = [];
	if (data === null) return;
	data.map((val: any) => {
		// iterate through current match info, if val.info.match[0]( logs match number ) does not exist in matchinfo,

		//  NEVER TRY AND SET A STATE IN A LOOP!!!!!
		if (newMatches.some((ele: any) => ele.match === val.info.match[0]) === false && val.info.match[0] != 0) {
			// this will never add a match on 0
			//add match
			newMatches = [
				...newMatches,
				{
					match: `${val.info.match[0]}`,
					teams: [],
				},
			];
		}
	});

	newMatches.map((match: any) => {
		data.map((val: any) => {
			if (val.info.match[0] === match.match) {
				match.teams = [
					...match.teams,
					{
						team: val.info.team[0],
						match: val.info.match[0],
						id: val.id,
						disabled: val.disabled,
					},
				];
			}
		});
	});

	setMatches(newMatches.sort(matchSort));
};

interface LogsDashboardProps {}

const LogsDashboard: FC<LogsDashboardProps> = ({}) => {
	// locally stored
	const [remoteData, setRemoteData] = useLocalStorage<any>('remote-data', []); // stores match information from server
	const [localData, setLocalData] = useLocalStorage<any>('local-data', []); // stores local match information from scout

	const logs = [
		{
			id: 'server',
			label: 'Server Logs',
			amount: remoteData,
		},
		{
			id: 'local',
			label: 'Local Logs',
			amount: localData,
		},
	];

	// match displayed states
	const [displayedMatches, setDisplayedMatches] = useState<any>([]);
	const [filteredMatches, setFilteredMatches] = useState(displayedMatches);
	const [displayedLogs, setDisplayedLogs] = useLocalStorage<any>('displayed-logs', []);
	const [unsavedLogsState, unsavedDispatch] = useReducer(unsavedReducer, []);
	const [currentData, setCurrentData] = useState(remoteData);
	const [activeLog, setActiveLog] = useState(logs[0].id);

	// search states
	const [filter, setFilter] = useState<any>([]);

	const [isLoaded, setIsLoaded] = useState(false);
	const [query, setQuery] = useState<string>('');

	// other things
	const [experiments, setExperiments] = useState(false);

	useEffect(() => {
		handleFetchLog(setRemoteData);
		generateMatches(currentData, setDisplayedMatches);
		setCurrentData(remoteData);
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		console.log(`switching displayed matches... ${activeLog}`);
		if (activeLog === 'local') {
			setCurrentData(localData);
		} else {
			setCurrentData(remoteData);
		}
	}, [activeLog]);

	useEffect(() => {
		generateMatches(currentData, setDisplayedMatches);
	}, [unsavedLogsState]);

	useEffect(() => {
		generateMatches(currentData, setDisplayedMatches);
	}, [currentData]);

	useEffect(() => {
		var fart = filter !== undefined && filter.filter((filter: { selected: string }) => filter.selected === 'true');
		if (fart.length > 0) {
			switch (fart[0].label) {
				case 'Match':
					console.log(fart[0].label);
					setFilteredMatches(
						displayedMatches.filter((item: any) => {
							return query.toLowerCase() === '' ? item : item.match.includes(query);
						})
					);
					break;
				case 'Team':
					console.log(fart[0].label);
					setFilteredMatches(
						displayedMatches.filter((item: any) => {
							return query.toLowerCase() === '' ? item : item.teams.some((match: any) => match.team === query);
						})
					);
					break;
			}
		}
	}, [query, displayedMatches, filter]);

	const searchBarFilters = [
		{
			id: '0',
			label: 'Match',
			selected: 'true',
		},
		{
			id: '1',
			label: 'Team',
			selected: 'false',
		},
	];

	const saveLogs = () => {
		var newLogs: any = localData;
		console.log('-------------------------');
		unsavedLogsState.map((val: any) => {
			if (localData.some((ele: any) => ele.id === val.id) !== true) {
				console.log(`adding log ${val.info.match}, ${val.info.team}, ${val.id}`);
				newLogs = [...newLogs, val];
				unsavedDispatch({ type: REDUCER_ACTION_TYPE.REMOVED_LOG, payload: val });
				console.log(newLogs);
				setLocalData(newLogs);
			} else {
				setLocalData(
					localData.map((item: any) => {
						if (item.id == val.id) {
							unsavedDispatch({ type: REDUCER_ACTION_TYPE.REMOVED_LOG, payload: val });
							return val;
						} else {
							return item;
						}
					})
				);
			}
		});

		console.log('-------------------------');

		setDisplayedLogs(
			displayedLogs.map((log: any) => {
				if (localData.includes(log)) {
					return localData.filter((item: any) => item.id === log.id)[0];
				} else {
					return log;
				}
			})
		);
	};

	const addNewLog = () => {
		const blankLog = {
			id: v4(),
			disabled: false,
			info: { match: ['0'], team: ['0'], scout: [''], notes: [''] },
			auto: {
				move: [false],
				score: [false],
				leave: [false],
				dock: [false],
				engage: [false],
				cones: [0],
				cubes: [0],
				scoreLocations: [
					[['10'], ['00'], ['10'], ['10'], ['00'], ['10'], ['10'], ['00'], ['10']],
					[['10'], ['00'], ['10'], ['10'], ['00'], ['10'], ['10'], ['00'], ['10']],
					[['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20']],
				],
			},
			teleop: {
				conesAttempted: [0],
				cones: [0],
				cubes: [0],
				cubesAttempted: [0],
				dock: [false],
				engage: [false],
				scoreLocations: [
					[['10'], ['00'], ['10'], ['10'], ['00'], ['10'], ['10'], ['00'], ['10']],
					[['10'], ['00'], ['10'], ['10'], ['00'], ['10'], ['10'], ['00'], ['10']],
					[['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20'], ['20']],
				],
			},
		};

		setDisplayedLogs([...displayedLogs, blankLog]);
	};

	const [isDialogShown, setIsDiologShown] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<div className='flex flex-col gap-2 w-full'>
			<TopCards localData={1} remoteData={2}/>
			<div className='bg-slate-200 border-2 border-slate-400 rounded'>
				{displayedLogs.map((log: any) =>{
					return JSON.stringify(log)
				})}
			</div>
			<div className="flex items-center justify-center">
				<Button size="icon" onClick={() => addNewLog()}>
					<GrFormAdd className="w-5 h-5" />
				</Button>
				<Button size="lg" onClick={() => saveLogs()}>
					Save Local Logs
				</Button>
				<Button size="lg" onClick={() => handleExportLog(localData, setLoading)} isLoading={loading}>
					Export Local Logs
				</Button>
			</div>
		</div>
	);
};

export default LogsDashboard;

// add pecent value for each teams score controbutiom in a match
// add first few parts of motes to quick info!

//TODO(from ver.1):

//SEARCH
//sort by match number
//sort by team number
//reverse order

//OPTIMOZE
//when closed, delete data
//load data in chunks

//FEATURES
//google sheet automation
//add from image(no?), no.
//save page state

//INFO
//starting pos
//drive train?
