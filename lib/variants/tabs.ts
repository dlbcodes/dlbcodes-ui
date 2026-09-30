import { cva, type VariantProps } from "class-variance-authority";

// Track and tab follow the --radius scale (not a fixed pill) so a square or
// rounded theme applies to tabs too. The tab is one step smaller than the
// track so the two stay roughly concentric (4px padding + 1px border).
export const tabGroupVariants = cva(
	"flex w-fit items-center gap-1 rounded-xl border border-border bg-muted p-1",
);

export const tabVariants = cva(
	[
		"flex items-center gap-x-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-all",
		"outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-muted",
		// disabled styling lives in the base, keyed off the disabled attribute/aria
		"disabled:cursor-not-allowed disabled:opacity-50",
	].join(" "),
	{
		variants: {
			selected: {
				// dark:bg-accent lifts the selected pill above the muted track in dark mode
				true: "bg-background text-foreground shadow-sm dark:bg-accent",
				false: "text-muted-foreground not-disabled:hover:text-foreground",
			},
		},
		defaultVariants: { selected: false },
	},
);

export type TabVariantsProps = VariantProps<typeof tabVariants>;