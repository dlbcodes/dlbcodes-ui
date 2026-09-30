import { cva, type VariantProps } from "class-variance-authority";

export const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-10 rounded-xl bg-muted text-foreground [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;