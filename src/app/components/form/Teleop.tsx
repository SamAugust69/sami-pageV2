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

const Teleop = ({ updateForm, teleop }: stepItems) => {
	const formInputs: Array<FormInputType> = [
		{
			type: 'text',
			onChange: (e: any) =>
				updateForm({
					teleop: { ...teleop, cones_attempted: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
				}),
			title: 'Cones Attempted',
			placeholder: teleop.cones_attempted.toString(),
		},
		{
			type: 'text',
			onChange: (e: any) =>
				updateForm({
					teleop: { ...teleop, cones_scored: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
				}),
			title: 'Cones Scored',
			placeholder: teleop.cones_scored.toString(),
		},
		{
			type: 'text',
			onChange: (e: any) =>
				updateForm({
					teleop: { ...teleop, cubes_attempted: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
				}),
			title: 'Cubes Attempted',
			placeholder: teleop.cubes_attempted.toString(),
		},
		{
			type: 'text',
			onChange: (e: any) =>
				updateForm({
					teleop: { ...teleop, cubes_scored: Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) },
				}),
			title: 'Cones Scored',
			placeholder: teleop.cubes_scored.toString(),
		},
		{
			type: 'toggle',
			onClick: (e: any) =>
				updateForm({
					teleop: { ...teleop, docked: !teleop.docked },
				}),
			toggled: teleop.docked,
			title: 'Docked',
			description: 'Did the robot attempt to dock at the charging station?',
			children: [
				{
					type: 'toggle',
					onClick: (e: any) => {
						e.stopPropagation(),
							updateForm({
								teleop: { ...teleop, engaged_station: !teleop.engaged_station },
							});
					},
					checkbox: true,
					toggled: teleop.engaged_station,
					title: 'Engaged',
					description: 'Did the robot engage the charging station?',
				},
			],
		},
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
