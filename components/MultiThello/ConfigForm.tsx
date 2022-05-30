import React, { useEffect } from 'react';
import useForm from '@core/hooks/useForm';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const ConfigForm = () => {
	const { form, mutateForm, setForm } = useForm({
		board: '8',
		players: '4',
	});

	const { start, turn, winners, board, players, status, setStatus } = useGame();

	const reInitiate = () => {
		start({
			board: parseInt(form.board),
			players: parseInt(form.players),
		});
	};

	const play = () => {
		setStatus('playing');
	};

	useEffect(() => {
		reInitiate();
	}, []);

	useEffect(() => {
		reInitiate();
	}, []);

	const needReinitiation =
		parseInt(form.board) !== board.length || parseInt(form.players) !== players.length;

	useEffect(() => {
		setForm('board', board.length);
		setForm('player', players.length);
	}, [players.length, board.length]);

	return (
		<div className="flex-cs col mb-12">
			<h1
				className="z-10 mt-16 mb-8 text-4xl font-bold text-center "
				style={{ color: winners.length > 1 ? 'white' : getColor(winners[0] || turn) }}
			>
				{players.length === 1 ? 'Thello' : players.length === 2 ? 'OThello' : 'MultiThello'}
			</h1>
			<div className="flex-ss col my-2">
				<label htmlFor="size" className="flex-cc gap-1 mb-2">
					<span className="text-lg font-semibold">Board</span>
					<span className="text-sm opacity-50">(any size you like)</span>
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
				<label htmlFor="size" className="flex-cc gap-1 mb-2">
					<span className="text-lg font-semibold">Player</span>
					<span className="text-sm opacity-50">(as much as you want)</span>
				</label>
				<input
					type="text"
					value={form.players}
					onChange={mutateForm}
					name="players"
					className="px-3 py-2 bg-white bg-opacity-0 rounded-md border w-54"
					id="size"
					placeholder=""
				/>
			</div>
			{status === 'initial' && !needReinitiation ? (
				<button
					onClick={play}
					className="px-4 my-6 h-11 flex-cc pt-1 text-[22px] font-bold rounded-md border filter hover:brightness-75"
					style={{
						backgroundColor:
							winners.length > 1 ? 'white' : getColor(winners[0] || turn),
						borderColor: winners.length > 1 ? 'white' : getColor(winners[0] || turn),
						color: '#0008',
					}}
				>
					START
				</button>
			) : (
				<button
					onClick={reInitiate}
					className="flex-cc px-4 my-6 h-11 text-lg font-semibold rounded-md border hover:bg-white hover:bg-opacity-10"
					style={{
						borderColor: winners.length > 1 ? 'white' : getColor(winners[0] || turn),
						color: winners.length > 1 ? 'white' : getColor(winners[0] || turn),
					}}
				>
					NEW GAME
				</button>
			)}
		</div>
	);
};

export default ConfigForm;
