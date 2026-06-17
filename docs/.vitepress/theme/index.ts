import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import HomeHero from "./HomeHero.vue";
import HomeShowcase from "./HomeShowcase.vue";
import HomeFeatures from "./HomeFeatures.vue";
import HomeFooter from "./HomeFooter.vue";
import DemoPreview from "./DemoPreview.vue";
import CodeBlock from "./CodeBlock.vue";
import "./style.css";
import "./demo-preview.css";

export default {
	...DefaultTheme,
	Layout() {
		return h(DefaultTheme.Layout, null, {
			"home-hero-before": () => h(HomeHero),
			"home-hero-after": () => h(HomeShowcase),
			"home-features-after": () => [h(HomeFeatures), h(HomeFooter)],
		});
	},
	enhanceApp({ app }) {
		app.component("demo-preview", DemoPreview);
		app.component("code-block", CodeBlock);
	},
};