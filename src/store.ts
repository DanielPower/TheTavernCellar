import { get, writable } from "svelte/store";
import { produce } from "immer";
import { nextLevelRequirement } from "./util";

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

type State = {
  adventurerKps: number;
  clickPower: number;
  energy: number;
  experience: number;
  hiredAdventurers: number;
  kills: number;
  level: number;
  maxEnergy: number;
  scene: Scene;
  schemaVersion: number;
  tavernStage: number;
  quests: Record<Quest, QuestState>;
  openedCellars: number[];
};

const initialState: () => State = () => ({
  adventurerKps: 1 / 6,
  clickPower: 1,
  energy: 50,
  experience: 0,
  hiredAdventurers: 0,
  kills: 0,
  level: 1,
  maxEnergy: 50,
  scene: Scene.tavern,
  schemaVersion: 1,
  tavernStage: 0,
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
        if (state.energy > 0) {
          state.kills += state.clickPower;
          state.energy -= 1;
          state.experience += experience;
        }
      }),
    adventurerKill: (dt: number) =>
      update((state) => {
        state.kills += state.hiredAdventurers * state.adventurerKps * dt;
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
    hireAdventurers: (count: number) =>
      update((state) => {
        state.hiredAdventurers += count;
      }),
    acceptQuest: (quest: Quest) =>
      update((state) => {
        state.quests[quest].status = "accepted";
      }),
    rest: () =>
      update((state) => {
        state.energy = state.maxEnergy;
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
        state.openedCellars.push(cellar);
      }),
    advanceTavernStage: () =>
      update((state) => {
        state.tavernStage += 1;
      }),
  };
}

export const store = createStore();
