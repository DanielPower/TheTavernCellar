import Two from 'two.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
export const two = new Two({
	type: Two.Types.canvas,
	domElement: canvas,
	width: 400,
	height: 225,
});

// Wait for Two to resize the canvas, so I can undo its styling
two.update();
canvas.style.width = '';
canvas.style.height = '';
