import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"group",
	"inline-flex",
	"items-center",
	"justify-center",
	"gap-2",
	"cursor-pointer",
	"select-none",
	"font-semibold",
	"transition-colors",
	"duration-100",
	"ease-linear",
	"disabled:pointer-events-none",
	"disabled:opacity-50",
	"focus-visible:outline-none",
	"focus-visible:ring-2",
	"focus-visible:ring-offset-2",
	"focus-visible:ring-border-strong",
].join(" ");

export const buttonVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Brand-filled primary action.
			primary: "border border-brand-200 bg-brand-200 text-text-inverse hover:bg-brand-100",

			// Neutral surface action.
			secondary:
				"border border-border-default bg-bg-base text-text-primary hover:bg-bg-subtle",

			// Destructive action.
			destructive:
				"border border-danger-text bg-danger-text text-text-inverse hover:opacity-90",

			// Bordered, transparent fill.
			outline:
				"border border-border-default bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-primary",

			// No border/fill until hover.
			ghost: "text-text-primary hover:bg-bg-subtle",

			// Inline text link.
			link: "inline-flex text-brand-200 hover:underline",

			// Square icon button.
			icon: "relative inline-grid place-items-center text-text-secondary hover:bg-bg-subtle",
		},

		size: {
			xl: "h-14 rounded-xl px-6 text-base",
			lg: "h-12 rounded-xl px-6 text-base",
			base: "h-10 rounded-xl px-6 text-sm",
			sm: "h-8 rounded-lg px-4 text-sm",
			icon: "rounded-xl p-1.5",
			"icon-sm": "rounded-lg p-1",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "base",
	},
});

export type ButtonProps = VariantProps<typeof buttonVariants>;