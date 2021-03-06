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
	'#2f4f4f',
	'#556b2f',
	'#a0522d',
	'#2e8b57',
	'#228b22',
	'#800000',
	'#191970',
	'#708090',
	'#808000',
	'#bc8f8f',
	'#b8860b',
	'#4682b4',
	'#d2691e',
	'#9acd32',
	'#20b2aa',
	'#00008b',
	'#32cd32',
	'#8fbc8f',
	'#800080',
	'#b03060',
	'#9932cc',
	'#ff4500',
	'#ffa500',
	'#ffd700',
	'#ffff00',
	'#0000cd',
	'#00ff00',
	'#00fa9a',
	'#4169e1',
	'#dc143c',
	'#00ffff',
	'#00bfff',
	'#f4a460',
	'#0000ff',
	'#a020f0',
	'#adff2f',
	'#ff6347',
	'#da70d6',
	'#d8bfd8',
	'#ff00ff',
	'#f0e68c',
	'#fa8072',
	'#6495ed',
	'#dda0dd',
	'#add8e6',
	'#ff1493',
	'#98fb98',
	'#7fffd4',
	'#ff69b4',
	'#ffe4c4',
];

function obfuscate(seed) {
	return seed % 2
		? seed * 2 + Math.pow(2, seed) / 2
		: ((seed * seed) / 2) * (Math.sqrt(seed) * 2);
}
