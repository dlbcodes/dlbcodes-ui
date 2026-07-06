<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@dlbcodes/ui";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value" searchable>
            <SelectTrigger placeholder="Pick a country" />
            <SelectContent>
                <SelectSearch placeholder="Search countries…" />
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="cn">China</SelectItem>
                <SelectItem value="us">United States</SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
