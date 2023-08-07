import { world } from '../ecs';
import { two } from '../canvas';

const qSprite = world.with('sprite', 'position');

export const sRender = () => {
	two.clear();
	for (const entity of qSprite) {
		const { sprite, position } = entity;
		sprite.object.translation.set(position.x + sprite.offset.x, position.y + sprite.offset.y);
		two.add(sprite.object);
	}
	two.update();
};
