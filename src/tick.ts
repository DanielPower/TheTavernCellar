import { store } from "./store";

export const gameTick = (dt: number) => {
  store.adventurerKill(dt);
};
