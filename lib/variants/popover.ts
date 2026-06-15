import { cva, type VariantProps } from "class-variance-authority";

export const popoverVariants = cva(
	"max-h-80 overflow-y-auto rounded-2xl bg-bg-raised p-2 shadow-lg ring-1 ring-border-default focus-visible:outline-none",
	{
		variants: {
			size: {
				fit: "w-fit",
				full: "w-full",
				"3xs": "w-3xs",
				"2xs": "w-2xs",
				xs: "w-xs",
				sm: "w-sm",
				md: "w-md",
				lg: "w-lg",
			},
		},
		defaultVariants: {
			size: "fit",
		},
	}
);

export type PopoverVariantsProps = VariantProps<typeof popoverVariants>;