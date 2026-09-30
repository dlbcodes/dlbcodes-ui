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
	// Covers native :disabled AND aria-disabled (used by <Button> for links,
	// loading state and non-button roots), so the component no longer needs
	// its own "pointer-events-none opacity-60" class.
	"disabled:pointer-events-none",
	"disabled:opacity-50",
	"aria-disabled:pointer-events-none",
	"aria-disabled:opacity-50",
	"focus-visible:outline-none",
	"focus-visible:ring-2",
	"focus-visible:ring-offset-2",
	"focus-visible:ring-ring",
	// Without this the offset gap is white in dark mode.
	"focus-visible:ring-offset-background",
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
			// (Uses --brand, not --primary: --primary is the neutral shadcn role.)
			primary:
				"border border-brand bg-brand text-brand-foreground hover:brightness-110",

			// Neutral surface action. aria-expanded keeps it "active" while its menu is open.
			secondary:
				"border border-border bg-background text-foreground hover:bg-accent aria-expanded:bg-accent",

			// Destructive action.
			destructive:
				"border border-destructive bg-destructive text-destructive-foreground hover:brightness-110",

			// Bordered, transparent fill. Active-while-open via aria-expanded.
			outline:
				"border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",

			// No border/fill until hover. Active-while-open via aria-expanded.
			ghost: "text-foreground hover:bg-accent aria-expanded:bg-accent",

			// Inline text link.
			link: "inline-flex text-brand underline-offset-4 hover:underline",

			// Square icon button. Active-while-open via aria-expanded (kebab menus etc.).
			icon: "relative inline-grid place-items-center text-muted-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
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