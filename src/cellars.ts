import type { State } from "./store";
import { TavernStage } from "./tavern";

export const cellars: {
  id: number;
  available: (store: State) => boolean;
  entranceText: string;
  entranceButtonText: string;
  interiorText: string;
  ratExperience: number;
  ratGold: number;
  initialAdventurerCost: number;
}[] = [
  {
    id: 0,
    available: (store) => store.tavernStage >= TavernStage.firstQuestAccepted,
    entranceText: `As your eyes follow Gump's pleading gaze, you notice a worn wooden door nestled in a dimly lit corner. The flickering candlelight casts eerie shadows on the door's surface, revealing faint claw marks and scuffing. It's clear that this portal to the unknown holds the key to the tavern's rat-infested predicament. With a deep breath, you approach the cellar door, your heart quickening in anticipation of the challenge that lies ahead.`,
    entranceButtonText: "Enter the cellar",
    interiorText: `The first floor of the cellar exudes a warm ambiance, lit by lanterns that cast a soft glow over rows of neatly arranged casks, barrels, and crates. The familiar scents of aged spirits and stored provisions create an inviting atmosphere. Wooden tables hold bottles and tankards, while the stone floor retains the well-trodden feel of history. However, the occasional scurrying of rats and their tiny squeaks remind you of the task at hand, disrupting the otherwise ordinary appearance of the tavern's cellar.`,
    ratExperience: 2,
    ratGold: 5,
    initialAdventurerCost: 5,
  },
  {
    id: 1,
    available: (store) => store.level >= 5,
    entranceText: "You approach the cellar entrance.",
    entranceButtonText: "Enter the cellar",
    interiorText: `As you descend into the sub-cellar's lower level, the atmosphere grows slightly darker, with lanterns casting deeper shadows. The stone walls and wooden shelves continue to line the chamber, resembling the tavern's cellar above. The air carries a faint mustiness, and your footsteps create soft echoes.\n\nWhile the layout remains familiar, the sub-cellar hosts a higher concentration of rats. They scurry around more frequently, their beady eyes reflecting the dim light. Despite this, the space appears relatively ordinary at first glance, revealing the infestation only upon closer inspection.`,
    ratExperience: 5,
    ratGold: 10,
    initialAdventurerCost: 100,
  },
];
