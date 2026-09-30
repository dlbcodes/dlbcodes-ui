import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, ref, nextTick } from "vue";
import Tabs from "./Tabs.vue";
import TabsList from "./TabsList.vue";
import TabsTrigger from "./TabsTrigger.vue";
import TabsPanels from "./TabsPanels.vue";
import TabsContent from "./TabsContent.vue";

// Harness: the parts only work together (Headless UI pairs triggers/panels by
// position), so we mount a real composed Tabs.
const makeTabs = (props: Record<string, unknown> = {}) =>
	defineComponent({
		components: { Tabs, TabsList, TabsTrigger, TabsPanels, TabsContent },
		setup() {
			return { props };
		},
		template: `
			<Tabs v-bind="props">
				<TabsList>
					<TabsTrigger>Account</TabsTrigger>
					<TabsTrigger>Password</TabsTrigger>
					<TabsTrigger :disabled="true">Billing</TabsTrigger>
				</TabsList>
				<TabsPanels>
					<TabsContent>Account panel</TabsContent>
					<TabsContent>Password panel</TabsContent>
					<TabsContent>Billing panel</TabsContent>
				</TabsPanels>
			</Tabs>
		`,
	});

type Wrapper = ReturnType<typeof mount>;

const tabsOf = (wrapper: Wrapper) => wrapper.findAll('[role="tab"]');
// Which tabs are selected, e.g. [true, false, false]
const selected = (wrapper: Wrapper) =>
	tabsOf(wrapper).map((t) => t.attributes("aria-selected") === "true");

describe("Tabs", () => {
	it("renders every trigger as a tab button", () => {
		const tabs = tabsOf(mount(makeTabs()));
		expect(tabs.map((t) => t.text())).toEqual(["Account", "Password", "Billing"]);
		expect(tabs.every((t) => t.element.tagName === "BUTTON")).toBe(true);
	});

	it.each([
		[{}, [true, false, false], "Account panel"],
		[{ defaultIndex: 1 }, [false, true, false], "Password panel"],
	])("initial selection %j", (props, expected, panel) => {
		const wrapper = mount(makeTabs(props));
		expect(selected(wrapper)).toEqual(expected);
		expect(wrapper.text()).toContain(panel);
	});

	it("switches tab and panel on click, and emits change with the index", async () => {
		const wrapper = mount(makeTabs());
		await tabsOf(wrapper)[1].trigger("click");
		await nextTick();

		expect(selected(wrapper)).toEqual([false, true, false]);
		expect(wrapper.text()).toContain("Password panel");
		expect(wrapper.text()).not.toContain("Account panel");
		expect(wrapper.findComponent(Tabs).emitted("change")?.at(-1)).toEqual([1]);
	});

	it("does not select a disabled tab", async () => {
		const wrapper = mount(makeTabs());
		const billing = tabsOf(wrapper)[2];
		expect(billing.attributes("disabled")).toBeDefined();

		await billing.trigger("click");
		await nextTick();
		expect(selected(wrapper)).toEqual([true, false, false]);
	});

	// The selected tab is the only one with the raised look (shadow).
	it("styles the selected tab differently from the others", () => {
		const [first, second] = tabsOf(mount(makeTabs()));
		expect(first.classes()).toContain("shadow-sm");
		expect(second.classes()).not.toContain("shadow-sm");
	});

	describe("controlled selectedIndex", () => {
		const makeControlled = () =>
			mount(
				defineComponent({
					components: { Tabs, TabsList, TabsTrigger, TabsPanels, TabsContent },
					setup() {
						const active = ref(0);
						return { active };
					},
					template: `
						<Tabs :selected-index="active" @change="active = $event">
							<TabsList>
								<TabsTrigger>One</TabsTrigger>
								<TabsTrigger>Two</TabsTrigger>
							</TabsList>
							<TabsPanels>
								<TabsContent>Panel one</TabsContent>
								<TabsContent>Panel two</TabsContent>
							</TabsPanels>
						</Tabs>
					`,
				}),
			);

		it("follows a click through the parent", async () => {
			const wrapper = makeControlled();
			await tabsOf(wrapper)[1].trigger("click");
			await nextTick();
			expect(selected(wrapper)).toEqual([false, true]);
		});

		it("follows a change made by the parent", async () => {
			const wrapper = makeControlled();
			(wrapper.vm as unknown as { active: number }).active = 1;
			await nextTick();
			expect(selected(wrapper)).toEqual([false, true]);
			expect(wrapper.text()).toContain("Panel two");
		});
	});
});