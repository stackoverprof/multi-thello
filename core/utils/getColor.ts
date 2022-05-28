import * as ColorSeed from 'color-seed';

export const getColor = (seed: number) => {
	return colors[seed - 1] || ColorSeed.getColor(obfuscate(seed));
};

const colors = [
	'#ff9b91',
	'#80d8ff',
	'#ffd740',
	'#69f0ae',
	'#b388ff',
	'#795548',
	'#ffb74d',
	'#78909c',
	'#0000cc',
	'#ff00ff',
	'#ff0000',
	'#00ffff',
	'#ffd0ff',
	'#80d000',
	'#7898ff',
	'#b3809c',
	'#8b008b',
	'#daa520',
	'#cdcdcd',
	'#ba101a',
];

function obfuscate(seed) {
	return seed % 2
		? seed * 2 + Math.pow(2, seed) / 2
		: ((seed * seed) / 2) * (Math.sqrt(seed) * 2);
}

