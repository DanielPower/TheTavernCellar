import type Two from 'two.js';
import { world } from '../ecs';
import { box } from '../util';

const qBounce = world.with('position', 'velocity', 'size', 'bounce');

export const sBounce = (two: Two) => {
	for (const entity of qBounce) {
		const { position, velocity, size } = entity;
		const { left, right, top, bottom } = box(entity);
		const halfWidth = size.width / 2;
		const halfHeight = size.height / 2;
		if (left < 0) {
			position.x = 0 + halfWidth;
			velocity.x *= -1;
		}
		if (top < 0) {
			position.y = halfHeight;
			velocity.y *= -1;
		}
		if (right > two.width) {
			position.x = two.width - halfWidth;
			velocity.x *= -1;
		}
		if (bottom > two.height) {
			position.y = two.height - halfHeight;
			velocity.y *= -1;
		}
	}
};
