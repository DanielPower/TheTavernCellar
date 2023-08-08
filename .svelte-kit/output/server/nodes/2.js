

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2531cec9.js","_app/immutable/chunks/scheduler.269df074.js","_app/immutable/chunks/index.f81231ab.js","_app/immutable/chunks/index.be147fa3.js"];
export const stylesheets = [];
export const fonts = [];
