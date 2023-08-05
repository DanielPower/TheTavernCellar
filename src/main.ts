import Two from 'two.js';
import { world } from './ecs';
import { sMovement } from './systems/movement';
import { createRenderSystem } from './systems/render';
import { bSprite } from './bundles';
import { sBounce } from './systems/bounce';
import { texturePromises } from './textures';

const canvas = document.getElementById('game') as HTMLCanvasElement;
await Promise.all(texturePromises);
const two = new Two({
	type: Two.Types.canvas,
	domElement: canvas
});
const sRender = createRenderSystem(two);

world.add({
	position: { x: 300, y: 300 },
	velocity: { x: 200, y: 200 },
	bounce: true,
	...bSprite('assets/rat.png')
});

let lastUpdate = Date.now();

const update = () => {
	const time = Date.now();
	const dt = (time - lastUpdate) / 1000;
	sMovement(dt);
	sBounce(two);
	lastUpdate = time;
	setTimeout(update, 4);
};

const render = () => {
	sRender();
	requestAnimationFrame(render);
};

update();
render();

const onResize = () => {
	const width = canvas.parentElement!.clientWidth;
	const height = width * (9 / 16);
	two.renderer.setSize(width, height);
};
onResize();
window.addEventListener('resize', onResize);
