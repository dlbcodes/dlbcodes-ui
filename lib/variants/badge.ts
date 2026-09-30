import { cva, type VariantProps } from "class-variance-authority";

const baseStyles = [
	"inline-flex",
	"items-center",
	"justify-center",
	"gap-1",
	"w-fit",
	"shrink-0",
	"overflow-hidden",
	"whitespace-nowrap",
	// Tied to --radius (0.6 × radius) so badges follow the user's radius setting.
	// Plain `rounded` is a fixed 0.25rem and would ignore it.
	"rounded-sm",
	"border",
	"px-2",
	"py-0.5",
	"text-[10px]",
	"font-bold",
	"uppercase",
	"tracking-tight",
	"transition-colors",
	"[&>svg]:size-3",
].join(" ");

export const badgeVariants = cva(baseStyles, {
	variants: {
		variant: {
			// Status variants → the status token set.
			success: "border-success-border bg-success-subtle text-success",
			warning: "border-warning-border bg-warning-subtle text-warning",
			info: "border-info-border bg-info-subtle text-info",
			destructive:
				"border-destructive-border bg-destructive-subtle text-destructive",

			// Non-status variants → neutral / brand tokens.
			neutral: "border-border bg-secondary text-secondary-foreground",
			primary: "border-brand bg-brand text-brand-foreground",
			outline: "border-border bg-transparent text-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "neutral",
	},
});

export type BadgeProps = VariantProps<typeof badgeVariants>;