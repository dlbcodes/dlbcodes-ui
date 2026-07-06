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
	// transition-all (not just colors) so the active press-translate animates too.
	"transition-all",
	"duration-100",
	"ease-linear",
	// Subtle tactile press: nudge down 1px on click. Excluded for menu triggers
	// (aria-haspopup), which shouldn't bounce when opening their menu.
	"active:not-aria-[haspopup]:translate-y-px",
	"disabled:pointer-events-none",
	"disabled:opacity-50",
	"focus-visible:outline-none",
	"focus-visible:ring-2",
	"focus-visible:ring-offset-2",
	"focus-visible:ring-border-strong",
	// Auto-size icons inside the button to size-4 unless an explicit size-* is set,
	// and make them non-interactive so clicks always hit the button.
	"[&_svg]:pointer-events-none",
	"[&_svg]:shrink-0",
	"[&_svg:not([class*='size-'])]:size-4",
].join(" ");

export const buttonVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Brand-filled primary action.
			primary: "border border-brand-200 bg-brand-200 text-text-inverse hover:brightness-110",

			// Neutral surface action. aria-expanded keeps it "active" while its menu is open.
			secondary:
				"border border-border-default bg-bg-base text-text-primary hover:bg-bg-subtle aria-expanded:bg-bg-subtle",

			// Destructive action.
			destructive: "border border-danger-text bg-danger-text text-text-inverse hover:brightness-110",

			// Bordered, transparent fill. Active-while-open via aria-expanded.
			outline:
				"border border-border-default bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-primary aria-expanded:bg-bg-subtle aria-expanded:text-text-primary",

			// No border/fill until hover. Active-while-open via aria-expanded.
			ghost: "text-text-primary hover:bg-bg-subtle aria-expanded:bg-bg-subtle",

			// Inline text link.
			link: "inline-flex text-brand-200 hover:underline",

			// Square icon button. Active-while-open via aria-expanded (kebab menus etc.).
			icon: "relative inline-grid place-items-center text-text-secondary hover:bg-bg-subtle aria-expanded:bg-bg-subtle aria-expanded:text-text-primary",
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