import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	publicDir: false,
	plugins: [
		vue(),
		tailwindcss(),
		dts({ include: ["lib"], insertTypesEntry: true }),
		viteStaticCopy({
			targets: [
				{
					src: "lib/styles/tokens.css",
					dest: "",
				},
			],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "MyDesignSystem",
			fileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			// Don't bundle these — consumers provide them (see deps decision)
			external: [
				"vue",
				"vue-router",
				"@headlessui/vue",
				"@headlessui-float/vue",
				"@phosphor-icons/vue",
				"@vueuse/core",
				"class-variance-authority",
				"clsx",
				"tailwind-merge",
			],
			output: {
				globals: { vue: "Vue" },
			},
		},
	},
});