<script setup lang="ts">
import { ref } from "vue";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@dlbcodes/my-design-system";

// Bound to a value before the user opens the select. Because each item carries
// its `label`, the trigger resolves "React" on load — no opening required.
const value = ref("react");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Pick a framework" />
            <SelectContent>
                <SelectItem value="vue" label="Vue">Vue</SelectItem>
                <SelectItem value="react" label="React">React</SelectItem>
                <SelectItem value="svelte" label="Svelte">Svelte</SelectItem>
                <SelectItem value="angular" label="Angular">Angular</SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
