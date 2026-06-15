import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"group",
	"flex",
	"items-center",
	"gap-x-2",
	"w-full",
	"min-w-0",
	"border",
	"transition-[color,box-shadow]",
	"outline-none",
	"focus-within:border-border-dark",
	"focus-within:ring-1",
	"focus-within:ring-border-dark",
	// disabled: no pointer events (cursor falls through). Dimmed to signal state.
	"disabled:pointer-events-none",
	"disabled:opacity-50",
].join(" ");

export const inputVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Default surface input.
			primary: "bg-bg-surface border-border-default text-text-primary font-medium",

			// Stronger surface for busy/raised backgrounds (modals, popovers).
			// Uses a semantic token so it reskins with the theme.
			contrast: "bg-bg-raised border-border-default text-text-primary font-medium",
		},

		size: {
			base: "h-12 rounded-xl px-3.5",
			sm: "h-9 rounded-lg px-1 text-sm",
		},

		invalid: {
			// Match the focus ring width; danger color for the error state.
			true: "border-danger-border ring-1 ring-danger-border",
			false: "",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "base",
		invalid: false,
	},
});

export type InputProps = VariantProps<typeof inputVariants>;