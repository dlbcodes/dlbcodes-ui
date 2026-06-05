import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Skeleton from "./Skeleton.vue";

describe("Skeleton", () => {
	it("renders a div", () => {
		const wrapper = mount(Skeleton);
		expect(wrapper.find("div").exists()).toBe(true);
	});

	it("has the pulse animation and base styling", () => {
		const wrapper = mount(Skeleton);
		const el = wrapper.find("div");
		expect(el.classes()).toContain("animate-pulse");
		expect(el.classes()).toContain("rounded-md");
		expect(el.classes()).toContain("bg-bg-surface");
	});

	it("is hidden from assistive technology", () => {
		const wrapper = mount(Skeleton);
		expect(wrapper.find("div").attributes("aria-hidden")).toBe("true");
	});

	it("merges shaping classes from the consumer", () => {
		const wrapper = mount(Skeleton, { props: { class: "size-12 rounded-full" } });
		const el = wrapper.find("div");
		// consumer classes applied
		expect(el.classes()).toContain("size-12");
		expect(el.classes()).toContain("rounded-full");
		// base animation still present
		expect(el.classes()).toContain("animate-pulse");
	});

	it("lets the consumer override the radius via tailwind-merge", () => {
		// rounded-full should win over the base rounded-md (cn/tailwind-merge)
		const wrapper = mount(Skeleton, { props: { class: "rounded-full" } });
		const el = wrapper.find("div");
		expect(el.classes()).toContain("rounded-full");
		expect(el.classes()).not.toContain("rounded-md");
	});

	it("is not interactive", () => {
		const wrapper = mount(Skeleton);
		expect(wrapper.find("div").attributes("tabindex")).toBeUndefined();
	});
});