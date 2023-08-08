export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["barkeep.webp","berkeley.woff2","cellar.webp","favicon.png"]),
	mimeTypes: {".webp":"image/webp",".woff2":"font/woff2",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.38b8cc92.js","app":"_app/immutable/entry/app.5262160f.js","imports":["_app/immutable/entry/start.38b8cc92.js","_app/immutable/chunks/scheduler.269df074.js","_app/immutable/chunks/singletons.2f44edac.js","_app/immutable/chunks/index.be147fa3.js","_app/immutable/entry/app.5262160f.js","_app/immutable/chunks/scheduler.269df074.js","_app/immutable/chunks/index.f81231ab.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
