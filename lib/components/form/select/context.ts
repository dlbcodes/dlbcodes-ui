import type { InjectionKey, Ref, ComputedRef } from "vue";

export interface SelectOption {
	label: string;
	value: string;
}

/**
 * Shared state for the Select compound component. Select provides this; the
 * parts (Trigger, Content, Search, Item) inject it. Typed via an InjectionKey
 * so the contract is compile-time checked — no magic strings.
 */
export interface SelectContext {
	/** Currently selected value (single-select). */
	selected: ComputedRef<string>;
	/** Display label of the current selection, resolved from registered items. */
	selectedLabel: ComputedRef<string>;
	/** Set the selection. Called by SelectItem with its value and label. */
	select: (value: string, label: string) => void;
	/** Whether a given value is the current selection. */
	isSelected: (value: string) => boolean;

	/**
	 * Register an item's value→label mapping so the trigger can display the
	 * correct label for a pre-filled modelValue, before any click.
	 */
	registerLabel: (value: string, label: string) => void;

	/** Live search query (two-way, owned by Select, written by SelectSearch). */
	query: Ref<string>;
	/** Whether search is enabled for this select. */
	searchable: ComputedRef<boolean>;

	/** The accessible id base, for wiring label/listbox relationships. */
	id: string;
}

export const SelectKey: InjectionKey<SelectContext> = Symbol("Select");