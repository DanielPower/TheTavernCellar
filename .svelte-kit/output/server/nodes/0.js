import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.5c7ea506.js","_app/immutable/chunks/scheduler.269df074.js","_app/immutable/chunks/index.f81231ab.js"];
export const stylesheets = ["_app/immutable/assets/0.3abe097c.css"];
export const fonts = [];
