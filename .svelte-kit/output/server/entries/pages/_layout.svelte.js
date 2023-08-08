import { c as create_ssr_component } from "../../chunks/ssr.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 class="text-2xl" data-svelte-h="svelte-1kq2iww">The Basement Cellar</h1> <p class="pb-1 text-lg" data-svelte-h="svelte-coxp7y">Created for Gump Jam</p> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
