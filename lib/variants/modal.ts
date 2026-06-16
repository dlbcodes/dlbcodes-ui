import { cva, type VariantProps } from "class-variance-authority";

// The dialog panel: a mobile bottom-sheet (full-width, rounded top only) that
// becomes a centered, max-width dialog at md+. `size` controls the desktop
// max-width; `full` additionally fills height and squares the corners.
export const modalVariants = cva(
	[
		"relative flex max-h-[calc(100vh-100px)] w-full flex-col overflow-y-auto",
		"rounded-3xl border border-border-subtle bg-bg-raised shadow-xs",
	].join(" "),
	{
		variants: {
			size: {
				sm: "md:max-w-sm",
				md: "md:max-w-md",
				lg: "md:max-w-lg",
				xl: "md:max-w-xl",
				"2xl": "md:max-w-2xl",
				"3xl": "md:max-w-3xl",
				"4xl": "md:max-w-4xl",
				"5xl": "md:max-w-5xl",
				full: "md:max-w-full h-full rounded-t-none md:rounded-none",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export type ModalVariantsProps = VariantProps<typeof modalVariants>;