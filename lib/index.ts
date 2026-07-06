// Primitives
export * from "./components/primitives";

// Form
export * from "./components/form/field";
export * from "./components/form/select";
export * from "./components/form/multiselect";
export * from "./components/form/dropdown";
export * from "./components/form/combobox";
export { default as Input } from "./components/form/Input.vue";
export { default as Textarea } from "./components/form/Textarea.vue";
export { default as Checkbox } from "./components/form/Checkbox.vue";
export { default as Switch } from "./components/form/Switch.vue";

// Overlays
export * from "./components/overlays/popover";
export * from "./components/overlays/modal";

// Utils & variants
export { cn } from "./utils/cn";
export * from "./variants/button";
export * from "./variants/badge";
export * from "./variants/input";
export * from "./variants/popover";

// Shared types
export type { FieldContext } from "./core/field-context";
export { FieldKey } from "./core/field-context";