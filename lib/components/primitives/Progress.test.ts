import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Progress from "./Progress.vue";

// The fill is the track's only child.
const fill = (wrapper: ReturnType<typeof mount>) => wrapper.findAll("div")[1];

describe("Progress", () => {
	it("exposes the progressbar role and aria range", () => {
		const wrapper = mount(Progress, { props: { value: 50 } });
		const track = wrapper.find('[role="progressbar"]');
		expect(track.attributes("aria-valuemin")).toBe("0");
		expect(track.attributes("aria-valuemax")).toBe("100");
		expect(track.attributes("aria-valuenow")).toBe("50");
	});

	it("reflects a custom max in the aria attributes", () => {
		const wrapper = mount(Progress, { props: { value: 3, max: 5 } });
		const track = wrapper.find('[role="progressbar"]');
		expect(track.attributes("aria-valuemax")).toBe("5");
		expect(track.attributes("aria-valuenow")).toBe("3");
	});

	// value, max, expected translateX (100% - percent), including clamping
	it.each([
		[0, 100, "-100%"],
		[25, 100, "-75%"],
		[100, 100, "-0%"],
		[3, 5, "-40%"],
		[150, 100, "-0%"], // above max clamps to full
		[-20, 100, "-100%"], // negative clamps to empty
	])("value %s of %s translates the fill by %s", (value, max, expected) => {
		const wrapper = mount(Progress, { props: { value, max } });
		expect(fill(wrapper).attributes("style")).toContain(
			`translateX(${expected})`,
		);
	});

	it("is indeterminate when value is omitted", () => {
		const wrapper = mount(Progress);
		expect(
			wrapper.find('[role="progressbar"]').attributes("aria-valuenow"),
		).toBeUndefined();
		// no width-based fill: the bar animates instead
		expect(fill(wrapper).attributes("style")).toBeUndefined();
		expect(fill(wrapper).classes()).toContain("animate-progress-indeterminate");
	});

	it("updates the fill when the value changes", async () => {
		const wrapper = mount(Progress, { props: { value: 20 } });
		expect(fill(wrapper).attributes("style")).toContain("translateX(-80%)");

		await wrapper.setProps({ value: 70 });
		expect(fill(wrapper).attributes("style")).toContain("translateX(-30%)");
	});

	it("merges a custom class with the base classes", () => {
		const wrapper = mount(Progress, { props: { value: 50, class: "h-2" } });
		const classes = wrapper.find('[role="progressbar"]').classes();
		expect(classes).toContain("h-2");
		expect(classes).toContain("w-full");
	});
});