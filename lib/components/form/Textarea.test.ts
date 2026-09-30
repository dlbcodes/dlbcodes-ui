import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, computed, provide } from "vue";
import Textarea from "./Textarea.vue";
import { FieldKey } from "../../core/field-context.ts";

const textarea = (props: Record<string, unknown> = {}, slots = {}) => {
	const wrapper = mount(Textarea, { props, slots });
	return { wrapper, el: wrapper.find("textarea") };
};

describe("Textarea", () => {
	// --- value ---
	it.each([
		["hello", "hello"],
		[null, ""],
		[undefined, ""],
	])("model %j is shown as %j", (modelValue, shown) => {
		expect(textarea({ modelValue }).el.element.value).toBe(shown);
	});

	it("emits update:modelValue on input", async () => {
		const { wrapper, el } = textarea();
		el.element.value = "typed";
		await el.trigger("input");
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["typed"]);
	});

	// --- rows ---
	it("applies rows and derives a min-height from the line height", () => {
		const { el } = textarea({ rows: 6 });
		expect(el.attributes("rows")).toBe("6");
		// rows × the element's own line height (`lh`) + its 1rem of padding
		expect(el.attributes("style")).toContain("6lh");
	});

	// --- standalone state ---
	it("disables the textarea when disabled", () => {
		expect(textarea({ disabled: true }).el.element.disabled).toBe(true);
	});

	it.each([
		["invalid", "aria-invalid"],
		["required", "aria-required"],
	])("sets %s as %s", (prop, attr) => {
		expect(textarea({ [prop]: true }).el.attributes(attr)).toBe("true");
	});

	it("uses the id prop, and generates one when nothing provides it", () => {
		expect(textarea({ id: "bio" }).el.attributes("id")).toBe("bio");
		expect(textarea().el.attributes("id")).toBeTruthy();
	});

	// The leading slot (icon etc.): an empty wrapper would add a flex gap.
	it("renders the leading slot wrapper only when a slot is provided", () => {
		expect(textarea().wrapper.find("span").exists()).toBe(false);
		const withSlot = textarea({}, { default: "icon" });
		expect(withSlot.wrapper.find("span").text()).toBe("icon");
	});

	// --- Field context ---
	const withField = (fieldValues: Record<string, unknown>, ownProps = {}) =>
		defineComponent({
			setup() {
				provide(FieldKey, {
					id: computed(() => "field-id"),
					descriptionId: computed(() => "field-desc"),
					errorId: computed(() => "field-err"),
					describedById: computed(() => "field-desc"),
					invalid: computed(() => false),
					disabled: computed(() => false),
					required: computed(() => false),
					...fieldValues,
				});
				return () => h(Textarea, ownProps);
			},
		});

	describe("inside a Field", () => {
		it.each([
			["id", {}, "id", "field-id"],
			["invalid", { invalid: computed(() => true) }, "aria-invalid", "true"],
			["required", { required: computed(() => true) }, "aria-required", "true"],
			["describedById", {}, "aria-describedby", "field-desc"],
		])("inherits %s", (_name, fieldValues, attr, expected) => {
			const el = mount(withField(fieldValues)).find("textarea");
			expect(el.attributes(attr)).toBe(expected);
		});

		it("inherits disabled", () => {
			const wrapper = mount(withField({ disabled: computed(() => true) }));
			expect(wrapper.find("textarea").element.disabled).toBe(true);
		});

		// props win over the Field, including an explicit `false`
		it("lets an explicit prop override the Field", () => {
			const wrapper = mount(
				withField({ disabled: computed(() => true) }, { disabled: false, id: "own-id" }),
			);
			const el = wrapper.find("textarea");
			expect(el.element.disabled).toBe(false);
			expect(el.attributes("id")).toBe("own-id");
		});
	});
});