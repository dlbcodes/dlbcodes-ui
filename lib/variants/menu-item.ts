import { cva, type VariantProps } from "class-variance-authority";

export const menuItemVariants = cva(
	"flex w-full items-center rounded-lg cursor-pointer select-none text-base outline-none transition-colors data-active:bg-bg-surface disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			indicator: {
				none: "gap-x-2 px-2 py-1.5",
				"trailing-check": "relative gap-x-2 py-2 pl-3 pr-9",
				"leading-control": "gap-x-2 px-3 py-2",
			},
		},
		defaultVariants: { indicator: "none" },
	},
);

export type MenuItemProps = VariantProps<typeof menuItemVariants>;