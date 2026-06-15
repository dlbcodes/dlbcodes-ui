<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

const options = ["Newest", "Oldest", "Most popular"] as const;
const sort = ref<(typeof options)[number]>("Newest");
</script>

<template>
    <div class="flex flex-col items-start gap-3">
        <Dropdown>
            <DropdownTrigger as-child>
                <Button variant="outline">
                    Sort: {{ sort }}
                    <PhCaretDown class="size-4" />
                </Button>
            </DropdownTrigger>
            <DropdownContent size="3xs">
                <DropdownItem
                    v-for="opt in options"
                    :key="opt"
                    @select="sort = opt"
                    class="justify-between"
                >
                    <span>{{ opt }}</span>
                    <PhCheck
                        class="size-4"
                        :class="opt === sort ? 'opacity-100' : 'opacity-0'"
                    />
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
        <div class="text-sm text-text-tertiary">
            Showing results sorted by
            <span class="text-text-secondary">{{ sort }}</span
            >.
        </div>
    </div>
</template>
