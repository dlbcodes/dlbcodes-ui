import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Skeleton from "./Skeleton.vue";

describe("Skeleton", () => {
	it("pulses and is hidden from assistive technology", () => {
		const el = mount(Skeleton).find("div");
		expect(el.classes()).toContain("animate-pulse");
		expect(el.attributes("aria-hidden")).toBe("true");
	});

	it("merges consumer classes with the base classes", () => {
		const el = mount(Skeleton, { props: { class: "size-12" } }).find("div");
		expect(el.classes()).toContain("size-12");
		expect(el.classes()).toContain("animate-pulse");
	});

	// Guards the tailwind-merge setup: a consumer radius must replace the
	// default one instead of sitting next to it.
	it("lets the consumer override the radius", () => {
		const el = mount(Skeleton, { props: { class: "rounded-full" } }).find("div");
		expect(el.classes()).toContain("rounded-full");
		expect(el.classes()).not.toContain("rounded-md");
	});
});