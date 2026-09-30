import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Badge from "./Badge.vue";

const badge = (props: Record<string, unknown> = {}) =>
	mount(Badge, { props, slots: { default: "New" } });

describe("Badge", () => {
	it("renders its slot in a span", () => {
		const wrapper = badge();
		expect(wrapper.element.tagName).toBe("SPAN");
		expect(wrapper.text()).toBe("New");
	});

	// One distinguishing class per variant: proves each variant is wired up
	// (and that none of them is missing) without pinning every token.
	it.each([
		["neutral", "bg-secondary"],
		["success", "bg-success-subtle"],
		["warning", "bg-warning-subtle"],
		["info", "bg-info-subtle"],
		["destructive", "bg-destructive-subtle"],
		["primary", "bg-brand"],
		["outline", "bg-transparent"],
	])("applies the %s variant", (variant, expected) => {
		expect(badge({ variant }).classes()).toContain(expected);
	});

	it("defaults to the neutral variant", () => {
		expect(badge().classes()).toEqual(badge({ variant: "neutral" }).classes());
	});

	// `uppercase` is already a base class, so it can't prove a merge; use a
	// class the component never sets.
	it("merges a custom class with the base classes", () => {
		const classes = badge({ class: "mt-4" }).classes();
		expect(classes).toContain("mt-4");
		expect(classes).toContain("inline-flex");
	});
});