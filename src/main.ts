import { world } from './ecs';
import { bSprite } from './bundles';
import { texturePromises } from './textures';
import { bouncyRatScene } from './scenes/bouncyRat';

await Promise.all(texturePromises);

world.add({
	position: { x: 300, y: 300 },
	velocity: { x: 200, y: 200 },
	bounce: true,
	...bSprite('assets/rat.png')
});

let lastUpdate = Date.now();
const scene = bouncyRatScene;

const update = () => {
	const time = Date.now();
	const dt = (time - lastUpdate) / 1000;
	scene.update(dt);
	lastUpdate = time;
	setTimeout(update, 4);
};

const render = () => {
	scene.render();
	requestAnimationFrame(render);
};

update();
render();
