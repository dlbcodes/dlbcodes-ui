import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import Select from "./Select.vue";
import SelectTrigger from "./SelectTrigger.vue";
import SelectContent from "./SelectContent.vue";
import SelectItem from "./SelectItem.vue";
import SelectSearch from "./SelectSearch.vue";
import Field from "../field/Field.vue";
import FieldLabel from "../field/FieldLabel.vue";

// Harness: a real composed Select, since the parts only work together via the
// provided context. Items carry a `label` prop (the trigger's display source);
// the slot mirrors it for the in-list rendering.
const makeSelect = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Select, SelectTrigger, SelectContent, SelectItem, SelectSearch },
		setup() {
			const model = ref((props.modelValue as string) ?? "");
			return { model, props };
		},
		template: `
            <Select v-model="model" v-bind="props">
                <SelectTrigger placeholder="Pick one" />
                <SelectContent>
                    <SelectSearch v-if="props.searchable" />
                    <SelectItem value="vue" label="Vue">Vue</SelectItem>
                    <SelectItem value="react" label="React">React</SelectItem>
                    <SelectItem value="svelte" label="Svelte">Svelte</SelectItem>
                </SelectContent>
            </Select>
        `,
	});

// Helper: open the listbox and return the option elements.
const open = async (wrapper: ReturnType<typeof mount>) => {
	await wrapper.find("button").trigger("click");
	await nextTick();
	return wrapper.findAll('[role="option"]');
};

describe("Select", () => {
	it("shows the placeholder when nothing is selected", () => {
		const wrapper = mount(makeSelect());
		expect(wrapper.find("button").text()).toContain("Pick one");
	});

	it("renders all items when open", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const text = options.map((o) => o.text()).join(" ");
		expect(text).toContain("Vue");
		expect(text).toContain("React");
		expect(text).toContain("Svelte");
	});

	it("emits update:modelValue with the value when an item is clicked", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toBe("vue");
	});

	// --- label display on selection ---
	it("shows the selected item's label in the trigger", async () => {
		const wrapper = mount(makeSelect());
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		// trigger shows the label "Vue", not the value "vue"
		expect(wrapper.find("button").text()).toContain("Vue");
		expect(wrapper.find("button").text()).not.toContain("Pick one");
	});

	// --- pre-filled value resolves its label from the item's `label` prop ---
	it("resolves a pre-filled value's label without opening (label prop)", async () => {
		// modelValue is set up-front; the trigger should show the LABEL ("React"),
		// resolved from the matching item's `label` prop, before any interaction.
		const wrapper = mount(makeSelect({ modelValue: "react" }));
		await nextTick();
		expect(wrapper.find("button").text()).toContain("React");
		expect(wrapper.find("button").text()).not.toContain("Pick one");
	});

	// --- search (matches against the item's label) ---
	it("renders the search input only when searchable", async () => {
		const plain = mount(makeSelect());
		await open(plain);
		expect(plain.find('input[type="text"]').exists()).toBe(false);

		const searchable = mount(makeSelect({ searchable: true }));
		await open(searchable);
		expect(searchable.find('input[type="text"]').exists()).toBe(true);
	});

	it("filters items by the search query", async () => {
		const wrapper = mount(makeSelect({ searchable: true }));
		await open(wrapper);
		await wrapper.find('input[type="text"]').setValue("re");
		await nextTick();

		const options = wrapper.findAll('[role="option"]');
		const react = options.find((o) => o.text().includes("React"));
		const vue = options.find((o) => o.text().includes("Vue"));
		// matching item visible, non-matching hidden via v-show (display: none)
		expect(react?.attributes("style") ?? "").not.toContain("display: none");
		expect(vue?.attributes("style") ?? "").toContain("display: none");
	});

	// --- disabled item ---
	it("marks a disabled item as disabled and doesn't select it on click", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Select, SelectTrigger, SelectContent, SelectItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
                    <Select v-model="model">
                        <SelectTrigger placeholder="Plan" />
                        <SelectContent>
                            <SelectItem value="free" label="Free">Free</SelectItem>
                            <SelectItem value="ent" label="Enterprise" disabled>Enterprise</SelectItem>
                        </SelectContent>
                    </Select>
                `,
			}),
		);
		const options = await open(wrapper);
		const ent = options.find((o) => o.text().includes("Enterprise"));
		expect(ent?.attributes("aria-disabled")).toBe("true");

		await ent!.trigger("click");
		await nextTick();
		// disabled item shouldn't change the model
		expect((wrapper.vm as any).model).toBe("");
	});

	// --- slot-only fallback (no label prop) still works after render ---
	it("falls back to slot text as the label when no label prop is given", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Select, SelectTrigger, SelectContent, SelectItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
                    <Select v-model="model">
                        <SelectTrigger placeholder="Pick one" />
                        <SelectContent>
                            <SelectItem value="vue">Vue</SelectItem>
                        </SelectContent>
                    </Select>
                `,
			}),
		);
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		// after a click, the captured slot text is shown as the label
		expect(wrapper.find("button").text()).toContain("Vue");
	});

	// --- selected item shows the check ---
	it("marks the selected item as selected", async () => {
		const wrapper = mount(makeSelect());
		let options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();

		// reopen and check the Vue option is now selected (aria-selected)
		options = await open(wrapper);
		const vueAgain = options.find((o) => o.text().includes("Vue"));
		expect(vueAgain?.attributes("aria-selected")).toBe("true");
	});

	// --- context guard ---
	it("throws if a part is used outside Select", () => {
		expect(() => mount(SelectTrigger)).toThrow();
	});
});

describe("Select + Field integration", () => {
	const makeFieldSelect = () =>
		defineComponent({
			components: { Field, FieldLabel, Select, SelectTrigger, SelectContent, SelectItem },
			setup() {
				const model = ref("");
				return { model };
			},
			template: `
                <Field>
                    <FieldLabel>Framework</FieldLabel>
                    <Select v-model="model">
                        <SelectTrigger placeholder="Pick one" />
                        <SelectContent>
                            <SelectItem value="vue" label="Vue">Vue</SelectItem>
                            <SelectItem value="react" label="React">React</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            `,
		});

	it("adopts the Field's id on the trigger so the label targets it", () => {
		const wrapper = mount(makeFieldSelect());
		const label = wrapper.find("label");
		const button = wrapper.find("button");

		const forId = label.attributes("for");
		expect(forId).toBeTruthy();
		expect(button.attributes("id")).toBe(forId);
	});

	it("wires aria-describedby and aria-invalid from the Field when invalid", () => {
		const wrapper = mount(
			defineComponent({
				components: { Field, FieldLabel, Select, SelectTrigger, SelectContent, SelectItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
                    <Field invalid>
                        <FieldLabel>Framework</FieldLabel>
                        <Select v-model="model">
                            <SelectTrigger placeholder="Pick one" />
                            <SelectContent>
                                <SelectItem value="vue" label="Vue">Vue</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                `,
			}),
		);
		const button = wrapper.find("button");
		expect(button.attributes("aria-invalid")).toBe("true");
		expect(button.attributes("aria-describedby")).toBeTruthy();
	});

	it("works standalone without a Field (no crash, trigger renders)", () => {
		const wrapper = mount(makeSelect());
		const button = wrapper.find("button");
		expect(button.exists()).toBe(true);
		expect(button.text()).toContain("Pick one");
	});
});