import { describe, it, expect } from "vitest";
import { computed } from "vue";
import { mount } from "@vue/test-utils";
import Checkbox from "./Checkbox.vue";
import { FieldKey } from "../../core/field-context";

// Builds a fake Field context shaped like the real one FieldRoot provides.
// Only the fields Checkbox reads need to be present.
const fakeField = (over: Partial<Record<string, unknown>> = {}) => ({
	id: computed(() => over.id ?? "field-id"),
	descriptionId: computed(() => "desc-id"),
	errorId: computed(() => "err-id"),
	describedById: computed(() => over.describedById ?? "desc-id"),
	invalid: computed(() => over.invalid ?? false),
	disabled: computed(() => over.disabled ?? false),
	required: computed(() => over.required ?? false),
});

describe("Checkbox", () => {
	describe("form mode", () => {
		it("renders a checkbox input", () => {
			const wrapper = mount(Checkbox);
			const input = wrapper.find("input[type='checkbox']");
			expect(input.exists()).toBe(true);
		});

		it("reflects modelValue as the checked state", () => {
			const checked = mount(Checkbox, { props: { modelValue: true } });
			const unchecked = mount(Checkbox, { props: { modelValue: false } });
			expect((checked.find("input").element as HTMLInputElement).checked).toBe(true);
			expect((unchecked.find("input").element as HTMLInputElement).checked).toBe(false);
		});

		it("emits update:modelValue with the new checked state on change", async () => {
			const wrapper = mount(Checkbox, { props: { modelValue: false } });
			const input = wrapper.find("input");
			// Simulate the user checking it.
			(input.element as HTMLInputElement).checked = true;
			await input.trigger("change");

			const emits = wrapper.emitted("update:modelValue");
			expect(emits).toBeTruthy();
			expect(emits![0]).toEqual([true]);
		});

		it("emits false when unchecked", async () => {
			const wrapper = mount(Checkbox, { props: { modelValue: true } });
			const input = wrapper.find("input");
			(input.element as HTMLInputElement).checked = false;
			await input.trigger("change");
			expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
		});

		it("sets disabled and aria-* from its own props", () => {
			const wrapper = mount(Checkbox, {
				props: { disabled: true, required: true, invalid: true },
			});
			const input = wrapper.find("input");
			expect(input.attributes("disabled")).toBeDefined();
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
		});
	});

	describe("Field injection", () => {
		it("inherits id, disabled, required, invalid, describedby from Field", () => {
			const wrapper = mount(Checkbox, {
				global: {
					provide: {
						[FieldKey as symbol]: fakeField({
							invalid: true,
							disabled: true,
							required: true,
							describedById: "err-id",
						}),
					},
				},
			});
			const input = wrapper.find("input");
			expect(input.attributes("id")).toBe("field-id");
			expect(input.attributes("disabled")).toBeDefined();
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
			expect(input.attributes("aria-describedby")).toBe("err-id");
		});

		it("works standalone with no Field (no injection)", () => {
			const wrapper = mount(Checkbox);
			const input = wrapper.find("input");
			expect(input.attributes("aria-invalid")).toBeUndefined();
			expect(input.attributes("disabled")).toBeUndefined();
			expect(input.attributes("aria-describedby")).toBeUndefined();
		});

		it("own prop OR's with Field — disabled if either is true", () => {
			const wrapper = mount(Checkbox, {
				props: { disabled: true },
				global: { provide: { [FieldKey as symbol]: fakeField({ disabled: false }) } },
			});
			expect(wrapper.find("input").attributes("disabled")).toBeDefined();
		});
	});

	describe("visual mode", () => {
		it("renders a plain div, not an input, when visual", () => {
			const wrapper = mount(Checkbox, { props: { visual: true, modelValue: true } });
			expect(wrapper.find("input").exists()).toBe(false);
			expect(wrapper.element.tagName).toBe("DIV");
		});

		it("shows the check svg only when modelValue is true", () => {
			const on = mount(Checkbox, { props: { visual: true, modelValue: true } });
			const off = mount(Checkbox, { props: { visual: true, modelValue: false } });
			expect(on.find("svg").exists()).toBe(true);
			expect(off.find("svg").exists()).toBe(false);
		});
	});
});