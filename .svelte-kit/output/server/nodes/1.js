

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e04c2d1d.js","_app/immutable/chunks/scheduler.269df074.js","_app/immutable/chunks/index.f81231ab.js","_app/immutable/chunks/singletons.2f44edac.js","_app/immutable/chunks/index.be147fa3.js"];
export const stylesheets = [];
export const fonts = [];
