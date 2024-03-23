import { FormInputType, FormItems } from '@/lib/formTypes';
import FormInput from '@/ui/FormInput';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';
import { useEffect, useRef } from 'react';

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

const Notes = ({ updateForm, bot_preformed, notes }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'toggle',
			onClick: (e: any) => {
				e.stopPropagation();
				updateForm({ bot_preformed: bot_preformed != "bad" ? "bad" : "well"});
			},
			toggled: bot_preformed == "bad",
			title: 'Broke? (toby button)',
			description: 'Were they DISABLED for the majority of the match?',
		},
	];
	
	useEffect(() => {
		textbox.current.value = notes
	}, [notes])

	const textbox = useRef<any>(<div></div>)

	return (
		<div>
			<Heading size={'uberSmall'} className="text-t-100 my-1">
				Notes About Robot (Optional)
			</Heading>
			<div className="py-2 flex flex-col gap-2">
				{formInputs.map((input: any, i) => {
					return (
						<FormInput key={i} {...input}>
							{input.children}
						</FormInput>
					);
				})}
                <textarea ref={textbox} onChange={(e: any) => updateForm({notes: e.target.value})} className='p-2 bg-transparent border-2 border-t-100 focus:ring-0 rounded text-t-100' />
			</div>
		</div>
	);
};

export default Notes;
