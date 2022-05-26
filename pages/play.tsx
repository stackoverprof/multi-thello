import React from 'react';
import ConfigForm from '@components/MultiThello/ConfigForm';
import MainLayout from '@components/_layouts/MainLayout';
import MultiThello from '@components/MultiThello';
import ScoreBoard from '@components/MultiThello/ScoreBoard';

const Play = () => {
	return (
		<MainLayout title="Play" className="flex-cc py-12">
			<div className="flex-cs">
				<ConfigForm />
				<MultiThello />
				<ScoreBoard />
			</div>
		</MainLayout>
	);
};

export default Play;
