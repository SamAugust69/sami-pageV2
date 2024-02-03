import { FC } from 'react';
import Paragraph from '../ui/Paragraph';
import Heading from '../ui/Heading';
import { Badge } from '../ui/Badge';
import { FormItems } from '@/app/lib/formTypes';

interface LogDetailsProps {
	auto: any;
	teleop: any;
}

const LogDetails: FC<LogDetailsProps> = ({ auto, teleop }) => {
	console.log(auto);
	type Auto = FormItems[keyof FormItems][number]
	return (
		<div className=" mx-3 my-2 rounded flex flex-col">
			<div className="rounded p-2 my-2 mx-2 flex gap-1 flex-wrap bg-slate-300">
				<Paragraph size={'sm'} className="mx-1 py-1">
					Auto
				</Paragraph>
				<Badge size="sm" variant={auto.moved ? 'great' : 'well'}>
					Moved
				</Badge>
				<Badge size="sm" variant={auto.docked ? 'great' : 'well'}>
					docked
				</Badge>
				<Badge size="sm" variant={auto.engaged_station ? 'great' : 'well'}>
					Engaged Station
				</Badge>
				<Badge size="sm" variant={auto.scored ? 'great' : 'well'}>
					Scored
				</Badge>
				{
					auto.map((val: FormItems, i: number) => {
						return (
							<Badge size="sm" variant={auto.scored ? 'great' : 'well'}>
								{val.}
							</Badge>
						)
					})
				}
			</div>
			{/* <span className="bg-indigo-300 h-1 w-1/3 rounded-full self-center"></span> */}
			<div className=" rounded p-2 my-2 mx-2 flex gap-1 flex-wrap">
				<Badge size="sm" variant={teleop.docked ? 'great' : 'well'}>
					Docked
				</Badge>
				<Badge size="sm" variant={teleop.engaged_station ? 'great' : 'well'}>
					Engaged Station
				</Badge>
			</div>
			<div className="bg-indigo-400 rounded p-2 my-2 mx-2">test</div>
		</div>
	);
};

export default LogDetails;
