import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
	"relative flex w-full gap-3 rounded-xl border px-4 py-3 text-sm",
	{
		variants: {
			variant: {
				neutral: "bg-muted border-border text-foreground",
				info: "bg-info-subtle border-info-border text-info",
				success: "bg-success-subtle border-success-border text-success",
				warning: "bg-warning-subtle border-warning-border text-warning",
				destructive:
					"bg-destructive-subtle border-destructive-border text-destructive",
			},
		},
		defaultVariants: {
			variant: "neutral",
		},
	},
);

export type AlertVariantsProps = VariantProps<typeof alertVariants>;