import { confetti } from "tsparticles-confetti";
import { levelUpSound } from "./sounds";
import { store } from "./store";
import { nextLevelRequirement } from "./util";

const tryLevelUp = () => {
  let state = store.getState();
  while (state.experience >= nextLevelRequirement(state.level)) {
    store.levelUp();
    levelUpSound.play();
    confetti({
      particleCount: 500,
      spread: 80,
      position: { y: 70 },
    });
    state = store.getState();
  }
};

export const gameTick = (dt: number) => {
  store.adventurerKill(dt);
  tryLevelUp();
};
