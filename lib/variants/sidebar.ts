import { cva, type VariantProps } from "class-variance-authority";

export const sidebarItemVariants = cva(
	[
		"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
		"outline-none focus-visible:ring-2 focus-visible:ring-border-strong",
		"[&_svg]:size-4 [&_svg]:shrink-0",
	].join(" "),
	{
		variants: {
			active: {
				true: "bg-bg-subtle text-text-primary",
				false: "text-text-secondary hover:bg-bg-subtle hover:text-text-primary",
			},
		},
		defaultVariants: {
			active: false,
		},
	},
);

export type SidebarItemVariants = VariantProps<typeof sidebarItemVariants>;