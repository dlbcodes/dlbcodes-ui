import { inject, provide, type InjectionKey, type Ref } from "vue";

export interface SidebarContext {
	isMobile: Ref<boolean>;
	mobileOpen: Ref<boolean>;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export const SidebarContextKey: InjectionKey<SidebarContext> =
	Symbol("SidebarContext");

export const provideSidebar = (ctx: SidebarContext): void => {
	provide(SidebarContextKey, ctx);
};

export const useSidebar = (): SidebarContext => {
	const ctx = inject(SidebarContextKey);
	if (!ctx) {
		throw new Error("Sidebar components must be used within a <SidebarProvider>.");
	}
	return ctx;
};