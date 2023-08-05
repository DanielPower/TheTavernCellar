import Two from 'two.js';
import type { Sprite as TwoSprite } from 'two.js/src/effects/sprite';

export class Sprite {
	object: TwoSprite;
	offset: { x: number; y: number };
	constructor(texture: string, position: { x: number; y: number }) {
		this.object = new Two.Sprite(texture);
		this.offset = position;
	}
}
