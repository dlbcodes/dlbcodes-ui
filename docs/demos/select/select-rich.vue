<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@dlbcodes/ui";
import { PhCircle } from "@phosphor-icons/vue";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Set status" />
            <SelectContent>
                <SelectItem value="active">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-success-text"
                            weight="fill"
                        />
                        Active
                    </span>
                </SelectItem>
                <SelectItem value="away">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-warning-text"
                            weight="fill"
                        />
                        Away
                    </span>
                </SelectItem>
                <SelectItem value="offline">
                    <span class="flex items-center gap-2">
                        <PhCircle
                            class="size-3 text-text-tertiary"
                            weight="fill"
                        />
                        Offline
                    </span>
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
