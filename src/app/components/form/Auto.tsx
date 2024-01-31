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

const Auto = ({ updateForm, auto }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, leftStartingZone: !auto.leftStartingZone },
				}),
			toggled: auto.leftStartingZone,
			title: '',
			description: '?',
		},
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					auto: { ...auto, scored: !auto.scored },
				}),
			toggled: auto.scored,
			description: 'Did the robot score during auto?',
			showChildren: auto.scored === true,
			children: [
				{
					type: 'number',
					onClick: (e: any) => e.stopPropagation(),
					variant: 'purpler',
					onChange: (e: any) =>
						updateForm({
							auto: { ...auto, ampScore: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
						}),
					title: 'Cubes Scored',
					placeholder: auto.ampScore.toString(),
				},
			],
			title: 'Scored',
		},
	];
	return (
		<div>
			<Heading size={'xs'}>Auto</Heading>
			<Paragraph>Howd your robot preform during auto?</Paragraph>
			<div className="py-2">
				{formInputs.map((input: any, i) => {

					return (
						<>
							<FormInput key={i} {...input}>
								{input.children}
							</FormInput>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Auto;
