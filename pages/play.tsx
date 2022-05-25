import React from 'react';
import Game from '@components/Game';
import MainLayout from '@components/_layouts/MainLayout';
import useForm from '@core/hooks/useForm';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn } = useGame();
	const { form, mutateForm, resetForm } = useForm({
		size: '8',
		playerSize: '4',
	});
	const { initiateBoard, initiatePlayer } = useGame();

	const reInitiate = () => {
		initiateBoard(parseInt(form.size));
		initiatePlayer(parseInt(form.playerSize));
		resetForm();
	};

	return (
		<MainLayout title="Play" className="flex-cc col">
			<div className="flex-cc mb-12">
				<div className="flex-ss col mx-2">
					<label htmlFor="size">Board size</label>
					<input
						type="text"
						value={form.size}
						onChange={mutateForm}
						name="size"
						className="border"
						id="size"
					/>
				</div>
				<div className="flex-ss col mx-2">
					<label htmlFor="size">How many players</label>
					<input
						type="text"
						value={form.playerSize}
						onChange={mutateForm}
						name="playerSize"
						className="border"
						id="size"
						placeholder=""
					/>
				</div>
				<button onClick={reInitiate} className="px-4 py-1 bg-gray-100">
					Play
				</button>
			</div>
			<p className="mb-8 text-xl">Player {turn} turn</p>
			<Game />
		</MainLayout>
	);
};

export default Play;

