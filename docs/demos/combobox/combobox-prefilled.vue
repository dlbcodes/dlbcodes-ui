<script setup lang="ts">
import { ref } from "vue";
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxItem,
    ComboboxEmpty,
} from "@dlbcodes/ui";

const value = ref("react");
</script>

<template>
    <div class="w-full max-w-xs">
        <Combobox v-model="value">
            <ComboboxInput placeholder="Search frameworks..." />
            <ComboboxContent>
                <ComboboxItem value="vue" label="Vue">Vue</ComboboxItem>
                <ComboboxItem value="react" label="React">React</ComboboxItem>
                <ComboboxItem value="svelte" label="Svelte"
                    >Svelte</ComboboxItem
                >
                <ComboboxItem value="angular" label="Angular"
                    >Angular</ComboboxItem
                >
                <ComboboxEmpty>No frameworks match.</ComboboxEmpty>
            </ComboboxContent>
        </Combobox>
    </div>
</template>
