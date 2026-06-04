import DefaultTheme from "vitepress/theme";
import DemoPreview from "./DemoPreview.vue";
import "./style.css";
import "./demo-preview.css";

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.component("demo-preview", DemoPreview);
	},
};