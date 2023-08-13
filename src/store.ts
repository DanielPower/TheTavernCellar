import { get, writable } from "svelte/store";
import { produce } from "immer";
import { nextLevelRequirement } from "./util";
import { TavernStage } from "./tavern";

export enum Quest {
  first,
}

export enum Scene {
  cellar,
  tavern,
  shop,
}

export type QuestState = {
  status: "accepted" | "completed" | "inactive";
};

export type CellarState = {
  id: number;
  adventurersHired: number;
  adventurerKillRemainder: number;
};

type State = {
  gold: number;
  adventurerKps: number;
  clickPower: number;
  experience: number;
  kills: number;
  level: number;
  scene: Scene;
  schemaVersion: number;
  tavernStage: TavernStage;
  quests: Record<Quest, QuestState>;
  openedCellars: CellarState[];
};

const initialState: () => State = () => ({
  gold: 0,
  adventurerKps: 1 / 6,
  clickPower: 1,
  experience: 0,
  kills: 0,
  level: 1,
  scene: Scene.tavern,
  schemaVersion: 1,
  tavernStage: TavernStage.introduction,
  quests: {
    [Quest.first]: {
      status: "inactive",
    },
  },
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
    manualKill: (experience: number) =>
      update((state) => {
        state.kills += state.clickPower;
        state.experience += experience;
        state.gold += 10;
      }),
    adventurerKill: (dt: number) =>
      update((state) => {
        state.openedCellars.forEach((cellar) => {
          const kills =
            cellar.adventurersHired * state.adventurerKps * dt +
            cellar.adventurerKillRemainder;
          cellar.adventurerKillRemainder = kills - Math.floor(kills);
          state.kills += Math.floor(kills);
          state.gold += 5 * Math.floor(kills);
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
    acceptQuest: (quest: Quest) =>
      update((state) => {
        state.quests[quest].status = "accepted";
      }),
    reset: () => set(initialState()),
    levelUp: () =>
      update((state) => {
        state.experience -= nextLevelRequirement(state.level);
        state.level += 1;
      }),
    getState: () => get(store),
    openCellar: (cellar: number) =>
      update((state) => {
        state.openedCellars[cellar] = {
          id: cellar,
          adventurersHired: 0,
          adventurerKillRemainder: 0,
        };
      }),
    advanceTavernStage: () =>
      update((state) => {
        state.tavernStage += 1;
      }),
  };
}

export const store = createStore();
