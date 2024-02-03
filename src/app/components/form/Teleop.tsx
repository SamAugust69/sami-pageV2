import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => void;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	placeholder: 'text',
// },
// (parameter) teleop: {
//     scoredAmp: boolean;
//     ampActivatedAmount: number;
//     ampScore: number;
//     scoredSpeaker: boolean;
//     speakerScore: number;
//     amplifiedSpeakerScore: number;
//     hangOnChain: boolean;
//     hangInHarmony: boolean;
//     scoredTrap: boolean;
//     thrownNoteScore: boolean;
//     thrownNoteAmount: number;
// }

const Teleop = ({ updateForm, teleop }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: "toggle",
			title: "Scored Amp?",
			description: "Did the robot score during auto?",
			toggled: teleop.scoredAmp,
			onClick: () => updateForm({teleop: {...teleop, scoredAmp: !teleop.scoredAmp}}),
			children: [
				{
					type: "number",
					title: "How much?",
					placeholder: teleop.ampScore.toString(),
					onChange: (e: any) => updateForm({teleop: {...teleop, ampScore: e.target.value}}) 
				}
			]
		},
		{
			type: "toggle",
			title: "Scored Speaker?",
			description: "Did the robot score during auto?",
			toggled: teleop.scoredSpeaker,
			onClick: () => updateForm({teleop: {...teleop, scoredSpeaker: !teleop.scoredSpeaker}}),
			children: [
				{
					type: "number",
					title: "How much?",
					placeholder: teleop.speakerScore.toString(),
					onChange: (e: any) => updateForm({teleop: {...teleop, speakerScore: e.target.value}}) 
				}
			]
		},
		{
			type: "carousel",
		}
	];
	return (
		<div>
			<Heading size={'xs'}>Teleop</Heading>
			<Paragraph>Howd your robot preform during teleop?🗣️</Paragraph>
			<div className="py-2">
				{formInputs.map((input: any, i) => {
					return (
						<FormInput key={i} {...input}>
							{input.children}
						</FormInput>
					);
				})}
			</div>
		</div>
	);
};

export default Teleop;
