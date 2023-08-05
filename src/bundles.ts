import Two from 'two.js';

export const bSprite = (image: string, offset: { x: number; y: number } = { x: 0, y: 0 }) => {
	const sprite = new Two.Sprite(image);
	return {
		sprite: {
			object: sprite,
			offset
		},
		size: {
			width: sprite.width,
			height: sprite.height
		}
	};
};
