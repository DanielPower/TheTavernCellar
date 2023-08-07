import Two from 'two.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
export const two = new Two({
	type: Two.Types.canvas,
	domElement: canvas
});

const onResize = () => {
	const width = canvas.parentElement!.clientWidth;
	const height = width * (9 / 16);
	two.renderer.setSize(width, height);
};
onResize();
window.addEventListener('resize', onResize);
