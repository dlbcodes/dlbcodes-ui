import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import Combobox from "./Combobox.vue";
import ComboboxInput from "./ComboboxInput.vue";
import ComboboxContent from "./ComboboxContent.vue";
import ComboboxItem from "./ComboboxItem.vue";
import ComboboxEmpty from "./ComboboxEmpty.vue";
import Field from "../field/Field.vue";
import FieldLabel from "../field/FieldLabel.vue";

// Harness: a real composed Combobox (the parts only work together via context).
// Items carry a `label` prop (the display + filter source).
const makeCombobox = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Combobox, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxEmpty },
		setup() {
			const model = ref((props.modelValue as string) ?? "");
			return { model, props };
		},
		template: `
			<Combobox v-model="model" v-bind="props">
				<ComboboxInput placeholder="Search" />
				<ComboboxContent>
					<ComboboxItem value="vue" label="Vue">Vue</ComboboxItem>
					<ComboboxItem value="react" label="React">React</ComboboxItem>
					<ComboboxItem value="svelte" label="Svelte">Svelte</ComboboxItem>
					<ComboboxEmpty>No results</ComboboxEmpty>
				</ComboboxContent>
			</Combobox>
		`,
	});

// Open the combobox (focus/click the input) and return option elements.
const open = async (wrapper: ReturnType<typeof mount>) => {
	await wrapper.find("button").trigger("click"); // the ComboboxButton caret
	await nextTick();
	return wrapper.findAll('[role="option"]');
};

// Type a query into the combobox input.
const type = async (wrapper: ReturnType<typeof mount>, value: string) => {
	const input = wrapper.find("input");
	(input.element as HTMLInputElement).value = value;
	await input.trigger("input");
	await nextTick();
};

describe("Combobox", () => {
	it("renders an input with the placeholder", () => {
		const wrapper = mount(makeCombobox());
		expect(wrapper.find("input").attributes("placeholder")).toBe("Search");
	});

	it("renders all items when opened", async () => {
		const wrapper = mount(makeCombobox());
		const options = await open(wrapper);
		const text = options.map((o) => o.text()).join(" ");
		expect(text).toContain("Vue");
		expect(text).toContain("React");
		expect(text).toContain("Svelte");
	});

	// --- filtering (the core combobox behavior) ---
	it("filters items by the typed query", async () => {
		const wrapper = mount(makeCombobox());
		await open(wrapper);
		await type(wrapper, "re");

		const options = wrapper.findAll('[role="option"]');
		const react = options.find((o) => o.text().includes("React"));
		const vue = options.find((o) => o.text().includes("Vue"));
		// matching item visible, non-matching hidden via v-show (display: none)
		expect(react?.attributes("style") ?? "").not.toContain("display: none");
		expect(vue?.attributes("style") ?? "").toContain("display: none");
	});

	// --- selection shows the label ---
	it("shows the selected item's label after picking", async () => {
		const wrapper = mount(makeCombobox());
		const options = await open(wrapper);
		const vue = options.find((o) => o.text().includes("Vue"));
		await vue!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toBe("vue");
	});

	// --- pre-filled value resolves its label (vnode walk) ---
	it("resolves a pre-filled value's label from the item's label prop", async () => {
		const wrapper = mount(makeCombobox({ modelValue: "react" }));
		await nextTick();
		// the input's display value should be the LABEL "React", not "react"
		expect((wrapper.find("input").element as HTMLInputElement).value).toBe("React");
	});

	// --- empty state ---
	it("shows the empty message when no item matches the query", async () => {
		const wrapper = mount(makeCombobox());
		await open(wrapper);
		await type(wrapper, "zzzznomatch");

		// no options visible
		const options = wrapper.findAll('[role="option"]');
		const anyVisible = options.some(
			(o) => !(o.attributes("style") ?? "").includes("display: none"),
		);
		expect(anyVisible).toBe(false);
		// the empty message is shown
		expect(wrapper.text()).toContain("No results");
	});

	it("hides the empty message when there is no query", async () => {
		const wrapper = mount(makeCombobox());
		await open(wrapper);
		// no query typed → empty message should NOT show (all items match)
		expect(wrapper.text()).not.toContain("No results");
	});

	it("hides the empty message once a matching query is typed", async () => {
		const wrapper = mount(makeCombobox());
		await open(wrapper);
		await type(wrapper, "zzz"); // no match → empty shows
		expect(wrapper.text()).toContain("No results");
		await type(wrapper, "vu"); // matches Vue → empty hides
		expect(wrapper.text()).not.toContain("No results");
	});

	// --- disabled item ---
	it("marks a disabled item as disabled and doesn't select it", async () => {
		const wrapper = mount(
			defineComponent({
				components: { Combobox, ComboboxInput, ComboboxContent, ComboboxItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
					<Combobox v-model="model">
						<ComboboxInput placeholder="Plan" />
						<ComboboxContent>
							<ComboboxItem value="free" label="Free">Free</ComboboxItem>
							<ComboboxItem value="ent" label="Enterprise" disabled>Enterprise</ComboboxItem>
						</ComboboxContent>
					</Combobox>
				`,
			}),
		);
		const options = await open(wrapper);
		const ent = options.find((o) => o.text().includes("Enterprise"));
		expect(ent?.attributes("aria-disabled")).toBe("true");
		await ent!.trigger("click");
		await nextTick();
		expect((wrapper.vm as any).model).toBe("");
	});

	// --- context guard ---
	it("throws if a part is used outside Combobox", () => {
		expect(() => mount(ComboboxInput)).toThrow();
	});
});

describe("Combobox + Field integration", () => {
	const makeFieldCombobox = () =>
		defineComponent({
			components: { Field, FieldLabel, Combobox, ComboboxInput, ComboboxContent, ComboboxItem },
			setup() {
				const model = ref("");
				return { model };
			},
			template: `
				<Field>
					<FieldLabel>Framework</FieldLabel>
					<Combobox v-model="model">
						<ComboboxInput placeholder="Pick one" />
						<ComboboxContent>
							<ComboboxItem value="vue" label="Vue">Vue</ComboboxItem>
						</ComboboxContent>
					</Combobox>
				</Field>
			`,
		});

	it("adopts the Field's id on the input so the label targets it", () => {
		const wrapper = mount(makeFieldCombobox());
		const forId = wrapper.find("label").attributes("for");
		expect(forId).toBeTruthy();
		expect(wrapper.find("input").attributes("id")).toBe(forId);
	});

	it("wires aria-invalid from the Field when invalid", () => {
		const wrapper = mount(
			defineComponent({
				components: { Field, FieldLabel, Combobox, ComboboxInput, ComboboxContent, ComboboxItem },
				setup() {
					const model = ref("");
					return { model };
				},
				template: `
					<Field invalid>
						<FieldLabel>Framework</FieldLabel>
						<Combobox v-model="model">
							<ComboboxInput placeholder="Pick one" />
							<ComboboxContent>
								<ComboboxItem value="vue" label="Vue">Vue</ComboboxItem>
							</ComboboxContent>
						</Combobox>
					</Field>
				`,
			}),
		);
		expect(wrapper.find("input").attributes("aria-invalid")).toBe("true");
	});
});