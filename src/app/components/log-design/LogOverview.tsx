import { FC, useState } from 'react';
import Paragraph from '@/ui/Paragraph';
import Heading from '@/ui/Heading';
import { ChevronDown } from 'lucide-react';
import LogDetails from '@/components/log-design/LogDetails';
import { Badge, badgeVariantsTypes } from '@/ui/Badge';

interface LogOverviewProps {
	bot_preformance: string;
	bot_team: number;
	log_match: number;
	scout_name: string;
	auto_data: any;
	teleop_data: any;
}

const LogOverview: FC<LogOverviewProps> = ({
	bot_preformance,
	bot_team,
	log_match,
	scout_name,
	auto_data,
	teleop_data,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<div className="border border-slate-400 rounded">
			<div className="flex justify-between items-center pt-4 px-3 " onClick={() => setIsExpanded(!isExpanded)}>
				<div className="flex h-11">
					<div className="flex items-center px-4 py-1 relative">
						<div>
							<Heading className="p-0 text-blue-800" size="sm">
								{log_match}
							</Heading>
							<Paragraph className="text-indigo-400 relative -top-1" size="sm">
								Match
							</Paragraph>
						</div>
						<span className="bg-indigo-300 h-1/3 w-1 rounded-full absolute right-0 my-auto block"></span>
					</div>
					<div className="flex items-center px-4 py-1 relative">
						<div>
							<Heading className="p-0 text-blue-800" size="sm">
								{bot_team}
							</Heading>
							<Paragraph className="text-indigo-400 relative -top-1" size="sm">
								Team
							</Paragraph>
						</div>
					</div>
				</div>
				<Badge variant={bot_preformance as badgeVariantsTypes}>{bot_preformance}</Badge>
			</div>
			{isExpanded && <LogDetails auto={auto_data} teleop={teleop_data} />}
			<Paragraph size="sm" className="text-indigo-400 text-center">
				scouted by <span className="text-blue-800 font-bold">{scout_name}</span>
			</Paragraph>
			<div
				className={`flex justify-center cursor-pointer ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<ChevronDown />
			</div>
		</div>
	);
};

export default LogOverview;
