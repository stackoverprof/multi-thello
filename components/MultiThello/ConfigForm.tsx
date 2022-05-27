import React, { useEffect } from 'react';
import useForm from '@core/hooks/useForm';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const ConfigForm = () => {
	const { form, mutateForm } = useForm({
		player: '4',
		board: '8',
	});

	const { start, turn, board, players, status, setStatus } = useGame();

	const reInitiate = () => {
		start({
			player: parseInt(form.player),
			board: parseInt(form.board),
		});
	};

	const play = () => {
		setStatus('playing');
	};

	useEffect(() => {
		reInitiate();
	}, []);

	const needReinitiation =
		parseInt(form.board) !== board.length || parseInt(form.player) !== players.length;

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
					Board size
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
			{status === 'initial' && !needReinitiation ? (
				<button
					onClick={play}
					className="px-4 py-1.5 my-6 text-xl font-semibold rounded-md border hover:bg-white hover:bg-opacity-10"
					style={{ borderColor: getColor(turn), color: getColor(turn) }}
				>
					START
				</button>
			) : (
				<button
					onClick={reInitiate}
					className="px-4 py-1.5 my-6 text-xl font-semibold rounded-md border hover:bg-white hover:bg-opacity-10"
					style={{ borderColor: getColor(turn), color: getColor(turn) }}
				>
					NEW GAME
				</button>
			)}
		</div>
	);
};

export default ConfigForm;
