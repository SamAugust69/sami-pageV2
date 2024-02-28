import { FormItems } from '@/lib/formTypes';
import { FC, createRef, useEffect, useRef, useState } from 'react';
import Paragraph from '../ui/Paragraph';
import { getTeamAverageScore } from '../LLogdash';

interface SummaryProps {
	data: FormItems;
	allData: Array<FormItems>;
	toDisplay: any
}

const Summary: FC<SummaryProps> = ({ data, allData, toDisplay }) => {
	const [score, setScore] = useState(0);

	var total = 0; // dont usestate this. I want it to be different for each instance.
	const averageScoreWidth = useRef<any>(<div></div>)
	console.log(averageScoreWidth.current.clientWidth)

	var averageScore = 0;


	return (
		<div className="flex gap-2 flex-wrap">
			{toDisplay.map((val: any, i: number) => {
				return (
					<div key={i} className="bg-t-100 min-w-[18rem] rounded flex flex-col">
						<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
							{val.title}
						</Paragraph>

						<div className="p-2 flex gap-2 flex-col">
							{val.display.map((val: any, i: number) => {
								return (
									<div key={i} className="bg-t-200 rounded  p-2 flex flex-col gap-2">
										{Object.entries(val).map((val2: any, i: number) => {
											const type = val2[1][0];
											const value = val2[1][1];
											const points = value * val2[1][2];
											// useEffect(() => {
											// 	setScore(score + total);
											// 	getTeamAverageScore(allData, data.team).map((val: FormItems) => {
											// 		averageScore += score / allData.length
											// 	})
											// }, [])
									

											switch (type) {
												case 'number':
													total += points;
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																<span className={`${value < 0 ? '' : 'pr-2'} text-r-100`}>{value}</span>
																{val2[0]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
												case 'boolean':
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																{value ? val2[0] : val2[1][2]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
												default:
													total += points;
													return (
														<div key={i} className="flex justify-between font-medium text-b-100 items-center">
															<Paragraph size={'sm'} className="">
																<span className={`${value < 0 ? '' : 'pr-2'} text-r-100`}>{value}</span>
																{val2[0]}
															</Paragraph>
															<Paragraph size={'sm'}>{points > 0 ? '+ ' + points + 'pt' : null}</Paragraph>
														</div>
													);
											}
										})}
									</div>
									
								);
							})}
							<Paragraph className="text-b-100 font-medium text-right px-2" size={'sm'}>
								{total}pt
							</Paragraph>
						</div>
					</div>
				);
			})}
			{/* <div className="bg-t-100 min-w-72 rounded flex flex-col">
				<Paragraph size="sm" className="text-t-100 font-medium bg-b-100 p-2 rounded-t">
					Summary
				</Paragraph>
				<div className="bg-t-100 p-2 flex flex-col gap-2">
					<div className='bg-t-200 rounded p-2 flex flex-col gap-2'>
						<Paragraph size={"sm"}><span className='text-r-100'>{score}</span>pts Scored</Paragraph>
					</div>
					<div className="bg-t-200 rounded h-10 flex justify-between items-center relative" ref={averageScoreWidth}>
						<div style={{width: `${Math.floor((score / (averageScore)) * averageScoreWidth.current.clientWidth)}px`}} className={`h-full bg-t-300 rounded-l flex items-center`}>
							<Paragraph className='px-2 text-b-100 font-medium' size="sm">{score}</Paragraph>
						</div>
						<Paragraph className='px-2 text-b-100 font-medium absolute right-1' size="sm">avg {averageScore}</Paragraph>
					</div>
				</div>
			</div> */}

		</div>
	);
};

export default Summary;
