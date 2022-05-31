import React from 'react';
import BoardGame from '@components/MultiThello/BoardGame';
import CommandLine from '@components/MultiThello/CommandLine';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import ScoreBoard from '@components/MultiThello/ScoreBoard';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn, winners } = useGame();

	const getBackgroundColor = () => {
		return `${winners.length > 1 ? '#ffffff' : getColor(winners[0] || turn)}4A`;
	};

	return (
		<MainLayout
			className="flex-cc overflow-hidden py-8 transition duration-500"
			style={{ backgroundColor: getBackgroundColor() }}
		>
			<ConfigForm />
			<div className="flex-cc col">
				<BoardGame />
				<CommandLine />
			</div>
			<ScoreBoard />
		</MainLayout>
	);
};

export default Play;
