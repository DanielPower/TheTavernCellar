import { world } from '../ecs';

const qMovable = world.with('position', 'velocity');

export const sMovement = (dt: number) => {
	for (const entity of qMovable) {
		entity.position.x += entity.velocity.x * dt;
		entity.position.y += entity.velocity.y * dt;
	}
};
