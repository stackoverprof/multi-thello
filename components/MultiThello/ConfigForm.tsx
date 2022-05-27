import React from 'react';
import useForm from '@core/hooks/useForm';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const ConfigForm = () => {
	const { form, mutateForm } = useForm({
		player: '4',
		board: '8',
	});

	const { start, turn } = useGame();

	const reInitiate = () => {
		start({
			player: parseInt(form.player),
			board: parseInt(form.board),
		});
	};

	return (
		<div className="flex-cs col mb-12">
			<h1
				className="z-10 mt-16 mb-8 text-4xl font-bold text-center "
				style={{ color: getColor(turn) }}
			>
				MultiThello
			</h1>
			<div className="flex-ss col my-2">
				<label htmlFor="size" className="mb-2">
					Board size (6 - 12)
				</label>
				<input
					type="text"
					value={form.board}
					onChange={mutateForm}
					name="board"
					className="px-3 py-2 bg-white bg-opacity-0 rounded-md border w-54"
					id="size"
				/>
			</div>
			<div className="flex-ss col my-2">
				<label htmlFor="size" className="mb-2">
					Player size (3 - ∞)
				</label>
				<input
					type="text"
					value={form.player}
					onChange={mutateForm}
					name="player"
					className="px-3 py-2 bg-white bg-opacity-0 rounded-md border w-54"
					id="size"
					placeholder=""
				/>
			</div>
			<button
				onClick={reInitiate}
				className="px-5 py-2 my-6 text-lg font-semibold rounded-md border hover:bg-white hover:bg-opacity-10"
				style={{ borderColor: getColor(turn), color: getColor(turn) }}
			>
				Play
			</button>
		</div>
	);
};

export default ConfigForm;
