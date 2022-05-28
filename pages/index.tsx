import React from 'react';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import MultiThello from '@components/MultiThello';
import ScoreBoard from '@components/MultiThello/ScoreBoard';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn, winners } = useGame();

	return (
		<MainLayout
			title="Play"
			className="flex-cc overflow-hidden py-8 transition duration-500"
			style={{
				backgroundColor: `${
					winners.length > 1 ? '#ffffff' : getColor(winners[0] || turn)
				}4a`,
			}}
		>
			<ConfigForm />
			<MultiThello />
			<ScoreBoard />
		</MainLayout>
	);
};

export default Play;
