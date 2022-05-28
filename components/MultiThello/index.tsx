import React from 'react';
import TileBoard from './TileBoard';
import useForm from '@core/hooks/useForm';
import { useGame } from '@core/redux/selectors/game';

const MultiThello = () => {
	const { form, mutateForm, resetForm } = useForm({
		command: '',
	});
	const { tileStatus, board, status, setSelected } = useGame();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { command } = form;
		if (command.length > 2 && /^[1-8](,[1-8])*$/.test(command.replace(/\s/g, ''))) {
			const splitted = command.replace(/\s/g, '').split(',');
			if (splitted.length === 2) {
				const selected = { x: parseInt(splitted[0]), y: parseInt(splitted[1]) };
				setSelected(selected);
				resetForm();
			}
		}
	};

	return (
		<div className="flex-cc col">
			<div className="flex-cc p-8 mx-24 my-8 bg-white rounded-xl">
				<div className="flex-cc">
					{tileStatus.map((column, x) => (
						<div className="flex-cc col" key={x}>
							{column.map((abled, y) => (
								<TileBoard
									disabled={!abled || status === 'initial'}
									value={board[x][y]}
									x={x}
									y={y}
									key={`${x}-${y}`}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex-sc bg-black bg-opacity-40 rounded-md border w-54"
			>
				<p className="mr-3 ml-4 text-2xl font-bold">{'>'}</p>
				<input
					type="text"
					value={form.command}
					onChange={mutateForm}
					name="command"
					className="py-2 pr-3 bg-white bg-opacity-0"
					id="size"
					placeholder=""
				/>
			</form>
		</div>
	);
};

export default MultiThello;
