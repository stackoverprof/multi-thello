import React from 'react';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import MultiThello from '@components/MultiThello';
import { getColor } from '@core/utils/getColor';
import { useGame } from '@core/redux/selectors/game';

const Play = () => {
	const { turn, scoring } = useGame();

	console.log(scoring);

	return (
		<MainLayout title="Play" className="flex-cc col py-12">
			<ConfigForm />
			<div className="flex-cc mb-8">
				<div
					className="mr-2 w-4 h-4 rounded-full"
					style={{
						backgroundColor: getColor(turn),
					}}
				></div>
				<p
					className="text-xl font-semibold"
					style={{
						color: getColor(turn),
					}}
				>
					player turn
				</p>
			</div>
			<MultiThello />
			<div className="flex-cc mt-10">
				{scoring.map((data, i) => (
					<p
						className="mx-4 text-xl font-semibold"
						style={{
							color: getColor(data.player),
						}}
						key={i}
					>
						{data.score}
					</p>
				))}
			</div>
		</MainLayout>
	);
};

export default Play;
