import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, ref, type Ref } from "vue";
import Sidebar from "./Sidebar.vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarContent from "./SidebarContent.vue";
import SidebarFooter from "./SidebarFooter.vue";
import SidebarGroup from "./SidebarGroup.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarTrigger from "./SidebarTrigger.vue";
import { SidebarContextKey, type SidebarContext } from "./context";

// Build a controllable mock context so we can flip isMobile/mobileOpen
// without depending on window size or useMediaQuery.
const makeCtx = (overrides: Partial<SidebarContext> = {}): SidebarContext => ({
	isMobile: ref(false) as Ref<boolean>,
	mobileOpen: ref(false) as Ref<boolean>,
	open: vi.fn(),
	close: vi.fn(),
	toggle: vi.fn(),
	...overrides,
});

// Mount a component with the mock sidebar context provided.
const withCtx = (component: unknown, ctx: SidebarContext, options: Record<string, unknown> = {}) =>
	mount(component as never, {
		global: { provide: { [SidebarContextKey as symbol]: ctx } },
		...options,
	});

describe("SidebarGroup", () => {
	it("renders a label when provided", () => {
		const wrapper = mount(SidebarGroup, {
			props: { label: "Workspace" },
			slots: { default: "items" },
		});
		expect(wrapper.text()).toContain("Workspace");
		expect(wrapper.text()).toContain("items");
	});

	it("renders no heading when label is omitted", () => {
		const wrapper = mount(SidebarGroup, { slots: { default: "items" } });
		expect(wrapper.find("p").exists()).toBe(false);
		expect(wrapper.text()).toContain("items");
	});
});

describe("SidebarItem", () => {
	it("renders as an <a> by default", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, { slots: { default: "Home" } });
		expect(wrapper.element.tagName).toBe("A");
		expect(wrapper.text()).toContain("Home");
	});

	it("renders as a button when as='button'", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Click" },
		});
		expect(wrapper.element.tagName).toBe("BUTTON");
	});

	it("renders as an arbitrary component passed to `as` and forwards attrs", () => {
		// Stand-in for RouterLink / NuxtLink — any component works via `as`.
		const FakeLink = defineComponent({
			name: "FakeLink",
			props: { to: { type: String, default: "" } },
			setup(props, { slots }) {
				return () =>
					h("a", { "data-to": props.to, "data-fake-link": "" }, slots.default?.());
			},
		});
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: FakeLink, to: "/dashboard" },
			slots: { default: "Dashboard" },
		});
		expect(wrapper.find("[data-fake-link]").exists()).toBe(true);
		expect(wrapper.find("[data-to='/dashboard']").exists()).toBe(true);
		expect(wrapper.text()).toContain("Dashboard");
	});

	it("applies inactive styling by default", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, { slots: { default: "x" } });
		const cls = wrapper.classes();
		expect(cls).toContain("text-text-secondary");
		expect(cls).not.toContain("bg-bg-subtle");
	});

	it("applies active styling when active", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { active: true },
			slots: { default: "x" },
		});
		const cls = wrapper.classes();
		expect(cls).toContain("bg-bg-subtle");
		expect(cls).toContain("text-text-primary");
	});

	it("closes the drawer on click when mobile", async () => {
		const ctx = makeCtx({ isMobile: ref(true) as Ref<boolean> });
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Go" },
		});
		await wrapper.trigger("click");
		expect(ctx.close).toHaveBeenCalledOnce();
	});

	it("does NOT close on click when desktop", async () => {
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { as: "button" },
			slots: { default: "Go" },
		});
		await wrapper.trigger("click");
		expect(ctx.close).not.toHaveBeenCalled();
	});

	it("merges a custom class", () => {
		const ctx = makeCtx();
		const wrapper = withCtx(SidebarItem, ctx, {
			props: { class: "font-bold" },
			slots: { default: "x" },
		});
		expect(wrapper.classes()).toContain("font-bold");
	});
});

describe("SidebarTrigger", () => {
	it("renders on mobile and toggles", async () => {
		const ctx = makeCtx({ isMobile: ref(true) as Ref<boolean> });
		const wrapper = withCtx(SidebarTrigger, ctx);
		const btn = wrapper.find("button");
		expect(btn.exists()).toBe(true);
		await btn.trigger("click");
		expect(ctx.toggle).toHaveBeenCalledOnce();
	});

	it("does NOT render on desktop", () => {
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(SidebarTrigger, ctx);
		expect(wrapper.find("button").exists()).toBe(false);
	});
});

describe("Sidebar", () => {
	it("renders an inline aside on desktop", () => {
		const ctx = makeCtx({ isMobile: ref(false) as Ref<boolean> });
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(true);
		expect(wrapper.text()).toContain("nav");
	});

	it("does not show the drawer on mobile when closed", () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(false) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		// drawer aside is behind v-if="mobileOpen", so not rendered when closed
		expect(wrapper.find("aside").exists()).toBe(false);
	});

	it("shows the drawer on mobile when open", () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		expect(wrapper.find("aside").exists()).toBe(true);
		expect(wrapper.text()).toContain("nav");
	});

	it("closes the drawer when the backdrop is clicked", async () => {
		const ctx = makeCtx({
			isMobile: ref(true) as Ref<boolean>,
			mobileOpen: ref(true) as Ref<boolean>,
		});
		const wrapper = withCtx(Sidebar, ctx, { slots: { default: "nav" } });
		// backdrop is the fixed inset-0 div with the click handler
		const backdrop = wrapper.find(".fixed.inset-0");
		expect(backdrop.exists()).toBe(true);
		await backdrop.trigger("click");
		expect(ctx.close).toHaveBeenCalled();
	});
});