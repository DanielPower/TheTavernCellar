import { store } from "./store";

export enum TavernStage {
  introduction,
  firstQuestAccepted,
}

export const stages: {
  text: string;
  buttons: { text: string; action: () => void }[];
  advanceCondition?: () => boolean;
}[] = [
  {
    text: `Ahoy there, intrepid adventurer! Welcome to "The Rat's Nest," where the rodents roam as free as the laughter and spirits flow. I'm Gump, the friendly face behind the bar, and I couldn't help but notice your determined aura as you entered. Now, I don't mean to be a bother, but we've found ourselves in a bit of a, shall we say, "cheesy" situation. You see, our beloved tavern has become a haven for our rat friends, and we're in dire need of a hero to help us regain control of the situation. What do you say? Could you lend us a hand in ridding our quaint establishment of these furry freeloaders? In return, I promise you the finest mug of "Rat's Tail Ale" and a feast that'll have you grinning from ear to ear!`,
    buttons: [
      {
        text: "Accept Quest",
        action: () => store.advanceTavernStage(),
      },
    ],
  },
  {
    text: `A hearty thank you, brave soul, for accepting our ratty quest! Your courage shines like a beacon in the night. Follow me, and I shall lead you to the heart of our rodent conundrum. Gump beckons with a flourish of his arm Right this way, down the winding path of cheese and chivalry, to the cellar door that harbors both mystery and mischief. May your steps be sure and your spirit unwavering as you embark on this daring venture to restore our tavern's glory!`,
    buttons: [],
    advanceCondition: () => store.getState().kills >= 50,
  },
  {
    text: `The barkeep looks at you and says, "You've killed 50 rats! You must be exhausted. I'll give you 10 gold for every rat you kill. Just let me know when you're ready to rest."`,
    buttons: [
      {
        text: "Talk to the barkeep",
        action: () => store.advanceTavernStage(),
      },
    ],
  },
];
