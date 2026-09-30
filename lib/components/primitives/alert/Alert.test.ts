import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import Alert from "./Alert.vue";
import AlertTitle from "./AlertTitle.vue";
import AlertDescription from "./AlertDescription.vue";

const title = () => h(AlertTitle, () => "Title");

describe("Alert", () => {
	it("renders role='alert' with title and description", () => {
		const wrapper = mount(Alert, {
			slots: {
				default: [
					h(AlertTitle, () => "Saved"),
					h(AlertDescription, () => "Your changes were saved."),
				],
			},
		});
		expect(wrapper.find('[role="alert"]').exists()).toBe(true);
		expect(wrapper.text()).toContain("Saved");
		expect(wrapper.text()).toContain("Your changes were saved.");
	});

	// One distinguishing class per variant is enough: it proves the variant is
	// wired up without pinning every token.
	it.each([
		["neutral", "bg-muted"],
		["info", "bg-info-subtle"],
		["success", "bg-success-subtle"],
		["warning", "bg-warning-subtle"],
		["destructive", "bg-destructive-subtle"],
	] as const)("applies the %s variant", (variant, surface) => {
		const wrapper = mount(Alert, { props: { variant } });
		expect(wrapper.find('[role="alert"]').classes()).toContain(surface);
	});

	it("defaults to the neutral variant", () => {
		const wrapper = mount(Alert);
		expect(wrapper.find('[role="alert"]').classes()).toContain("bg-muted");
	});

	it.each(["icon", "action"])("renders the %s slot only when provided", (name) => {
		const marker = '[data-test="slot"]';
		const slots = { default: title };

		expect(mount(Alert, { slots }).find(marker).exists()).toBe(false);
		expect(
			mount(Alert, {
				slots: { ...slots, [name]: () => h("span", { "data-test": "slot" }) },
			})
				.find(marker)
				.exists(),
		).toBe(true);
	});

	it("merges a custom class with the base classes", () => {
		const wrapper = mount(Alert, { props: { class: "mt-8" } });
		const classes = wrapper.find('[role="alert"]').classes();
		expect(classes).toContain("mt-8");
		expect(classes).toContain("flex");
	});
});

describe("AlertTitle", () => {
	it("renders its slot and merges a custom class", () => {
		const wrapper = mount(AlertTitle, {
			props: { class: "text-lg" },
			slots: { default: () => "My title" },
		});
		expect(wrapper.text()).toBe("My title");
		expect(wrapper.find("div").classes()).toContain("text-lg");
	});
});