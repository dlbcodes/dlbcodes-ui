import { cva, type VariantProps } from "class-variance-authority";

export const separatorVariants = cva("shrink-0 bg-border-subtle", {
	variants: {
		orientation: {
			horizontal: "h-px w-full",
			vertical: "h-full w-px",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

export type SeparatorVariantsProps = VariantProps<typeof separatorVariants>;