<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@dlbcodes/ui";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Choose a plan" />
            <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise" disabled>
                    Enterprise (contact sales)
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
