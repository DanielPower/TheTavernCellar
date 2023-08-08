import { c as create_ssr_component, b as add_attribute, d as spread, f as escape_attribute_value, h as escape_object, a as subscribe, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
const Box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_attribute("class", `flex rounded-md border p-2 ${$$props.class}`, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
var Scene = /* @__PURE__ */ ((Scene2) => {
  Scene2[Scene2["cellar"] = 0] = "cellar";
  Scene2[Scene2["tavern"] = 1] = "tavern";
  Scene2[Scene2["shop"] = 2] = "shop";
  return Scene2;
})(Scene || {});
const initialState = {
  scene: 1,
  kills: 0,
  energy: 50,
  clickPower: 1,
  maxEnergy: 50,
  hiredAdventurers: 0,
  adventurerKps: 1 / 6,
  tavernMessage: `Ahoy there, intrepid adventurer! Welcome to "The Rat's Nest," where the rodents roam as free as the laughter and spirits flow. I'm Gump, the friendly face behind the bar, and I couldn't help but notice your determined aura as you entered. Now, I don't mean to be a bother, but we've found ourselves in a bit of a, shall we say, "cheesy" situation. You see, our beloved tavern has become a haven for our rat friends, and we're in dire need of a hero to help us regain control of the situation. What do you say? Could you lend us a hand in ridding our quaint establishment of these furry freeloaders? In return, I promise you the finest mug of "Rat's Tail Ale" and a feast that'll have you grinning from ear to ear!`,
  cellarMessage: `The tavern cellar is dark and damp. You hear a faint dripping sound. You can't see anything, but you can feel a cold stone wall to your left and a wooden door to your right."`
};
function createStore() {
  const { subscribe: subscribe2, set, update } = writable(initialState);
  return {
    subscribe: subscribe2,
    manualKill: () => update((state) => {
      if (state.energy > 0) {
        return {
          ...state,
          kills: state.kills + state.clickPower,
          energy: state.energy - 1
        };
      }
      return state;
    }),
    adventurerKill: (dt) => update((state) => ({
      ...state,
      kills: state.kills + state.hiredAdventurers * state.adventurerKps * dt
    })),
    gotoTavern: () => update((state) => ({
      ...state,
      scene: 1
      /* tavern */
    })),
    gotoCellar: () => update((state) => ({
      ...state,
      scene: 0
      /* cellar */
    })),
    gotoShop: () => update((state) => ({
      ...state,
      scene: 2
      /* shop */
    })),
    hireAdventurers: (count) => update((state) => ({
      ...state,
      hiredAdventurers: state.hiredAdventurers + count
    })),
    rest: () => update((state) => ({ ...state, energy: state.maxEnergy })),
    reset: () => set(initialState)
  };
}
const store = createStore();
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ref = null } = $$props;
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread(
    [
      {
        class: escape_attribute_value(`rounded-md border-2 border-red-800 bg-gradient-to-b from-gray-200 to-gray-500
    p-1 text-black hover:from-gray-300 hover:to-gray-600 active:from-gray-600 
    active:to-gray-900 active:text-white disabled:cursor-not-allowed disabled:from-gray-400
    disabled:to-gray-700 disabled:text-gray-700`)
      },
      escape_object($$props)
    ],
    {}
  )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</button>`;
});
const Cellar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  $$unsubscribe_store();
  return `<div class="flex">${validate_component(Box, "Box").$$render($$result, { class: "shrink-0 flex-col bg-green-950" }, {}, {
    default: () => {
      return `<img src="cellar.webp" alt="Cellar" width="200" height="200"> ${validate_component(Button, "Button").$$render($$result, { disabled: $store.energy === 0 }, {}, {
        default: () => {
          return `Kill a rat`;
        }
      })} ${$store.kills >= 50 ? `${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Return to Tavern`;
        }
      })}` : ``}`;
    }
  })} ${validate_component(Box, "Box").$$render($$result, { class: "grow bg-green-950" }, {}, {
    default: () => {
      return `<div>${escape($store.cellarMessage)}</div>`;
    }
  })}</div>`;
});
const Tavern = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  $$unsubscribe_store();
  return `<div class="flex">${validate_component(Box, "Box").$$render($$result, { class: "shrink-0 flex-col bg-green-950" }, {}, {
    default: () => {
      return `<img src="barkeep.webp" alt="Barkeep" width="200" height="200"> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Enter the Cellar`;
        }
      })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Hire Adventurer`;
        }
      })} ${validate_component(Button, "Button").$$render(
        $$result,
        {
          disabled: $store.energy === $store.maxEnergy
        },
        {},
        {
          default: () => {
            return `Rest`;
          }
        }
      )}`;
    }
  })} ${validate_component(Box, "Box").$$render($$result, { class: "grow bg-green-950" }, {}, {
    default: () => {
      return `${escape($store.tavernMessage)}`;
    }
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  $$unsubscribe_store();
  return `<div class="flex">${validate_component(Box, "Box").$$render($$result, { class: "grow flex-col bg-red-950" }, {}, {
    default: () => {
      return `<div>Rats killed: ${escape(Math.floor($store.kills))}</div>`;
    }
  })} ${validate_component(Box, "Box").$$render($$result, { class: "grow flex-col bg-red-950" }, {}, {
    default: () => {
      return `<div>Energy: ${escape($store.energy)} / ${escape($store.maxEnergy)}</div>`;
    }
  })} ${$store.hiredAdventurers > 0 ? `${validate_component(Box, "Box").$$render($$result, { class: "grow flex-col bg-red-950" }, {}, {
    default: () => {
      return `<div>Adventurers: ${escape($store.hiredAdventurers)}</div>`;
    }
  })}` : ``}</div> ${$store.scene === Scene.cellar ? `${validate_component(Cellar, "Cellar").$$render($$result, {}, {}, {})}` : `${$store.scene === Scene.tavern ? `${validate_component(Tavern, "Tavern").$$render($$result, {}, {}, {})}` : `${$store.scene === Scene.shop ? `` : ``}`}`}`;
});
export {
  Page as default
};
