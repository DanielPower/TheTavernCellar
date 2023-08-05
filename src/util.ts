import type { Entity } from './ecs';

export const left = (entity: Entity) => {
	return entity.position!.x - entity.size!.width / 2;
};

export const right = (entity: Entity) => {
	return entity.position!.x + entity.size!.width / 2;
};

export const top = (entity: Entity) => {
	return entity.position!.y - entity.size!.height / 2;
};

export const bottom = (entity: Entity) => {
	return entity.position!.y + entity.size!.height / 2;
};

export const box = (entity: Entity) => ({
	left: left(entity),
	right: right(entity),
	top: top(entity),
	bottom: bottom(entity)
});

export const overlaps = (a: Entity, b: Entity) => {
	return left(a) < right(b) && right(a) > left(b) && top(a) < bottom(b) && bottom(a) > top(b);
};

export const distance = (a: Entity, b: Entity) => {
	return Math.sqrt((a.position!.x - b.position!.x) ** 2 + (a.position!.y - b.position!.y) ** 2);
};
