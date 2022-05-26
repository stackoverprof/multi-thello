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
		<div className="flex-cs col mb-12">
			<h1 className="z-10 mt-16 mb-8 text-4xl font-bold text-center opacity-20">
				MultiThello
			</h1>
			<div className="flex-ss col my-2">
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
			<div className="flex-ss col my-2">
				<label htmlFor="size">Player size (3 - ∞)</label>
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
			<button onClick={reInitiate} className="px-4 py-1 my-6 bg-gray-100">
				Play
			</button>
		</div>
	);
};

export default ConfigForm;
