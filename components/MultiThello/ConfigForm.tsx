import React from 'react';
import useForm from '@core/hooks/useForm';
import { useGame } from '@core/redux/selectors/game';

const ConfigForm = () => {
	const { form, mutateForm } = useForm({
		player: '4',
		board: '8',
	});

	const { start } = useGame();

	const reInitiate = () => {
		start({
			player: parseInt(form.player),
			board: parseInt(form.board),
		});
	};

	return (
		<div className="flex-cc mb-12">
			<div className="flex-ss col mx-2">
				<label htmlFor="size">Board size (6 - 12)</label>
				<input
					type="text"
					value={form.board}
					onChange={mutateForm}
					name="board"
					className="border"
					id="size"
				/>
			</div>
			<div className="flex-ss col mx-2">
				<label htmlFor="size">Player size (3 - 8)</label>
				<input
					type="text"
					value={form.player}
					onChange={mutateForm}
					name="player"
					className="border"
					id="size"
					placeholder=""
				/>
			</div>
			<button onClick={reInitiate} className="px-4 py-1 bg-gray-100">
				Play
			</button>
		</div>
	);
};

export default ConfigForm;
