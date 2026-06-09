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
	it("renders slot content", () => {
		const wrapper = mount(Empty, {
			slots: { default: "Nothing here" },
		});
		expect(wrapper.text()).toContain("Nothing here");
	});

	it("applies the dashed container classes to the root", () => {
		const wrapper = mount(Empty);
		const cls = wrapper.classes();
		expect(cls).toContain("border-dashed");
		expect(cls).toContain("rounded-xl");
		// centers its content
		expect(cls).toContain("items-center");
		expect(cls).toContain("justify-center");
	});

	it("merges a custom class onto the root", () => {
		const wrapper = mount(Empty, {
			props: { class: "my-custom-class" },
		});
		expect(wrapper.classes()).toContain("my-custom-class");
	});

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
		expect(text).toContain("[icon]");
		expect(text).toContain("No projects");
		expect(text).toContain("Create your first one.");
		expect(text).toContain("[action]");
	});

	it("EmptyTitle renders its slot", () => {
		const wrapper = mount(EmptyTitle, { slots: { default: "Empty title" } });
		expect(wrapper.text()).toBe("Empty title");
	});

	it("EmptyDescription renders its slot", () => {
		const wrapper = mount(EmptyDescription, {
			slots: { default: "Some description" },
		});
		expect(wrapper.text()).toBe("Some description");
	});
});

describe("EmptyMedia", () => {
	it("defaults to the 'default' variant (transparent, no icon background)", () => {
		const wrapper = mount(EmptyMedia, { slots: { default: "icon" } });
		const cls = wrapper.classes();
		// default variant is bg-transparent, not the icon background
		expect(cls).toContain("bg-transparent");
		expect(cls).not.toContain("bg-bg-subtle");
	});

	it("applies the icon-variant background when variant='icon'", () => {
		const wrapper = mount(EmptyMedia, {
			props: { variant: "icon" },
			slots: { default: "icon" },
		});
		const cls = wrapper.classes();
		// icon variant wraps media in a rounded subtle background
		expect(cls).toContain("bg-bg-elevated");
		expect(cls).toContain("rounded-xl");
	});

	it("renders its slot content", () => {
		const wrapper = mount(EmptyMedia, { slots: { default: "[the icon]" } });
		expect(wrapper.text()).toContain("[the icon]");
	});

	it("merges a custom class", () => {
		const wrapper = mount(EmptyMedia, { props: { class: "size-12" } });
		expect(wrapper.classes()).toContain("size-12");
	});
});