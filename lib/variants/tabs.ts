import { cva, type VariantProps } from "class-variance-authority";

export const tabGroupVariants = cva(
	"flex w-fit items-center gap-1 rounded-full border border-border-default bg-bg-surface p-1",
);

export const tabVariants = cva(
	[
		"flex items-center gap-x-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
		"outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-1 focus-visible:ring-offset-bg-surface",
		// disabled styling lives in the base, keyed off the disabled attribute/aria
		"disabled:cursor-not-allowed disabled:opacity-50",
	].join(" "),
	{
		variants: {
			selected: {
				true: "bg-bg-raised text-text-primary shadow-sm",
				false: "text-text-secondary not-disabled:hover:text-text-primary",
			},
		},
		defaultVariants: { selected: false },
	},
);

export type TabVariantsProps = VariantProps<typeof tabVariants>;