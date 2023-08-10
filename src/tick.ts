import { levelUpSound } from "./sounds";
import { store } from "./store";
import { nextLevelRequirement } from "./util";

const levelUp = () => {
  let state = store.getState();
  while (state.experience >= nextLevelRequirement(state.level)) {
    store.levelUp();
    levelUpSound.play();
    state = store.getState();
  }
};

export const gameTick = (dt: number) => {
  store.adventurerKill(dt);
  levelUp();
};
