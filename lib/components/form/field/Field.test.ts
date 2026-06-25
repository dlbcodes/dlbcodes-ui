import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Field, FieldLabel, FieldDescription, FieldError } from "./index";
import Input from "../Input.vue";

describe("Field family", () => {
	describe("FieldLabel", () => {
		it("its `for` matches the id the Field gives the control", () => {
			const wrapper = mount({
				components: { Field, FieldLabel, Input },
				template: `
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input />
                    </Field>
                `,
			});
			const labelFor = wrapper.find("label").attributes("for");
			const inputId = wrapper.find("input").attributes("id");
			expect(labelFor).toBeTruthy();
			expect(labelFor).toBe(inputId); // clicking the label focuses the input
		});

		it("an explicit `for` overrides the Field id", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field><FieldLabel for="custom">X</FieldLabel></Field>`,
			});
			expect(wrapper.find("label").attributes("for")).toBe("custom");
		});

		it("applies the required-asterisk class when the Field is required", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field :required="true"><FieldLabel>X</FieldLabel></Field>`,
			});
			// jsdom can't see ::after content, so assert the class that drives it.
			const cls = wrapper.find("label").classes().join(" ");
			expect(cls).toContain("after:content-['*']");
		});

		it("does NOT apply the asterisk class when not required", () => {
			const wrapper = mount({
				components: { Field, FieldLabel },
				template: `<Field><FieldLabel>X</FieldLabel></Field>`,
			});
			const cls = wrapper.find("label").classes().join(" ");
			expect(cls).not.toContain("after:content-['*']");
		});
	});

	describe("FieldDescription", () => {
		it("renders with the Field's description id", () => {
			const wrapper = mount({
				components: { Field, FieldDescription },
				template: `<Field><FieldDescription>Helper</FieldDescription></Field>`,
			});
			const p = wrapper.find("p");
			expect(p.text()).toBe("Helper");
			expect(p.attributes("id")).toMatch(/-description$/);
		});

		it("closes the aria loop: the control's aria-describedby includes the description's id", () => {
			const wrapper = mount({
				components: { Field, FieldDescription, Input },
				template: `
                    <Field>
                        <Input />
                        <FieldDescription>Helper text</FieldDescription>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const descId = wrapper.find("p").attributes("id");
			expect(describedBy).toContain(descId);
		});
	});

	describe("FieldError", () => {
		it("renders with role='alert' and the Field's error id", () => {
			const wrapper = mount({
				components: { Field, FieldError },
				template: `<Field :invalid="true"><FieldError>Bad</FieldError></Field>`,
			});
			const p = wrapper.find("p");
			expect(p.attributes("role")).toBe("alert");
			expect(p.attributes("id")).toMatch(/-error$/);
		});

		it("when invalid, the control's aria-describedby includes the error id", () => {
			const wrapper = mount({
				components: { Field, FieldError, Input },
				template: `
                    <Field :invalid="true">
                        <Input />
                        <FieldError>Required</FieldError>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const errId = wrapper.find("p").attributes("id");
			expect(describedBy).toContain(errId);
		});
	});

	// ── Added: state cascade + the describedById ordering decision ──────────

	describe("invalid state cascade", () => {
		it("cascades invalid to aria-invalid on the control", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true"><Input /></Field>`,
			});
			expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
		});

		it("does not set aria-invalid when valid", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field><Input /></Field>`,
			});
			// Input forwards `field.invalid || undefined`, so the attr is absent when valid.
			expect(wrapper.find("input").attributes("aria-invalid")).toBeUndefined();
		});

		it("marks the group with data-invalid when invalid", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :invalid="true"><Input /></Field>`,
			});
			expect(
				wrapper.find("[role='group']").attributes("data-invalid"),
			).toBe("true");
		});

		it("omits data-invalid when valid", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field><Input /></Field>`,
			});
			expect(
				wrapper.find("[role='group']").attributes("data-invalid"),
			).toBeUndefined();
		});
	});

	describe("describedById ordering (shadcn parity)", () => {
		it("describes the control by ONLY the description when valid", () => {
			const wrapper = mount({
				components: { Field, FieldDescription, FieldError, Input },
				template: `
                    <Field>
                        <Input />
                        <FieldDescription>Hint</FieldDescription>
                        <FieldError>Required</FieldError>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const descId = wrapper.find("[id$='-description']").attributes("id");
			expect(describedBy).toBe(descId);
		});

		it("describes by BOTH description and error when invalid, description first", () => {
			const wrapper = mount({
				components: { Field, FieldDescription, FieldError, Input },
				template: `
                    <Field :invalid="true">
                        <Input />
                        <FieldDescription>Hint</FieldDescription>
                        <FieldError>Required</FieldError>
                    </Field>
                `,
			});
			const describedBy = wrapper.find("input").attributes("aria-describedby");
			const descId = wrapper.find("[id$='-description']").attributes("id");
			const errId = wrapper.find("[role='alert']").attributes("id");
			// matches Field's describedById: `${descriptionId} ${errorId}` when invalid
			expect(describedBy).toBe(`${descId} ${errId}`);
		});
	});

	describe("disabled state cascade", () => {
		it("cascades disabled to the control", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :disabled="true"><Input /></Field>`,
			});
			// Input inherits the field's disabled state.
			expect(wrapper.find("input").attributes("disabled")).toBeDefined();
		});

		it("marks the group with data-disabled when disabled", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field :disabled="true"><Input /></Field>`,
			});
			expect(
				wrapper.find("[role='group']").attributes("data-disabled"),
			).toBe("true");
		});
	});

	describe("identity", () => {
		it("renders the root as a group", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `<Field><Input /></Field>`,
			});
			expect(wrapper.find("div").attributes("role")).toBe("group");
		});

		it("gives separate Field instances unique ids", () => {
			const wrapper = mount({
				components: { Field, Input },
				template: `
                    <div>
                        <Field><Input /></Field>
                        <Field><Input /></Field>
                    </div>
                `,
			});
			const [a, b] = wrapper.findAll("input").map((i) => i.attributes("id"));
			expect(a).toBeTruthy();
			expect(b).toBeTruthy();
			expect(a).not.toBe(b);
		});
	});
});