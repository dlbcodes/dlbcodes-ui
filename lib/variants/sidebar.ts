import { cva, type VariantProps } from "class-variance-authority";

export const sidebarItemVariants = cva(
	[
		"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
		"outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
		"[&_svg]:size-4 [&_svg]:shrink-0",
	].join(" "),
	{
		variants: {
			active: {
				true: "bg-sidebar-accent text-sidebar-accent-foreground",
				false: "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

export type SidebarItemVariants = VariantProps<typeof sidebarItemVariants>;