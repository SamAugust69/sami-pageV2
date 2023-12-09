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
import { handleFetchLog } from '@/lib/api';

import { unsavedReducer } from '@/lib/unsavedReducer';
import { Button } from './ui/Button';
import Dialog from './ui/Dialog';

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
	const [remoteData, setRemoteData] = useLocalStorage<any>('remote-data'); // stores match information from server
	const [localData, setLocalData] = useLocalStorage<any>('local-data'); // stores local match information from scout

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
	const [displayedLogs, setDisplayedLogs] = useLocalStorage<any>('displayed-logs');
	const [state, dispatch] = useReducer(unsavedReducer, []);
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
		if (localData === undefined || localData === null) setLocalData([]);
		if (displayedLogs === undefined || displayedLogs === null) setDisplayedLogs([]);
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
	}, [state]);

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

	const [isDialogShown, setIsDiologShown] = useState(false);

	return (
		<>
			<div className="px-4 flex flex-col w-full">
				<Heading size="sm" className="text-slate-700 font-medium text-left py-2">
					Dashboard
				</Heading>
				<TopCards activeLog={activeLog} setActiveLog={setActiveLog} remoteData={remoteData} localData={localData} />
				<span className="border-b-2 w-full border-slate-400 my-4" />
				<div className="flex items-center justify-center">
					<SearchBar
						setFilterA={setFilter}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
						filters={searchBarFilters}
					/>
					<Button
						variant="search"
						size="lg"
						className="shadow-md group"
						onClick={() => {
							handleFetchLog(setRemoteData);
						}}
					>
						<BiRefresh className="h-6 w-6 group-hover:animate-spin dark:text-slate-200" />
					</Button>
				</div>
				<MatchNav
					displayedMatches={filteredMatches}
					setDisplayedLogs={setDisplayedLogs}
					displayedLogs={displayedLogs}
					currentData={currentData}
					matchData={displayedMatches}
					className="py-2"
				/>
				<LogButtons
					displayedLogs={displayedLogs}
					dispatch={dispatch}
					unsavedLogs={state}
					setDisplayedLogs={setDisplayedLogs}
					localLogs={localData}
					setLocalLogs={setLocalData}
				/>
				<LogsSection className="py-4" dispatch={dispatch} unsavedLogs={state} logsToDisplay={isLoaded && displayedLogs} />
				<LogsTableView displayedMatches={displayedMatches} />
				<Dialog visible={isDialogShown} setVisible={setIsDiologShown}>
					test
				</Dialog>
				<Button onClick={() => setIsDiologShown(!isDialogShown)}>test</Button>
			</div>
		</>
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
