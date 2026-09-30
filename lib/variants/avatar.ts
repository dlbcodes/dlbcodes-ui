import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"flex",
	"flex-col",
	"items-center",
	"justify-center",
	"w-full",
	"uppercase",
	"text-foreground",
	"bg-muted",
	"border",
	"border-border",
	"overflow-hidden",
].join(" ");

// Styles for the inner element (image / fallback). Its radius is set per size
// below so it stays concentric with the outer frame.
const innerStyles = [
	"*:overflow-hidden",
	"*:bg-card",
	"*:shadow-xs",
	"*:dark:border",
	"*:dark:border-background",
	"*:dark:shadow-[inset_-1px_1px_2px_0px_oklch(1_0_0/15%)]",
].join(" ");

/*
 * Concentric radii: inner radius = outer radius − padding (or − the 1px border
 * when there is no padding). They are written in terms of --radius, using the
 * same multipliers as the theme scale (3xl 2.2, 2xl 1.8, xl 1.4, md 0.8), so
 * the whole avatar follows the user's radius setting, including on a wrapper
 * element. Keep them in sync with the @theme radius scale.
 */
export const avatarVariants = cva([baseStyles, innerStyles].join(" "), {
	variants: {
		size: {
			"10xl":
				"text-3xl size-30 xl:size-40 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"9xl": "text-3xl size-30 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"8xl": "text-3xl size-28 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"7xl": "text-3xl size-26 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"6xl": "text-3xl size-24 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"5xl": "text-3xl size-22 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"4xl": "text-4xl size-20 p-1 rounded-3xl *:rounded-[calc(var(--radius)*2.2-0.25rem)]",
			"3xl": "text-xl size-18 p-1 rounded-2xl *:rounded-[calc(var(--radius)*1.8-0.25rem)]",
			"2xl": "size-16 rounded-xl *:rounded-[calc(var(--radius)*1.4-1px)]",
			xl: "size-14 rounded-xl *:rounded-[calc(var(--radius)*1.4-1px)]",
			lg: "size-12 p-0.5 rounded-xl *:rounded-[calc(var(--radius)*1.4-0.125rem)]",
			base: "size-10 rounded-xl *:rounded-[calc(var(--radius)*1.4-1px)]",
			sm: "size-8 rounded-xl *:rounded-[calc(var(--radius)*1.4-1px)]",
			xs: "size-6 rounded-md *:rounded-[calc(var(--radius)*0.8-1px)]",
		},
	},

	defaultVariants: {
		size: "base",
	},
});

export type AvatarProps = VariantProps<typeof avatarVariants>;