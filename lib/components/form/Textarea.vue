<script setup lang="ts">
import {
    computed,
    inject,
    ref,
    watch,
    nextTick,
    type HTMLAttributes,
} from "vue";
import { useTextareaAutosize } from "@vueuse/core";
import { cn } from "../../utils/cn";
import { FieldKey } from "../../core/field-context";
import { inputVariants, type InputProps } from "../../variants/input";

interface Props {
    variant?: InputProps["variant"];
    size?: InputProps["size"];
    id?: string;
    placeholder?: string;
    rows?: number;
    /** Grow with content up to a max height, then scroll. `rows` is the minimum. */
    autosize?: boolean;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "base",
    rows: 4,
    autosize: false,
    disabled: undefined,
    invalid: undefined,
    required: undefined,
});

const model = defineModel<string | number | null>();

const field = inject(FieldKey, null);

// props-win precedence: explicit prop > field context > local default.
const resolvedId = computed(() => props.id ?? field?.id.value);
const resolvedInvalid = computed(
    () => props.invalid ?? field?.invalid.value ?? false,
);
const resolvedDisabled = computed(
    () => props.disabled ?? field?.disabled.value ?? false,
);
const resolvedRequired = computed(
    () => props.required ?? field?.required.value ?? false,
);
const describedById = computed(() => field?.describedById.value);

// `rows` → a min-height, so the field shows that many lines in BOTH modes.
// (The bare `rows` attribute gets overridden by the inherited flex layout and,
// in autosize mode, by the height autosize sets — so we enforce the floor here.)
const minHeightStyle = computed(() => ({
    minHeight: `${props.rows * 1.5 + 1}rem`,
}));

// Autosize: VueUse sets the element's `height` from its content. Combined with
// the min-height above and `max-h-60` below, it grows between a floor and a cap.
const textareaEl = ref<HTMLTextAreaElement>();
const { triggerResize } = useTextareaAutosize({
    element: textareaEl,
    input: computed(() => String(model.value ?? "")),
    styleProp: "height",
});

watch(
    () => model.value,
    async () => {
        if (props.autosize) {
            await nextTick();
            triggerResize();
        }
    },
);

const wrapperClass = computed(() =>
    cn(
        inputVariants({
            variant: props.variant,
            size: props.size,
            invalid: resolvedInvalid.value,
        }),
        "h-auto",
        // When autosizing, drop the wrapper's right padding so the textarea
        // (and its scrollbar) can reach the rounded edge. The textarea carries
        // its own right padding instead, keeping text off the scrollbar.
        props.autosize && "pr-0",
        props.class,
    ),
);

const onInput = (event: Event): void => {
    model.value = (event.target as HTMLTextAreaElement).value;
};
</script>

<template>
    <div :class="wrapperClass" :data-invalid="resolvedInvalid || undefined">
        <span
            v-if="$slots.default"
            class="flex items-center gap-1 text-text-secondary"
        >
            <slot />
        </span>

        <textarea
            :id="resolvedId"
            ref="textareaEl"
            :rows="rows"
            :style="minHeightStyle"
            :value="model ?? ''"
            :disabled="resolvedDisabled"
            :placeholder="placeholder"
            :required="resolvedRequired"
            :aria-invalid="resolvedInvalid || undefined"
            :aria-required="resolvedRequired || undefined"
            :aria-describedby="describedById"
            :data-invalid="resolvedInvalid || undefined"
            :class="
                cn(
                    'w-full bg-transparent py-2 text-text-primary/70 outline-none transition-colors group-hover:text-text-primary focus:text-text-primary disabled:cursor-not-allowed',
                    autosize
                        ? 'resize-none max-h-60 overflow-y-auto scrollbar-thin pr-3.5'
                        : 'resize-none',
                )
            "
            @input="onInput"
        />
    </div>
</template>
