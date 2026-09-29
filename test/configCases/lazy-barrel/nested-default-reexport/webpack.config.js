"use strict";

const path = require("path");

/** @import { NormalModule } from "../../../../" */

/** @type {(concatenateModules: boolean) => import("../../../../").Configuration} */
const config = (concatenateModules) => ({
	mode: "production",
	optimization: {
		sideEffects: true,
		providedExports: true,
		usedExports: true,
		concatenateModules,
		minimize: false
	},
	plugins: [
		(compiler) => {
			const created = new Set();
			compiler.hooks.thisCompilation.tap("Test", (compilation) => {
				compilation.hooks.buildModule.tap("Test", (module) => {
					created.add(/** @type {NormalModule} */ (module).resource);
				});
			});
			compiler.hooks.done.tap("Test", () => {
				expect(
					created.has(path.resolve(__dirname, "lib/Button/Button.mjs"))
				).toBe(true);
			});
		}
	]
});

/** @type {import("../../../../").Configuration[]} */
module.exports = [config(false), config(true)];
