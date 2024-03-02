'use client';
import { ChevronDown, Plus, SearchIcon } from 'lucide-react';
import { FC, useEffect, useReducer, useState } from 'react';
import { Button } from '@/ui/Button';
import useLocalStorage from '@rehooks/local-storage';
import { unsavedReducer } from '@/lib/unsavedReducer';
import { FormItems } from '@/lib/formTypes';
import Paragraph from './ui/Paragraph';
import Form from './form/Form';
import useForm from '@/lib/useForm';
import LogView from '@/components/log/LogView';
import getProp from '@/lib/getProp';
import Modal from './ui/Modal';

interface LogdashProps {}

const listLogsWithTeam = (data: Array<FormItems>, team: number) => {
	var final: Array<FormItems> = [];
	data.map((log: FormItems) => {
		if (log.team == team) final = [...final, log];
	});
	return final;
};

export const getTeamAverageScore = (data: Array<FormItems>, team: number) => {
	return (listLogsWithTeam(data, team))
}


const Logdash: FC<LogdashProps> = ({}) => {
	const [localData, setLocalData] = useLocalStorage<Array<FormItems>>('local-data', []); // stores local match information from scout
	const [localDispatchState, localDispatch] = useReducer(unsavedReducer, localData);

	const [filteredData, setFilteredData] = useState<Array<FormItems>>(localData);

	const [isRendered, setIsRendered] = useState(false); // fixes hydration errors
	useEffect(() => {
		console.log('Rendered!');
		setIsRendered(true);
	}, []);


	
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
	const filter = ['Recent', 'Team', 'Match'];

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

	const Normal: any = () => {
		setFilteredData(
			filteredData.sort((a, b) => {
				if (new Date(a.dateSubmitted).getTime() > new Date(b.dateSubmitted).getTime()) return -1;
				else if (new Date(a.dateSubmitted).getTime() < new Date(b.dateSubmitted).getTime()) return 1;
				return 0;
			})
		);
		return filteredData.map((val: FormItems, i: number) => {
			const toDisplay: Array<any> = [
				{
					title: 'Auto Summary',
					display: [
						{
							'Left Starting Zone': ['number', val.auto.leftStartingZone, 2],
						},
						{
							"Speaker Note's Scored": ['number', val.auto.speakerScore, 5],
							"Amp Note's Scored": ['number', val.auto.ampScore, 2],
						},
					],
				},
				{
					title: 'Teleop Summary',
					display: [
						{
							"Amp Note's Scored": ['number', val.teleop.ampScore, 1],
							'Amp Activations': ['number', val.teleop.ampActivatedAmount, 0],
						},
						{
							'Speaker Score': ['number', val.teleop.speakerScore, 2],
							'Amplified Speaker Score': ['number', val.teleop.amplifiedSpeakerScore, 5],
						},
						{
							Hung: ['boolean', val.teleop.hangOnChain, 'Did Not Hang'],
						},
					],
				},
			];
			return <LogView toDisplay={toDisplay} averageScore={averageScore} setAverageScore={setAverageScore} key={i} data={val} allData={localData} />;
		});
	};

	const [averageScore, setAverageScore] = useState(0);
	const [searchState, setSearchState] = useState<string>();
	

	const filterSwitch = (prop: number) => {
		switch (prop) {
			case 0:
				return <Normal />;
				break;
			case 1:
				return (
					<>
						<Button onClick={() => {}}>Pull Teams</Button>
						{listTeams().map((team: number, i: number) => {
							return (
								<div key={i} className="bg-t-100 flex flex-col gap-2 p-2 rounded">
									<div className="p-2">
										<Paragraph size="xs" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
											Team <span className="text-r-100 px-1">{team}</span>
										</Paragraph>
									</div>
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
														Hung: ['boolean', log.teleop.hangOnChain, 'Did Not Hang'],
													},
												],
											},
										];
										return <LogView toDisplay={toDisplay} averageScore={averageScore} setAverageScore={setAverageScore} key={i} data={log} allData={localData} className="bg-t-200" />;
									})}
								</div>
							);
						})}
					</>
				);
				break;
			case 2:
				return listMatches().map((match: number, i: number) => {
					return (
						<div key={i} className="bg-t-100 flex flex-col gap-2 p-2 rounded">
							<div className="p-2">
								<Paragraph size="xs" className="font-medium text-b-100 dark:text-[#3A2C27] text-left">
									Match <span className="text-r-100 px-1">{match}</span>
								</Paragraph>
								{averageScore}
							</div>
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
													Hung: ['boolean', log.teleop.hangOnChain, 'Did Not Hang'],
												},
											],
										},
									];
								return <LogView toDisplay={toDisplay} averageScore={averageScore} setAverageScore={setAverageScore} key={i} data={log} allData={localData} className="bg-t-200" />;
							})}
						</div>
					);
				});
			default:
				return <div></div>;
		}
	};

	const [settingsState, setSettingState] = useState(false);
	const [dialog, setDialog] = useState();

	return (
		<>
			<Form dispatch={localDispatch} modalState={formState} closeModal={setClose} />
			<Modal visible={settingsState} clickOut={true} closeModal={() => setSettingState(!settingsState)}>
				
			</Modal>
			<div className=" rounded-md bg-g-100 border-2 border-t-100 max-w-5xl min-w-fit w-full">
				<div className="bg-r-200 border-b-2 border-t-100 rounded-t p-2 flex justify-between flex-col sm:flex-row gap-2">
					<div className="flex gap-2 justify-center">
						<Button onClick={() => setOpen()}>
							<Plus className="w-4 h-4 mr-1" /> New Log
						</Button>
						<div className="bg-r-100 p-2 rounded flex gap-2 items-center">
							<SearchIcon className="text-[#C9B08E] w-4 h-4" />
							<input
								type="text"
								className="bg-transparent text-t-100 placeholder-t-100 disabled:pointer-events-none outline-none text-sm mx-1"
								placeholder="Search"
								onChange={(e: any) => setSearchState(e.target.value)}
							/>
						</div>
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
						{searchState == 'settings' && <Button onClick={() => setSettingState(!settingsState)}>Settings</Button>}
					</div>
				</div>
				<div className=" rounded p-2 flex flex-col gap-2">{isRendered ? <>{filterSwitch(currentFilter)}</> : null}</div>
			</div>
		</>
	);
};

export default Logdash;
