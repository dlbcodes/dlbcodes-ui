import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, computed, provide } from "vue";
import Textarea from "./Textarea.vue";
import { FieldKey } from "../../core/field-context.ts";

describe("Textarea", () => {
	it("renders a textarea element", () => {
		const wrapper = mount(Textarea);
		expect(wrapper.find("textarea").exists()).toBe(true);
	});

	it("reflects the model value", () => {
		const wrapper = mount(Textarea, {
			props: { modelValue: "hello" },
		});
		expect(wrapper.find("textarea").element.value).toBe("hello");
	});

	it("emits update:modelValue on input", async () => {
		const wrapper = mount(Textarea);
		const textarea = wrapper.find("textarea");
		textarea.element.value = "typed";
		await textarea.trigger("input");
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["typed"]);
	});

	it("coerces null model to empty string", () => {
		const wrapper = mount(Textarea, {
			props: { modelValue: null },
		});
		expect(wrapper.find("textarea").element.value).toBe("");
	});

	it("applies the rows attribute", () => {
		const wrapper = mount(Textarea, {
			props: { rows: 6 },
		});
		expect(wrapper.find("textarea").attributes("rows")).toBe("6");
	});

	it("sets a min-height style from rows", () => {
		const wrapper = mount(Textarea, {
			props: { rows: 4 },
		});
		// rows * 1.5 + 1 = 7rem
		expect(wrapper.find("textarea").attributes("style")).toContain("min-height: 7rem");
	});

	// --- standalone state props ---
	it("disables the textarea when disabled", () => {
		const wrapper = mount(Textarea, {
			props: { disabled: true },
		});
		expect(wrapper.find("textarea").element.disabled).toBe(true);
	});

	it("sets aria-invalid when invalid", () => {
		const wrapper = mount(Textarea, {
			props: { invalid: true },
		});
		expect(wrapper.find("textarea").attributes("aria-invalid")).toBe("true");
	});

	it("sets aria-required when required", () => {
		const wrapper = mount(Textarea, {
			props: { required: true },
		});
		expect(wrapper.find("textarea").attributes("aria-required")).toBe("true");
	});

	it("uses the id prop", () => {
		const wrapper = mount(Textarea, {
			props: { id: "bio" },
		});
		expect(wrapper.find("textarea").attributes("id")).toBe("bio");
	});

	// --- Field context injection ---
	const withField = (fieldValues: Record<string, unknown>, textareaProps = {}) =>
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
				return () => h(Textarea, textareaProps);
			},
		});

	it("inherits id from Field", () => {
		const wrapper = mount(withField({}));
		expect(wrapper.find("textarea").attributes("id")).toBe("field-id");
	});

	it("inherits disabled from Field", () => {
		const wrapper = mount(withField({ disabled: computed(() => true) }));
		expect(wrapper.find("textarea").element.disabled).toBe(true);
	});

	it("inherits invalid from Field", () => {
		const wrapper = mount(withField({ invalid: computed(() => true) }));
		expect(wrapper.find("textarea").attributes("aria-invalid")).toBe("true");
	});

	it("inherits describedById from Field", () => {
		const wrapper = mount(withField({ describedById: computed(() => "field-desc") }));
		expect(wrapper.find("textarea").attributes("aria-describedby")).toBe("field-desc");
	});

	// --- props-win precedence (the bug we fixed) ---
	it("prop id wins over Field id", () => {
		const wrapper = mount(withField({}, { id: "own-id" }));
		expect(wrapper.find("textarea").attributes("id")).toBe("own-id");
	});

	it("prop disabled wins over Field (explicit false beats field true)", () => {
		const wrapper = mount(withField({ disabled: computed(() => true) }, { disabled: false }));
		// props-win: explicit disabled=false should override field's disabled=true
		expect(wrapper.find("textarea").element.disabled).toBe(false);
	});
});