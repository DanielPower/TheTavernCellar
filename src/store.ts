import { get, writable } from "svelte/store";
import { produce } from "immer";
import { exponentialCost, nextLevelRequirement } from "./util";
import { TavernStage } from "./tavern";

export enum Scene {
  cellar,
  tavern,
  shop,
}

export type CellarState = {
  id: number;
  adventurersHired: number;
  adventurerKillRemainder: number;
  ratExperience: number;
  ratGold: number;
  initialAdventurerCost: number;
  kills: number;
};

export type State = {
  gold: number;
  adventurerKps: number;
  clickPower: number;
  experience: number;
  level: number;
  scene: Scene;
  schemaVersion: number;
  tavernStage: TavernStage;
  openedCellars: CellarState[];
};

const initialState: () => State = () => ({
  gold: 0,
  adventurerKps: 1 / 6,
  clickPower: 1,
  experience: 0,
  level: 1,
  scene: Scene.tavern,
  schemaVersion: 1,
  tavernStage: TavernStage.introduction,
  openedCellars: [],
});

function createStore() {
  let storedState = {};
  try {
    storedState = JSON.parse(localStorage.getItem("state") || "{}");
  } catch {}
  const {
    subscribe,
    set,
    update: baseUpdate,
  } = writable({
    ...initialState(),
    ...storedState,
  });

  const update = (mutation: (state: State) => void): void => {
    baseUpdate((state) => {
      const newState = produce(state, (draft) => {
        mutation(draft);
      });
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    });
  };

  return {
    subscribe,
    manualKill: (cellarId: number) =>
      update((state) => {
        const cellar = state.openedCellars[cellarId];
        state.openedCellars[cellarId].kills += state.clickPower;
        state.experience += cellar.ratExperience;
        state.gold += cellar.ratGold;
      }),
    adventurerKill: (dt: number) =>
      update((state) => {
        state.openedCellars.forEach((cellar) => {
          const kills =
            cellar.adventurersHired * state.adventurerKps * dt +
            cellar.adventurerKillRemainder;
          cellar.adventurerKillRemainder = kills - Math.floor(kills);
          cellar.kills += Math.floor(kills);
          state.gold += cellar.ratGold * Math.floor(kills);
        });
      }),
    gotoTavern: () =>
      update((state) => {
        state.scene = Scene.tavern;
      }),
    gotoCellar: () =>
      update((state) => {
        state.scene = Scene.cellar;
      }),
    gotoShop: () => update((state) => ({ ...state, scene: Scene.shop })),
    hireAdventurers: (id: number, count: number, cost: number) =>
      update((state) => {
        if (state.gold < cost) {
          return;
        }
        state.openedCellars[id].adventurersHired += count;
        state.gold -= cost;
      }),
    reset: () => set(initialState()),
    levelUp: () =>
      update((state) => {
        state.experience -= nextLevelRequirement(state.level);
        state.level += 1;
      }),
    getState: () => get(store),
    openCellar: () =>
      update((state) => {
        const id = state.openedCellars.length;
        state.openedCellars.push({
          id,
          adventurersHired: 0,
          adventurerKillRemainder: 0,
          kills: 0,
          ratExperience: exponentialCost(5, id, 1.3),
          ratGold: exponentialCost(5, id, 1.2),
          initialAdventurerCost: exponentialCost(100, id, 1.2),
        });
      }),
    advanceTavernStage: () =>
      update((state) => {
        state.tavernStage += 1;
      }),
    queryKills: () => get(store).openedCellars.reduce((a, b) => a + b.kills, 0),
  };
}

export const store = createStore();
