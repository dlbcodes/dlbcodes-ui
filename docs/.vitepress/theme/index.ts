import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import HomeHero from "./HomeHero.vue";
import DemoPreview from "./DemoPreview.vue";
import "./style.css";
import "./demo-preview.css";

export default {
	...DefaultTheme,
	Layout() {
		return h(DefaultTheme.Layout, null, {
			"home-hero-before": () => h(HomeHero),
		});
	},
	enhanceApp({ app }) {
		app.component("demo-preview", DemoPreview);
	},
};