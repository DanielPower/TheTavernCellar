import { World } from 'miniplex';
import type { Sprite } from './components/component';

export type Entity = Partial<{
	position: {
		x: number;
		y: number;
	};
	bounce: boolean;
	velocity: {
		x: number;
		y: number;
	};
	sprite: Sprite;
	size: {
		width: number;
		height: number;
	};
}>;

export const world = new World<Entity>();
