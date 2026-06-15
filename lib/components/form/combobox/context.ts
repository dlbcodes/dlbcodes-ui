import type { InjectionKey, Ref, ComputedRef } from "vue";

export interface ComboboxContext {
	selected: ComputedRef<string>;
	selectedLabel: ComputedRef<string>;
	select: (value: string, label: string) => void;
	isSelected: (value: string) => boolean;
	registerLabel: (value: string, label: string) => void;

	query: Ref<string>;
	matchesQuery: (label: string) => boolean;

	/** Items report their match state so ComboboxEmpty knows if any match. */
	setItemVisible: (key: string, visible: boolean) => void;
	/** How many items currently match the query. */
	visibleCount: ComputedRef<number>;
	/** Whether the user has typed a non-empty query. */
	hasQuery: ComputedRef<boolean>;

	id: string;
}

export const ComboboxKey: InjectionKey<ComboboxContext> = Symbol("Combobox");