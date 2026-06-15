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
	"disabled:pointer-events-none",
	"disabled:cursor-not-allowed",
	"disabled:opacity-50",
].join(" ");

export const inputVariants = cva(baseStyles, {
	variants: {
		variant: {
			primary: [
				"bg-bg-surface",
				"border-border-default",
				"text-text-primary",
				"font-medium",
			].join(" "),

			contrast: [
				"bg-white",
				"border-border-default",
				"text-text-primary",
				"font-medium",
			].join(" "),

			secondary: "",
			outline: "",
		},

		size: {
			xl: "",
			lg: "",
			base: "h-12 rounded-xl px-3.5",
			sm: "h-9 rounded-lg px-2 text-sm",
			xs: "",
			icon: "",
			none: "",
			checkbox: "h-6 w-6",
		},

		invalid: {
			true: [
				"border-danger-border",
				"ring-[3px]",
				"ring-danger-border/20",
			].join(" "),

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