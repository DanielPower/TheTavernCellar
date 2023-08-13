import { store } from "./store";

export enum TavernStage {
  introduction,
  ratsNoticed,
  firstQuestAccepted,
  adventurersGuild,
  foundSecondCellar,
}

export const stages: {
  [key in TavernStage]: {
    text: string;
    buttons: { text: string; action: () => void }[];
    advanceCondition?: () => boolean;
  };
} = {
  [TavernStage.introduction]: {
    text: `Welcome to The Rat's Nest Tavern, traveler. I'm Gump, the barkeep here. What can I get you today? A fine ale, perhaps? Our special today is the "Rat's Revenge" brew. Careful though, it's got a bite to it.`,
    buttons: [
      {
        text: "Inquire about the rats",
        action: () => store.advanceTavernStage(),
      },
    ],
  },
  [TavernStage.ratsNoticed]: {
    text: `Ah, you've noticed the commotion downstairs, I see. Those pesky rats have taken quite a liking to our cellar. It's become a bit of a nuisance, I'm afraid. That's why I've put out a call for brave adventurers like yourself to help me deal with the problem. You see, I'm not much of a fighter myself, and I could use some assistance in clearing out those critters. I'll reward you handsomely for your efforts, of course. Gold, treasures, and even free drinks for life are on the table. Just head down to the cellar and take care of those rats, and I'll make sure you're well taken care of.`,
    buttons: [
      {
        text: "Accept Quest",
        action: () => {
          store.advanceTavernStage();
          store.openCellar();
        },
      },
    ],
    advanceCondition: () => store.getState().kills >= 50,
  },
  [TavernStage.firstQuestAccepted]: {
    text: `Thank you for stepping up to the challenge, brave adventurer. Your willingness to help us deal with this rat problem is greatly appreciated. The safety of The Rat's Nest Tavern is in your capable hands. May your skills and courage guide you to victory in the cellar. And remember, if you need a drink to steady your nerves before or after your task, just let me know. Good luck, and may fortune favor your endeavors!`,
    buttons: [],
    advanceCondition: () => store.getState().kills >= 50,
  },
  [TavernStage.adventurersGuild]: {
    text: `Impressive work, adventurer! Your efforts have not gone unnoticed. Clearing out 50 rats is no small feat, and I commend your determination. The tavern is already feeling a bit cleaner thanks to your hard work. If you're looking to expedite the process and bring an end to this infestation more swiftly, there's an adventurer's guild not far from here. They specialize in dealing with these kinds of challenges and can provide you with skilled assistance. Their headquarters are just a short walk from here, near the town square. Hiring some extra hands might be a wise choice, especially considering the depths of the sub-cellar and the potential for more rats to come. Whatever you decide, your dedication to this task is greatly appreciated, and I'm confident that your actions will lead to a cleaner and safer tavern for all.`,
    buttons: [],
    advanceCondition: () => store.getState().level >= 5,
  },
  [TavernStage.foundSecondCellar]: {
    text: `Ah, I see you've found the entrance to the sub-cellar, adventurer. Well done. But I must confess, the true heart of the rat infestation lies even deeper, in the second level of our vast cellar system. It seems those crafty creatures have a way of burrowing into the most unexpected places. To aid you in your quest, I offer you this key. It will grant you access to the sub-cellar's lower level. Be cautious though, for the challenge ahead may be greater than what you've faced above. I have faith in your abilities, and I trust that you'll handle the situation with the utmost care and determination. Once you're ready, use the key to unlock the entrance to the second level. And remember, the reward for your efforts will be worth your dedication. May you find success in your venture, and may these subterranean pests be dealt with once and for all.`,
    buttons: [],
    advanceCondition: () => false,
  },
};
