import { useGame } from '@core/redux/selectors/game';

const useCommand = (value: string, callback: () => void) => {
	const { board, players, start, setStatus, setSelected } = useGame();

	const handleSubmit = (e) => {
		e.preventDefault();
		const command = value.trim();

		if (command.length > 2 && /^[0-9](,[0-9])*$/.test(command.replace(/\s/g, ''))) {
			console.log(command);

			const splitted = command.replace(/\s/g, '').split(',');
			if (splitted.length === 2) {
				const selected = { x: parseInt(splitted[0]), y: parseInt(splitted[1]) };
				setSelected(selected);
			}
		} else if (command.split(' ')[0] === '/new') {
			const config = command.split(' ');
			console.log(config);

			if (/^\d+$/.test(config[1]) && /^\d+$/.test(config[2])) {
				start({
					board: parseInt(config[1]),
					player: parseInt(config[2]),
				});
			} else if (config.length === 1) {
				start({
					board: board.length,
					player: players.length,
				});
			}
		} else if (command.split(' ')[0] === '/start') {
			setStatus('playing');
		}

		callback();
	};
	return handleSubmit;
};

export default useCommand;

