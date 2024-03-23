'use client';
import { ChevronDown, Plus, SearchIcon } from 'lucide-react';
import { FC, useEffect, useReducer, useState } from 'react';
import { Button } from '@/ui/Button';
import useLocalStorage from '@rehooks/local-storage';
import { REDUCER_ACTION_TYPE, unsavedReducer } from '@/lib/unsavedReducer';
import { AveragesType, DisplayedLogsType, FormItems, initialValues } from '@/lib/formTypes';
import Paragraph from './ui/Paragraph';
import Form from './form/Form';
import useForm from '@/lib/useForm';
import LogView from '@/components/log/LogView';
import Modal from './ui/Modal';
import {QRCodeSVG} from 'qrcode.react';
import QRCodes from './qrCodes';
import { v4 as uuidv4, v4 } from 'uuid';
import schedule from "./schedual.json" 
import FormInput from './ui/FormInput';


interface LogdashProps {}

const listLogsWithTeam = (data: Array<FormItems>, team: number) => {
	var final: Array<FormItems> = [];
	data.map((log: FormItems) => {
		if (log.team == team) final = [...final, log];
	});
	return final;
};


export const getTeamAverageScore = (data: Array<FormItems>, team: number) => {
	return listLogsWithTeam(data, team);
};

const calculateScore = (log: FormItems) => {
	var teleopScore = 0;
	var autoScore = 0;
	const pointScoring: Array<Array<any>> = [
		[
			{ type: 'boolean', amount: log.auto.leftStartingZone, points: 2 },
			{ type: 'number', amount: log.auto.speakerScore, points: 5 },
			{ type: 'number', amount: log.auto.ampScore, points: 2 },
		],
		[
			{ type: 'number', amount: log.teleop.ampScore, points: 1 },
			{ type: 'number', amount: log.teleop.speakerScore, points: 2 },
			{ type: 'number', amount: log.teleop.amplifiedSpeakerScore, points: 5 },
			{ type: 'boolean', amount: log.teleop.parkOnStage, points: 1 },
			{ type: 'boolean', amount: log.teleop.hangOnChain, points: 3 },
			{ type: 'boolean', amount: log.teleop.hangInHarmony, points: 2 },
			{ type: 'boolean', amount: log.teleop.scoredTrap, points: 5 },
		],
	];

	pointScoring[0].map((val) => {
		switch (val.type) {
			case 'boolean':
				val.amount == true ? (autoScore += val.points) : null;
				break;
			case 'number':
				autoScore += val.amount * val.points;
				break;
		}
	});

	pointScoring[1].map((val) => {
		switch (val.type) {
			case 'boolean':
				val.amount == true ? (teleopScore += val.points) : null;
				break;
			case 'number':
				teleopScore += val.amount * val.points;
				break;
		}
	});

	return { autoScore, teleopScore, total: autoScore + teleopScore };
};

