import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';

type stepItems = FormItems & {
	updateForm: (item: Partial<FormItems>) => Promise<void>;
};

// {
// 	type: 'toggle',
// 	toggled: ,
// 	onClick: () => setTest(!test),
// 	placeholder: 'text',
// },
// (parameter) teleop: {
//     scoredAmp: boolean; X
//     ampActivatedAmount: number;
//     ampScore: number; X
//     scoredSpeaker: boolean; X
//     speakerScore: number; X
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
			type: 'number',
			title: 'Speaker Notes Scored',
			placeholder: teleop.speakerScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, speakerScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, speakerScore: (teleop.speakerScore + 1)}}).then(setThing(teleop.speakerScore + 1))
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, speakerScore: (teleop.speakerScore - 1)}}).then(setThing(teleop.speakerScore - 1))
			}
		},
		{
			type: "number",
			title: "Speaker (Amplified) Notes Scored",
			placeholder: teleop.amplifiedSpeakerScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: (teleop.amplifiedSpeakerScore + 1)}}).then(setThing(teleop.amplifiedSpeakerScore + 1))
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, amplifiedSpeakerScore: (teleop.amplifiedSpeakerScore - 1)}}).then(setThing(teleop.amplifiedSpeakerScore - 1))
			}
		},
		
		{
			type: 'number',
			title: 'Amp Notes Scored',
			placeholder: teleop.ampScore.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, ampScore: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampScore: (teleop.ampScore + 1)}}).then(setThing(teleop.ampScore + 1))
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampScore: (teleop.ampScore - 1)}}).then(setThing(teleop.ampScore - 1))
			}
			
		},
		{
			type: "number",
			title: "Amp (Amplified) Score",
			placeholder: teleop.ampActivatedAmount.toString(),
			onChange: (e: any) => updateForm({ teleop: { ...teleop, ampActivatedAmount: parseInt(e.target.value) } }),
			incrementButtons: true,
			increment: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampActivatedAmount: (teleop.ampActivatedAmount + 1)}}).then(setThing(teleop.ampActivatedAmount + 1))
			},
			decrease: (setThing: Function) => {
				updateForm({ teleop: { ...teleop, ampActivatedAmount: (teleop.ampActivatedAmount - 1)}}).then(setThing(teleop.ampActivatedAmount - 1))
			}
		},


		{
			type: 'toggle',
			onClick: () => updateForm({ teleop: { ...teleop, hangOnChain: !teleop.hangOnChain } }),
			toggled: teleop.hangOnChain,
			title: 'Hung On Chain?',
			description: 'Did they hang?',
			children: [
				{
					type: 'toggle',
					onClick: (e: any) => {e.stopPropagation(); updateForm({ teleop: { ...teleop, hangInHarmony: !teleop.hangInHarmony }})},
					toggled: teleop.hangInHarmony,
					title: 'Harmonize?',
					description: 'Did atleast two of them hang?',
				},
				{
					type: "number",
					onChange: (e: any) => {e.stopPropagation(); updateForm({ teleop: { ...teleop, trapScore: e.target.value}})},
					title: "Trap Score",
					description: "How many times did they score trap?",
					placeholder: teleop.trapScore.toString(),
					incrementButtons: true,
					increment: (setThing: Function) => {
						updateForm({ teleop: { ...teleop, trapScore: (teleop.trapScore + 1)}}).then(setThing(teleop.trapScore + 1))
					},
					decrease: (setThing: Function) => {
						updateForm({ teleop: { ...teleop, trapScore: (teleop.trapScore - 1)}}).then(setThing(teleop.trapScore - 1))
					}
				}
			],
		},
	];
	return (
		<div>
			<Heading size={'uberSmall'} className="text-t-100 my-1">
				Teleop
			</Heading>
			<div className="py-2 flex flex-col gap-2">
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
