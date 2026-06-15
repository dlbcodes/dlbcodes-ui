import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";
import Field from "./field/Field.vue";

describe("Input", () => {
	describe("rendering & model", () => {
		it("renders an input element", () => {
			const wrapper = mount(Input);
			expect(wrapper.find("input").exists()).toBe(true);
		});

		it("works with no v-model (uncontrolled, no throw)", () => {
			const wrapper = mount(Input);
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("");
		});

		it("displays the bound model value", () => {
			const wrapper = mount(Input, { props: { modelValue: "hello" } });
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("hello");
		});

		it("coerces null model to an empty string on the input", () => {
			const wrapper = mount(Input, { props: { modelValue: null } });
			expect((wrapper.find("input").element as HTMLInputElement).value).toBe("");
		});

		it("emits update:modelValue with the typed value", async () => {
			const wrapper = mount(Input, { props: { modelValue: "" } });
			const input = wrapper.find("input");
			(input.element as HTMLInputElement).value = "abc";
			await input.trigger("input");
			expect(wrapper.emitted("update:modelValue")![0]).toEqual(["abc"]);
		});

		it("forwards the type prop", () => {
			const wrapper = mount(Input, { props: { type: "email" } });
			expect(wrapper.find("input").attributes("type")).toBe("email");
		});
	});

	describe("own props", () => {
		it("sets disabled, required, aria-invalid from its own props", () => {
			const wrapper = mount(Input, {
				props: { disabled: true, required: true, invalid: true },
			});
			const input = wrapper.find("input");
			expect((input.element as HTMLInputElement).disabled).toBe(true);
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
		});

		it("puts data-invalid on the input element when invalid", () => {
			const wrapper = mount(Input, { props: { invalid: true } });
			expect(wrapper.find("input").attributes("data-invalid")).toBe("true");
		});
	});

	describe("Field injection (real Field)", () => {
		it("inherits disabled, required, invalid, and an id from a real Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true" :disabled="true" :required="true"><Input /></Field>`,
			});
			const input = wrapper.find("input");
			expect(input.attributes("id")).toBeTruthy();
			expect((input.element as HTMLInputElement).disabled).toBe(true);
			expect(input.attributes("aria-required")).toBe("true");
			expect(input.attributes("aria-invalid")).toBe("true");
		});

		it("works standalone with no Field", () => {
			const wrapper = mount(Input);
			const input = wrapper.find("input");
			expect(input.attributes("aria-invalid")).toBeUndefined();
			expect((input.element as HTMLInputElement).disabled).toBe(false);
			expect(input.attributes("aria-describedby")).toBeUndefined();
		});

		it("props WIN: explicit invalid=false overrides an invalid Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true"><Input :invalid="false" /></Field>`,
			});
			expect(wrapper.find("input").attributes("aria-invalid")).toBeUndefined();
		});

		it("props WIN: explicit disabled=false overrides a disabled Field", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :disabled="true"><Input :disabled="false" /></Field>`,
			});
			expect((wrapper.find("input").element as HTMLInputElement).disabled).toBe(false);
		});
	});

	describe("native attribute forwarding ($attrs → input)", () => {
		it("forwards inputmode to the input element, not the wrapper", () => {
			const wrapper = mount(Input, { attrs: { inputmode: "numeric" } });
			const input = wrapper.find("input");
			expect(input.attributes("inputmode")).toBe("numeric");
			// and NOT on the wrapper div
			expect(wrapper.element.getAttribute("inputmode")).toBeNull();
		});

		it("forwards arbitrary native attrs (name, maxlength, autocomplete) to the input", () => {
			const wrapper = mount(Input, {
				attrs: { name: "email", maxlength: "20", autocomplete: "email" },
			});
			const input = wrapper.find("input");
			expect(input.attributes("name")).toBe("email");
			expect(input.attributes("maxlength")).toBe("20");
			expect(input.attributes("autocomplete")).toBe("email");
		});

		it("forwards enterkeyhint to the input", () => {
			const wrapper = mount(Input, { attrs: { enterkeyhint: "next" } });
			expect(wrapper.find("input").attributes("enterkeyhint")).toBe("next");
		});

		it("explicit prop bindings win over a colliding $attr (disabled)", () => {
			// resolvedDisabled is bound AFTER v-bind="$attrs", so the prop wins.
			const wrapper = mount(Input, {
				props: { disabled: true },
				attrs: { disabled: false },
			});
			expect((wrapper.find("input").element as HTMLInputElement).disabled).toBe(true);
		});

		it("Field's aria-describedby wins over a stray $attr", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `
					<Field :invalid="true">
						<Input aria-describedby="stray-id" />
					</Field>
				`,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			// The Field-resolved describedById (bound after $attrs) should win,
			// so it is NOT the stray value.
			expect(describedBy).not.toBe("stray-id");
		});
	});

	describe("slot-click focuses the input", () => {
		it("focuses the input when the wrapper/slot area is clicked", async () => {
			const wrapper = mount(Input, {
				slots: { default: '<span class="prefix">€</span>' },
				attachTo: document.body, // focus needs a real document
			});
			const input = wrapper.find("input").element as HTMLInputElement;
			expect(document.activeElement).not.toBe(input);

			await wrapper.find(".prefix").trigger("click");
			expect(document.activeElement).toBe(input);

			wrapper.unmount();
		});

		it("does NOT steal focus when an interactive slot element is clicked", async () => {
			const wrapper = mount(Input, {
				slots: { default: '<button class="clear">x</button>' },
				attachTo: document.body,
			});
			const input = wrapper.find("input").element as HTMLInputElement;

			await wrapper.find(".clear").trigger("click");
			// the guard skips focus-forwarding for button/a/input/etc.
			expect(document.activeElement).not.toBe(input);

			wrapper.unmount();
		});
	});

	describe("class merging", () => {
		it("merges a custom class onto the wrapper", () => {
			const wrapper = mount(Input, { props: { class: "w-full" } });
			expect(wrapper.classes()).toContain("w-full");
		});
	});
});