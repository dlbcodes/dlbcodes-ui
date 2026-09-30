import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"group",
	"flex",
	"items-center",
	"gap-x-2",
	"w-full",
	"min-w-0",
	"border",
	"transition-[color,border-color,box-shadow]",
	"outline-none",
	"focus-visible:outline-none",
	"focus-within:border-foreground",
	"focus-within:ring-1",
	"focus-within:ring-foreground",
	// The root is usually a wrapper <div>, where :disabled never matches.
	// has-disabled covers the real <input disabled> inside it; disabled: and
	// aria-disabled: cover a native root or an explicit flag.
	"disabled:pointer-events-none",
	"disabled:opacity-50",
	"aria-disabled:pointer-events-none",
	"aria-disabled:opacity-50",
	"has-disabled:pointer-events-none",
	"has-disabled:opacity-50",
].join(" ");

export const inputVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Default surface input (tinted fill).
			primary: "bg-muted border-input text-foreground font-medium",

			// Plain fill for inputs sitting on tinted/raised surfaces (cards, modals, popovers).
			contrast: "bg-background border-input text-foreground font-medium",
		},

		// Heights and radii match buttonVariants 1:1 so controls line up in a row.
		// text-base on mobile avoids iOS Safari's zoom-on-focus for inputs < 16px.
		size: {
			sm: "h-8 rounded-lg px-1 text-base md:text-sm",
			base: "h-10 rounded-xl px-3.5 text-base md:text-sm",
			lg: "h-12 rounded-xl px-3.5 text-base",
			xl: "h-14 rounded-xl px-4 text-base",
		},

		invalid: {
			true: "border-destructive ring-1 ring-destructive focus-within:border-destructive focus-within:ring-destructive",
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