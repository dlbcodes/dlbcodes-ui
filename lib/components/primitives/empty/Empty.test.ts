import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import Empty from "./Empty.vue";
import EmptyHeader from "./EmptyHeader.vue";
import EmptyMedia from "./EmptyMedia.vue";
import EmptyTitle from "./EmptyTitle.vue";
import EmptyDescription from "./EmptyDescription.vue";
import EmptyContent from "./EmptyContent.vue";

describe("Empty", () => {
	// Renders every part through its real slot, so this also covers each
	// part's own slot rendering.
	it("composes the full structure", () => {
		const wrapper = mount(
			defineComponent({
				components: {
					Empty,
					EmptyHeader,
					EmptyMedia,
					EmptyTitle,
					EmptyDescription,
					EmptyContent,
				},
				template: `
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">[icon]</EmptyMedia>
							<EmptyTitle>No projects</EmptyTitle>
							<EmptyDescription>Create your first one.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>[action]</EmptyContent>
					</Empty>
				`,
			}),
		);
		const text = wrapper.text();
		for (const part of [
			"[icon]",
			"No projects",
			"Create your first one.",
			"[action]",
		]) {
			expect(text).toContain(part);
		}
	});

	it.each([
		["Empty", Empty],
		["EmptyMedia", EmptyMedia],
	])("%s merges a custom class onto its root", (_name, component) => {
		const wrapper = mount(component, { props: { class: "my-custom-class" } });
		expect(wrapper.classes()).toContain("my-custom-class");
	});
});

describe("EmptyMedia variants", () => {
	it.each([
		["default", "bg-transparent"],
		["icon", "bg-muted"],
	] as const)("applies the %s variant", (variant, expected) => {
		const wrapper = mount(EmptyMedia, {
			props: { variant },
			slots: { default: "icon" },
		});
		expect(wrapper.classes()).toContain(expected);
	});

	it("defaults to the 'default' variant", () => {
		const wrapper = mount(EmptyMedia, { slots: { default: "icon" } });
		expect(wrapper.classes()).toContain("bg-transparent");
	});
});