import type Two from 'two.js';
import { world } from '../ecs';

const qSprite = world.with('sprite', 'position');

export const createRenderSystem = (two: Two) => {
	return () => {
		two.clear();
		for (const entity of qSprite) {
			const { sprite, position } = entity;
			sprite.object.translation.set(position.x + sprite.offset.x, position.y + sprite.offset.y);
			two.add(sprite.object);
		}
		two.update();
	};
};
