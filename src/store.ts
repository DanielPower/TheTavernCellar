import { writable } from 'svelte/store';

export enum Scene {
	cellar,
	tavern,
	shop,
}

const initialState = {
	scene: Scene.tavern,
	kills: 0,
	energy: 50,
	clickPower: 1,
	maxEnergy: 50,
	hiredAdventurers: 0,
	adventurerKps: 1 / 6,
	tavernMessage: `Ahoy there, intrepid adventurer! Welcome to "The Rat's Nest," where the rodents roam as free as the laughter and spirits flow. I'm Gump, the friendly face behind the bar, and I couldn't help but notice your determined aura as you entered. Now, I don't mean to be a bother, but we've found ourselves in a bit of a, shall we say, "cheesy" situation. You see, our beloved tavern has become a haven for our rat friends, and we're in dire need of a hero to help us regain control of the situation. What do you say? Could you lend us a hand in ridding our quaint establishment of these furry freeloaders? In return, I promise you the finest mug of "Rat's Tail Ale" and a feast that'll have you grinning from ear to ear!`,
	cellarMessage: `The tavern cellar is dark and damp. You hear a faint dripping sound. You can't see anything, but you can feel a cold stone wall to your left and a wooden door to your right."`,
};

function createStore() {
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		manualKill: () =>
			update((state) => {
				if (state.energy > 0) {
					return {
						...state,
						kills: state.kills + state.clickPower,
						energy: state.energy - 1,
					};
				}
				return state;
			}),
		adventurerKill: (dt: number) =>
			update((state) => ({
				...state,
				kills: state.kills + state.hiredAdventurers * state.adventurerKps * dt,
			})),
		gotoTavern: () => update((state) => ({ ...state, scene: Scene.tavern })),
		gotoCellar: () => update((state) => ({ ...state, scene: Scene.cellar })),
		gotoShop: () => update((state) => ({ ...state, scene: Scene.shop })),
		hireAdventurers: (count: number) =>
			update((state) => ({
				...state,
				hiredAdventurers: state.hiredAdventurers + count,
			})),
		rest: () => update((state) => ({ ...state, energy: state.maxEnergy })),
		reset: () => set(initialState),
	};
}

export const store = createStore();
