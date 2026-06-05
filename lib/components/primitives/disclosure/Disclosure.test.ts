import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import Disclosure from "./Disclosure.vue";
import DisclosureTrigger from "./DisclosureTrigger.vue";
import DisclosureContent from "./DisclosureContent.vue";

// Harness: the parts work together via Headless UI's disclosure context.
const makeDisclosure = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Disclosure, DisclosureTrigger, DisclosureContent },
		setup() {
			return { props };
		},
		template: `
            <Disclosure v-bind="props">
                <DisclosureTrigger>Is team pricing available?</DisclosureTrigger>
                <DisclosureContent>Yes, you can share a license.</DisclosureContent>
            </Disclosure>
        `,
	});

describe("Disclosure", () => {
	it("renders the trigger as a button with its label", () => {
		const wrapper = mount(makeDisclosure());
		const button = wrapper.find("button");
		expect(button.exists()).toBe(true);
		expect(button.text()).toContain("Is team pricing available?");
	});

	it("is collapsed by default — panel content not shown", () => {
		const wrapper = mount(makeDisclosure());
		// Headless UI unmounts the panel when closed (unmount defaults true)
		expect(wrapper.text()).not.toContain("Yes, you can share a license.");
		// and the button reports collapsed
		expect(wrapper.find("button").attributes("aria-expanded")).toBe("false");
	});

	it("expands when the trigger is clicked", async () => {
		const wrapper = mount(makeDisclosure());
		await wrapper.find("button").trigger("click");
		await nextTick();

		expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
		expect(wrapper.text()).toContain("Yes, you can share a license.");
	});

	it("collapses again on a second click (toggle)", async () => {
		const wrapper = mount(makeDisclosure());
		const button = wrapper.find("button");

		await button.trigger("click");
		await nextTick();
		expect(button.attributes("aria-expanded")).toBe("true");

		await button.trigger("click");
		await nextTick();
		expect(button.attributes("aria-expanded")).toBe("false");
		expect(wrapper.text()).not.toContain("Yes, you can share a license.");
	});

	it("starts open when defaultOpen is set", () => {
		const wrapper = mount(makeDisclosure({ defaultOpen: true }));
		expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
		expect(wrapper.text()).toContain("Yes, you can share a license.");
	});

	it("exposes the open state to the trigger slot", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Disclosure, DisclosureTrigger, DisclosureContent },
				template: `
                    <Disclosure>
                        <DisclosureTrigger>
                            <template #default="{ open }">
                                {{ open ? "Hide" : "Show" }}
                            </template>
                        </DisclosureTrigger>
                        <DisclosureContent>Body</DisclosureContent>
                    </Disclosure>
                `,
			}),
		);
		const button = wrapper.find("button");
		// closed → "Show"
		expect(button.text()).toContain("Show");

		await button.trigger("click");
		await nextTick();
		// open → "Hide"
		expect(button.text()).toContain("Hide");
	});

	it("wires aria-controls between the trigger and the panel", async () => {
		const wrapper = mount(makeDisclosure({ defaultOpen: true }));
		const button = wrapper.find("button");
		const controls = button.attributes("aria-controls");
		// when open, the panel exists with the id the button points to
		expect(controls).toBeTruthy();
		expect(wrapper.html()).toContain(controls as string);
	});

	it("rotates the chevron when open", async () => {
		const wrapper = mount(makeDisclosure());
		const chevron = wrapper.find("svg");
		expect(chevron.classes()).not.toContain("rotate-180");
		await wrapper.find("button").trigger("click");
		await nextTick();
		expect(wrapper.find("svg").classes()).toContain("rotate-180");
	});
});