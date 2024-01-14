import { formItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import { Button } from '../ui/Button';
import LogOverview from '../log-design/LogOverview';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';
import { useState } from 'react';

type stepItems = formItems & {
	updateForm: (item: Partial<formItems>) => void;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	placeholder: 'text',
// },

const Finishing = ({ updateForm, bot_preformed, match, team, scout, auto, teleop }: stepItems) => {
	const [currentPreformance, setCurrentPreformance] = useState(bot_preformed);

	const handleBotPreformed = (preformance: string) => {
		setCurrentPreformance(preformance);
		updateForm({ bot_preformed: preformance });
	};

	const formInputs = [
		{
			type: 'toggle',
			toggled: currentPreformance === 'great',
			onClick: (e: any) => handleBotPreformed('great'),
			className: 'mb-2',
			title: 'Great!',
			description: 'Your bot did really good during the match, well done! explain why they did great in the notes',
		},
		{
			type: 'toggle',
			toggled: currentPreformance === 'well',
			onClick: (e: any) => handleBotPreformed('well'),
			className: 'mb-2',
			title: 'Well',
			description: 'Your bot preformed at a normal level by contributing, and earning points',
		},
		{
			type: 'toggle',
			toggled: currentPreformance === 'poor',
			onClick: (e: any) => handleBotPreformed('poor'),
			className: 'mb-2',
			title: 'Poor',
			description: "Your bot preformed correctly, but didn't make much of an inpact",
		},
		{
			type: 'toggle',
			toggled: currentPreformance === 'bad',
			onClick: (e: any) => handleBotPreformed('bad'),
			className: 'mb-2',
			title: 'Bad',
			description: 'Your bot did extremely bad',
		},
		{
			type: 'toggle',
			toggled: currentPreformance === 'broke',
			onClick: (e: any) => handleBotPreformed('broke'),
			className: 'mb-5',
			title: 'Broke',
			description: 'Your bot broke during the match, explain why/how in the notes',
		},
	];

	const overviewProps = {
		bot_preformance: bot_preformed,
		bot_team: team,
		log_match: match,
		scout_name: scout,
		auto_data: auto,
		teleop_data: teleop,
	};

	return (
		<div>
			<Heading  size={"xs"}>Finishing Up</Heading>
			<Paragraph>How'd your robot do overall?</Paragraph>
			<div className="py-2">
				{formInputs.map((input: any, i) => {
					return (
						<FormInput key={i} {...input}>
							{input.children}
						</FormInput>
					);
				})}
				<LogOverview {...overviewProps} />
			</div>
		</div>
	);
};

export default Finishing;
