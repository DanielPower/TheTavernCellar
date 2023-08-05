import Two from 'two.js';
import { Texture } from 'two.js/src/effects/texture';

export const texturePromises = ['assets/rat.png'].map(
	(src) =>
		new Promise<Texture>((resolve) => {
			const texture = new Two.Texture(src, () => resolve(texture));
		})
);