const Logdash: FC<LogdashProps> = ({}) => {
	const [localData, setLocalData] = useLocalStorage<Array<FormItems>>('local-data', []); // stores local match information from scout
	const [localDispatchState, localDispatch] = useReducer(unsavedReducer, localData);
	const [displayedLogs, setDisplayedLogs] = useState<Array<DisplayedLogsType>>([]);

	const [filteredData, setFilteredData] = useState<Array<FormItems>>(localData);

	const [isRendered, setIsRendered] = useState(false); // fixes hydration errors

	const findLogFromId = (id: string): FormItems => {
		var locatedLog = initialValues;
		localData.map((log) => {
			if (log.id == id) {
				locatedLog = log;
			}
		});
		return locatedLog;
	};
	
	const calcAverageScores = (): AveragesType => {
		var totalScore: number = 0
		var totalAutoScore: number = 0
		var totalTeleopScore: number = 0

		displayedLogs.map((logInfo: DisplayedLogsType) => {
			totalScore += logInfo.score
			totalAutoScore += logInfo.autoScore
			totalTeleopScore += logInfo.teleopScore
		})

		const averageTotal = (totalScore / displayedLogs.length)
		const averageAuto = (totalAutoScore / displayedLogs.length)
		const averageTeleop = (totalTeleopScore / displayedLogs.length)

		return {averageAuto, averageTeleop, averageTotal}
	}

	const generateDisplayedLogs = () => {
		var toSet: Array<DisplayedLogsType> = [];
		localData.map((log: FormItems, i: number) => {
			const { autoScore, teleopScore, total } = calculateScore(log);
			toSet = [
				...toSet,
				{
					score: total,
					autoScore: autoScore,
					teleopScore: teleopScore,
					team: log.team,
					match: log.match,
					rankingPoints: 0,
					dateSubmitted: log.dateSubmitted,
					id: log.id,
				},
			];
		});
		setDisplayedLogs(toSet);
		console.log(toSet);
	};

	useEffect(() => {
		console.log('Rendered!');
		setIsRendered(true);
	}, []);

	useEffect(() => {
		generateDisplayedLogs();
	}, [localData]);

	const listMatches = () => {
		var final: Array<number> = [];
		localData.map((val: FormItems) => {
			if (final.length == 0) {
				final = [val.match];
			} else {
				if (final.some((ele: number) => ele == val.match) == false) {
					final = [...final, val.match];
				}
			}
		});
		return final;
	};

	useEffect(() => {
		setLocalData(localDispatchState);
		setFilteredData(localDispatchState);
		
	}, [localDispatchState]);

	const { formState, toggleOpen, setOpen, setClose } = useForm();

	const [currentFilter, setCurrentFilter] = useState(0);
	const filter = ['Recent', 'Points', 'Team', 'Match'];

	// so, i want sort by each team. I should loop over the logs. Add to array of team if part of team, else, create
	const listTeams = () => {
		var final: Array<number> = [];
		localData.map((val: FormItems) => {
			if (final.length == 0) {
				final = [val.team];
			} else {
				if (final.some((ele: number) => ele == val.team) == false) {
					final = [...final, val.team];
				}
			}
		});
		return final;
	};

	const listLogsWithMatch = (match: number) => {
		var final: Array<FormItems> = [];
		localData.map((log: FormItems) => {
			if (log.match == match) final = [...final, log];
		});
		return final;
	};

	const [averageScore, setAverageScore] = useState(calcAverageScores())

	useEffect(() => {
		setAverageScore(calcAverageScores())
	}, [displayedLogs])

	const [searchState, setSearchState] = useState<string>();

	const RecentFiltered: any = () => {
		setDisplayedLogs(
			displayedLogs.sort((a, b) => {
				if (new Date(a.dateSubmitted).getTime() > new Date(b.dateSubmitted).getTime()) return -1;
				else if (new Date(a.dateSubmitted).getTime() < new Date(b.dateSubmitted).getTime()) return 1;
				return 0;
			})
		);

		return displayedLogs.map((log: DisplayedLogsType, i: number) => {
			const test: FormItems = findLogFromId(log.id);

			const toDisplay: Array<any> = [
				{
					title: 'Auto Summary',
					display: [
						{
							'Left Starting Zone': ['number', test.auto.leftStartingZone, 2],
						},
						{
							"Speaker Note's Scored": ['number', test.auto.speakerScore, 5],
							"Amp Note's Scored": ['number', test.auto.ampScore, 2],
						},
					],
				},
				{
					title: 'Teleop Summary',
					display: [
						{
							"Amp Note's Scored": ['number', test.teleop.ampScore, 1],
							'Amp Activations': ['number', test.teleop.ampActivatedAmount, 0],
						},
						{
							'Speaker Score': ['number', test.teleop.speakerScore, 2],
							'Amplified Speaker Score': ['number', test.teleop.amplifiedSpeakerScore, 5],
						},
						{
							Hung: ['boolean', test.teleop.hangOnChain, 'Did Not Hang', 3],
							Harmonize: ['boolean', test.teleop.hangInHarmony, 'No Harmony', 2],
							'Scored Trap': ['boolean', test.teleop.scoredTrap, 'No Trap', 5],
						},
					],
				},
			];

			return (
					<LogView
						localDispatch={localDispatch}
						toDisplay={toDisplay}
						autoScore={log.autoScore}
						teleopScore={log.teleopScore}
						key={i}
						averageScore={averageScore}
						data={findLogFromId(log.id)}
						allData={localData}
					/>
			);
			// return (
			// 	<LogView localDispatch={localDispatch} toDisplay={toDisplay} averageScore={averageScore} setAverageScore={setAverageScore} key={i} data={findLogFromId(log.id)} allData={localData} />;
			// )
		});
	};

	const PointsFiltered: any = () => {

		setDisplayedLogs((
			displayedLogs.sort((a, b) => {
				if (a.score > b.score) return -1;
				else if (a.score < b.score) return 1;
				return 0;
			})
		))
		
		return displayedLogs.map((log: DisplayedLogsType, i: number) => {
			const test: FormItems = findLogFromId(log.id);

			const toDisplay: Array<any> = [
				{
					title: 'Auto Summary',
					display: [
						{
							'Left Starting Zone': ['number', test.auto.leftStartingZone, 2],
						},
						{
							"Speaker Note's Scored": ['number', test.auto.speakerScore, 5],
							"Amp Note's Scored": ['number', test.auto.ampScore, 2],
						},
					],
				},
				{
					title: 'Teleop Summary',
					display: [
						{
							"Amp Note's Scored": ['number', test.teleop.ampScore, 1],
							'Amp Activations': ['number', test.teleop.ampActivatedAmount, 0],
						},
						{
							'Speaker Score': ['number', test.teleop.speakerScore, 2],
							'Amplified Speaker Score': ['number', test.teleop.amplifiedSpeakerScore, 5],
						},
						{
							Hung: ['boolean', test.teleop.hangOnChain, 'Did Not Hang', 3],
							Harmonize: ['boolean', test.teleop.hangInHarmony, 'No Harmony', 2],
							'Scored Trap': ['boolean', test.teleop.scoredTrap, 'No Trap', 5],
						},
					],
				},
			];

			return (
					<LogView
						localDispatch={localDispatch}
						toDisplay={toDisplay}
						autoScore={log.autoScore}
						teleopScore={log.teleopScore}
						key={i}
						averageScore={averageScore}
						data={findLogFromId(log.id)}
						allData={localData}
					/>
			);
		})
	}

	const TeamFiltered: any = () => {
		return (
			Array.from(listTeams(), (team: number, i) => {
				return <div key={i} className='flex flex-col gap-2 bg-t-100 p-2 rounded'>
					<Paragraph size={"sm"} className='text-b-100 font-medium px-2'>Team <span className='text-r-100'>{team}</span></Paragraph>
					{listLogsWithTeam(localData, team).map((log: FormItems, i: number) => {
						const toDisplay: Array<any> = [
							{
								title: 'Auto Summary',
								display: [
									{
										'Left Starting Zone': ['number', log.auto.leftStartingZone, 2],
									},
									{
										"Speaker Note's Scored": ['number', log.auto.speakerScore, 5],
										"Amp Note's Scored": ['number', log.auto.ampScore, 2],
									},
								],
							},
							{
								title: 'Teleop Summary',
								display: [
									{
										"Amp Note's Scored": ['number', log.teleop.ampScore, 1],
										'Amp Activations': ['number', log.teleop.ampActivatedAmount, 0],
									},
									{
										'Speaker Score': ['number', log.teleop.speakerScore, 2],
										'Amplified Speaker Score': ['number', log.teleop.amplifiedSpeakerScore, 5],
									},
									{
										Hung: ['boolean', log.teleop.hangOnChain, 'Did Not Hang', 3],
										Harmonize: ['boolean', log.teleop.hangInHarmony, 'No Harmony', 2],
										'Scored Trap': ['boolean', log.teleop.scoredTrap, 'No Trap', 5],
									},
								],
							},
						];
						const {autoScore, teleopScore} = calculateScore(log)
						return (
							<LogView
								localDispatch={localDispatch}
								toDisplay={toDisplay}
								key={i}
								averageScore={averageScore}
								autoScore={autoScore}
								teleopScore={teleopScore}
								data={log}
								allData={localData}
								className="bg-t-200"
							/>
						);
					})}
				</div>
			})
		)
		
	}

	const MatchFiltered: any = () => {
		return (
			Array.from(listMatches(), (match: number, i) => {
				return <div key={i} className='flex flex-col gap-2 bg-t-100 p-2 rounded'>
					<Paragraph size={"sm"} className='text-b-100 font-medium px-2'>Match <span className='text-r-100'>{match}</span></Paragraph>
					{listLogsWithMatch(match).map((log: FormItems, i: number) => {
						const toDisplay: Array<any> = [
							{
								title: 'Auto Summary',
								display: [
									{
										'Left Starting Zone': ['number', log.auto.leftStartingZone, 2],
									},
									{
										"Speaker Note's Scored": ['number', log.auto.speakerScore, 5],
										"Amp Note's Scored": ['number', log.auto.ampScore, 2],
									},
								],
							},
							{
								title: 'Teleop Summary',
								display: [
									{
										"Amp Note's Scored": ['number', log.teleop.ampScore, 1],
										'Amp Activations': ['number', log.teleop.ampActivatedAmount, 0],
									},
									{
										'Speaker Score': ['number', log.teleop.speakerScore, 2],
										'Amplified Speaker Score': ['number', log.teleop.amplifiedSpeakerScore, 5],
									},
									{
										Hung: ['boolean', log.teleop.hangOnChain, 'Did Not Hang', 3],
										Harmonize: ['boolean', log.teleop.hangInHarmony, 'No Harmony', 2],
										'Scored Trap': ['boolean', log.teleop.scoredTrap, 'No Trap', 5],
									},
								],
							},
						];
						const {autoScore, teleopScore} = calculateScore(log)
						return (
							<LogView
								localDispatch={localDispatch}
								toDisplay={toDisplay}
								key={i}
								averageScore={averageScore}
								autoScore={autoScore}
								teleopScore={teleopScore}
								data={log}
								allData={localData}
								className="bg-t-200"
							/>
						);
					})}
				</div>
			})
		)
	}


	const filterSwitch = (prop: number) => {
		switch (prop) {
			case 0:
				return <RecentFiltered />;
			case 1:
				return <PointsFiltered />
			case 2:
				return <TeamFiltered />
			case 3:
				return <MatchFiltered />
			default:
				return <div></div>;
		}
	};

	const [formData, setFormData] = useState<FormItems>(initialValues)

	const newFormProps = {
		modalState: formState,
		closeModal: () => setClose(),
		dispatch: localDispatch,
		formValues: formData,
		onSubmit: () => setCurMatch(curMatch + 1)
	}

	const [qrOpen, setQROpen] = useState(false);
	console.log(JSON.stringify(localData).length)
	
	const [curMatch, setCurMatch] = useLocalStorage("curMatch", 1)
	const [tabletNumber, setTabletNumber] = useLocalStorage("tabletNumber", 0)

	//const [newLogData, setNewLogData] = useState<FormItems>(initialValues)

	const openLog = (match: number, team: number) => {
		setFormData({
			...formData,
			match: match,
			team: team,
			id: v4()
		})
		setOpen()
	};

	return (
		<div className='flex flex-col gap-2'>
			<Form {...newFormProps} />
			<Modal open={qrOpen} setOpen={() => setQROpen(!qrOpen)}>
				<QRCodes data={localData} dispatch={localDispatch}/>
			</Modal>

			<div className=" rounded-md bg-g-100 border-2 border-t-100 max-w-5xl min-w-fit w-full h-full">
				<div className="bg-r-200 border-b-2 border-t-100 rounded-t p-2 flex justify-between flex-col sm:flex-row gap-2">
					<div className="flex gap-2 justify-center">
						<Button onClick={() => setOpen()}>
							<Plus className="w-4 h-4 mr-1" /> New Log
						</Button>
						<Button onClick={() => setQROpen(!qrOpen)} className='bg-r-100'>
							<Plus className="w-4 h-4 mr-1" /> Import Logs
						</Button>
						{/* <div className="bg-r-100 p-2 rounded flex gap-2 items-center">
							<SearchIcon className="text-[#C9B08E] w-4 h-4" />
							<input
								type="text"
								className="bg-transparent text-t-100 placeholder-t-100 disabled:pointer-events-none outline-none text-sm mx-1"
								placeholder="Search"
								onChange={(e: any) => setSearchState(e.target.value)}
							/>
						</div> */}
					</div>

					<div className="justify-center flex">
						{filter.map((val: any, i: number) => {
							return (
								<Button
									key={i}
									variant="hidden"
									className={`text-t-100 ${currentFilter == i ? 'bg-[#3A2C27]' : ''}`}
									onClick={() => setCurrentFilter(i)}
								>
									{val}
								</Button>
							);
						})}
					</div>
				</div>
				<div className=" rounded p-2 flex flex-col gap-2">{isRendered ? <>{filterSwitch(currentFilter)}</> : null}</div>
			</div>
			{isRendered ? <div>
		
				<div className='bg-g-100 border-2 border-t-100 rounded flex flex-col h-32 overflow-scroll snap-y'>
					
				<Paragraph size={"xs"} className='bg-g-200 w-full self-center text-center text-t-100'>Beta</Paragraph>
					{schedule.Schedule.slice(curMatch - 1 > 0 ? curMatch - 1 : 0, curMatch + 2 < schedule.Schedule.length ? curMatch + 2 : schedule.Schedule.length).map((val) => {
						return (
							<div onClick={() => {curMatch == val.matchNumber ? openLog(val.matchNumber, val.teams[tabletNumber].teamNumber) : null}} className={`group group-hover bg-g-200 m-2 rounded flex snap-center ${curMatch == val.matchNumber ? " hover:cursor-pointer" : ""} transition-all`}>
								<div className={` ${curMatch == val.matchNumber ? "bg-t-400" : "bg-b-100"} py-2 h-full px-4 rounded-l flex items-center justify-center `}>
									{curMatch == val.matchNumber ? <Paragraph size={"xs"} className='group invisible w-0 group-hover:visible group-hover:w-full'>Create Log</Paragraph> : null}
									<Paragraph size={"sm"}>{val.matchNumber}</Paragraph>
								</div>
								<div className='px-2 flex items-center justify-between w-full'>
									<Paragraph size={"sm"}>{val.description}</Paragraph>
									<div>
										<Paragraph size={"sm"}>{val.teams[tabletNumber].teamNumber}</Paragraph>
									</div>
								</div>

							</div>


						)
		
					})}
					<FormInput type='number' className={"m-2"} title={"Tablet Number"} onChange={(e: any) => Number.isNaN(parseInt(e.target.value)) == false ?? parseInt(e.target.value) < 5 ?? (parseInt(e.target.value) >= 0) ? setTabletNumber(parseInt(e.target.value)) : setTabletNumber(0)} value={tabletNumber.toString()}>hello</FormInput>
				</div>
			</div> : null}
		</div>

	);
};

export default Logdash;
