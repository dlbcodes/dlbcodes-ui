import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, h, ref, markRaw } from "vue";
import Sidebar from "./Sidebar.vue";
import SidebarGroup from "./SidebarGroup.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarTrigger from "./SidebarTrigger.vue";
import { SidebarContextKey, type SidebarContext } from "./context";

// Controllable mock context: flip the state with plain booleans, without
// depending on window size or useMediaQuery.
type State = { isMobile?: boolean; mobileOpen?: boolean; collapsed?: boolean };

const makeCtx = ({
	isMobile = false,
	mobileOpen = false,
	collapsed = false,
}: State = {}): SidebarContext => ({
	isMobile: ref(isMobile),
	mobileOpen: ref(mobileOpen),
	collapsed: ref(collapsed),
	open: vi.fn(),
	close: vi.fn(),
	toggle: vi.fn(),
});

// Mount with the mock sidebar context provided.
const withCtx = (
	component: unknown,
	ctx: SidebarContext,
	options: Record<string, unknown> = {},
): VueWrapper =>
	mount(component as never, {
		global: { provide: { [SidebarContextKey as symbol]: ctx } },
		...options,
	}) as VueWrapper;

describe("SidebarGroup", () => {
	it("renders a heading only when a label is provided", () => {
		const labelled = mount(SidebarGroup, {
			props: { label: "Workspace" },
			slots: { default: "items" },
		});
		expect(labelled.find("p").text()).toBe("Workspace");
		expect(labelled.text()).toContain("items");

		const plain = mount(SidebarGroup, { slots: { default: "items" } });
		expect(plain.find("p").exists()).toBe(false);
		expect(plain.text()).toContain("items");
	});
});

describe("SidebarItem", () => {
	const item = (options: Record<string, unknown> = {}, state: State = {}) => {
		const ctx = makeCtx(state);
		return {
			ctx,
			wrapper: withCtx(SidebarItem, ctx, {
				slots: { default: "Home" },
				...options,
			}),
		};
	};

	it.each([
		[undefined, "A"],
		["button", "BUTTON"],
	])("as=%j renders a <%s>", (as, tag) => {
		const { wrapper } = item({ props: { as } });
		expect(wrapper.element.tagName).toBe(tag);
		expect(wrapper.text()).toBe("Home");
	});

	it("renders as a custom component passed to `as` and forwards attrs", () => {
		const FakeLink = markRaw(
			defineComponent({
				name: "FakeLink",
				props: { to: { type: String, default: "" } },
				setup(props, { slots }) {
					return () =>
						h("a", { "data-to": props.to, "data-fake-link": "" }, slots.default?.());
				},
			}),
		);
		const { wrapper } = item({ props: { as: FakeLink, to: "/dashboard" } });
		expect(wrapper.find("[data-fake-link]").exists()).toBe(true);
		expect(wrapper.find("[data-to='/dashboard']").exists()).toBe(true);
	});

	// Active is the only state with a permanent (non-hover) accent background.
	it.each([
		[true, true],
		[false, false],
	])("active=%s -> accent background: %s", (active, hasBg) => {
		const { wrapper } = item({ props: { active } });
		expect(wrapper.classes().includes("bg-sidebar-accent")).toBe(hasBg);
	});

	// Tapping a link on mobile should dismiss the drawer; on desktop it must not.
	it.each([
		[true, 1],
		[false, 0],
	])("isMobile=%s -> close called %s time(s) on click", async (isMobile, calls) => {
		const { wrapper, ctx } = item({ props: { as: "button" } }, { isMobile });
		await wrapper.trigger("click");
		expect(ctx.close).toHaveBeenCalledTimes(calls);
	});

	it("merges a custom class", () => {
		const { wrapper } = item({ props: { class: "font-bold" } });
		expect(wrapper.classes()).toContain("font-bold");
	});
});

describe("SidebarTrigger", () => {
	it.each([true, false])("toggles on click (isMobile=%s)", async (isMobile) => {
		const ctx = makeCtx({ isMobile });
		const wrapper = withCtx(SidebarTrigger, ctx);
		await wrapper.find("button").trigger("click");
		expect(ctx.toggle).toHaveBeenCalledOnce();
	});
});

describe("Sidebar", () => {
	// [state, is the <aside> rendered?]
	it.each([
		[{ isMobile: false, collapsed: false }, true], // desktop, expanded
		[{ isMobile: false, collapsed: true }, false], // desktop, collapsed
		[{ isMobile: true, mobileOpen: false }, false], // mobile, drawer closed
		[{ isMobile: true, mobileOpen: true }, true], // mobile, drawer open
		[{ isMobile: true, mobileOpen: true, collapsed: true }, true], // collapsed is desktop-only
	] as [State, boolean][])("state %j -> rendered: %s", (state, rendered) => {
		const wrapper = withCtx(Sidebar, makeCtx(state), {
			slots: { default: "nav" },
		});
		expect(wrapper.find("aside").exists()).toBe(rendered);
		expect(wrapper.text().includes("nav")).toBe(rendered);
	});

	it("closes the drawer when the backdrop is clicked", async () => {
		const ctx = makeCtx({ isMobile: true, mobileOpen: true });
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		await wrapper.find(".fixed.inset-0").trigger("click");
		expect(ctx.close).toHaveBeenCalled();
	});

	// The key handler is global: focus usually stays on the trigger button
	// when the drawer opens, so a handler on the <aside> would never fire.
	describe("Escape", () => {
		const pressEscape = () =>
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

		it.each([
			[{ isMobile: true, mobileOpen: true }, 1],
			[{ isMobile: true, mobileOpen: false }, 0], // nothing to close
			[{ isMobile: false, mobileOpen: true }, 0], // desktop ignores the drawer
		] as [State, number][])("state %j -> close called %s time(s)", (state, calls) => {
			const ctx = makeCtx(state);
			const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
			pressEscape();
			expect(ctx.close).toHaveBeenCalledTimes(calls);
			wrapper.unmount();
		});
	});

	describe("scroll lock", () => {
		afterEach(() => {
			document.body.style.overflow = "";
		});

		it("locks body scroll while the mobile drawer is open and releases it on unmount", () => {
			const wrapper = withCtx(Sidebar, makeCtx({ isMobile: true, mobileOpen: true }));
			expect(document.body.style.overflow).toBe("hidden");

			wrapper.unmount();
			expect(document.body.style.overflow).not.toBe("hidden");
		});

		it("does not lock body scroll on desktop", () => {
			withCtx(Sidebar, makeCtx({ isMobile: false, mobileOpen: true }));
			expect(document.body.style.overflow).not.toBe("hidden");
		});
	});
});