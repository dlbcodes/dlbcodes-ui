import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Separator from "./Separator.vue";

describe("Separator", () => {
	it("renders a horizontal separator by default", () => {
		const wrapper = mount(Separator);
		const el = wrapper.find("div");
		expect(el.exists()).toBe(true);
		// horizontal orientation classes from the variant
		expect(el.classes()).toContain("h-px");
		expect(el.classes()).toContain("w-full");
	});

	it("renders a vertical separator when orientation is vertical", () => {
		const wrapper = mount(Separator, { props: { orientation: "vertical" } });
		const el = wrapper.find("div");
		expect(el.classes()).toContain("w-px");
		expect(el.classes()).toContain("h-full");
	});

	// --- decorative vs. semantic (the meaningful a11y behavior) ---
	it("is decorative by default: role='none' and no aria-orientation", () => {
		const wrapper = mount(Separator);
		const el = wrapper.find("div");
		expect(el.attributes("role")).toBe("none");
		expect(el.attributes("aria-orientation")).toBeUndefined();
	});

	it("is semantic when decorative is false: role='separator' with aria-orientation", () => {
		const wrapper = mount(Separator, {
			props: { decorative: false, orientation: "horizontal" },
		});
		const el = wrapper.find("div");
		expect(el.attributes("role")).toBe("separator");
		expect(el.attributes("aria-orientation")).toBe("horizontal");
	});

	it("sets aria-orientation to vertical for a semantic vertical separator", () => {
		const wrapper = mount(Separator, {
			props: { decorative: false, orientation: "vertical" },
		});
		const el = wrapper.find("div");
		expect(el.attributes("role")).toBe("separator");
		expect(el.attributes("aria-orientation")).toBe("vertical");
	});

	it("merges a custom class onto the separator", () => {
		const wrapper = mount(Separator, { props: { class: "my-4 bg-border-strong" } });
		const el = wrapper.find("div");
		expect(el.classes()).toContain("my-4");
		// base variant classes still present
		expect(el.classes()).toContain("h-px");
	});

	it("is not focusable or interactive", () => {
		const wrapper = mount(Separator);
		const el = wrapper.find("div");
		// no tabindex, no button/role that implies interaction
		expect(el.attributes("tabindex")).toBeUndefined();
	});
});