import { sBounce } from '../systems/bounce';
import { sMovement } from '../systems/movement';
import { sRender } from '../systems/render';

export const bouncyRatScene = {
	update: (dt: number) => {
		sMovement(dt);
		sBounce();
	},
	render: () => {
		sRender();
	}
};
