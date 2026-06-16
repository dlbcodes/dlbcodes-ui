export const overlayTransition = {
	enter: "transition ease-out duration-150 motion-reduce:transition-none",
	enterFrom: "opacity-0 scale-95 motion-reduce:scale-100",
	enterTo: "opacity-100 scale-100",
	leave: "transition-none",
	leaveFrom: "opacity-100",
	leaveTo: "opacity-0",
} as const;