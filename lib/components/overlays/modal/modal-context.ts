import { inject, provide, type InjectionKey, type Ref } from "vue";

export type ModalCloseReason =
	| "escape"
	| "backdrop"
	| "close-button"
	| "programmatic";

export interface ModalContext {
	/** Route a close through the modal's veto/reason funnel. */
	attemptClose: (reason: ModalCloseReason) => void;
	/**
	 * Convenience alias used by slot props: closes programmatically.
	 * Equivalent to attemptClose("programmatic").
	 */
	close: () => void;
	labelId: Ref<string | undefined>;
	setLabelId: (id: string | undefined) => void;
	descriptionId: Ref<string | undefined>;
	setDescriptionId: (id: string | undefined) => void;
}

const ModalContextKey: InjectionKey<ModalContext> = Symbol("ModalContext");

export const provideModalContext = (ctx: ModalContext): void =>
	provide(ModalContextKey, ctx);

export const useModalContext = (): ModalContext => {
	const ctx = inject(ModalContextKey, null);
	if (!ctx) throw new Error("Modal parts must be used inside <Modal>.");
	return ctx;
};