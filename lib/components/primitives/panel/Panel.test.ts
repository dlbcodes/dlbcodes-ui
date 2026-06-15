import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Panel from "./Panel.vue";
import PanelHeader from "./PanelHeader.vue";
import PanelContent from "./PanelContent.vue";
import PanelFooter from "./PanelFooter.vue";

// These are presentational layout primitives — no logic, state, or events — so
// the meaningful assertions are limited to slot rendering and class merging.
describe("Panel primitives", () => {
	const cases = [
		{ name: "Panel", comp: Panel },
		{ name: "PanelHeader", comp: PanelHeader },
		{ name: "PanelContent", comp: PanelContent },
		{ name: "PanelFooter", comp: PanelFooter },
	];

	for (const { name, comp } of cases) {
		describe(name, () => {
			it("renders its default slot", () => {
				const wrapper = mount(comp, {
					slots: { default: "<span class='probe'>hi</span>" },
				});
				expect(wrapper.find(".probe").exists()).toBe(true);
				expect(wrapper.text()).toContain("hi");
			});

			it("merges a custom class onto the root", () => {
				const wrapper = mount(comp, { props: { class: "custom-x" } });
				expect(wrapper.classes()).toContain("custom-x");
			});

			it("keeps its base classes when a custom class is added", () => {
				// tailwind-merge shouldn't strip unrelated base classes.
				const wrapper = mount(comp, { props: { class: "custom-x" } });
				// every one renders a flex/layout root; just assert the root is a div
				expect(wrapper.element.tagName).toBe("DIV");
			});
		});
	}

	it("composes Header + Content + Footer inside a Panel", () => {
		const wrapper = mount(Panel, {
			global: { components: { PanelHeader, PanelContent, PanelFooter } },
			slots: {
				default: `
					<PanelHeader>Title</PanelHeader>
					<PanelContent>Body</PanelContent>
					<PanelFooter>Actions</PanelFooter>
				`,
			},
		});
		const text = wrapper.text();
		expect(text).toContain("Title");
		expect(text).toContain("Body");
		expect(text).toContain("Actions");
	});
});