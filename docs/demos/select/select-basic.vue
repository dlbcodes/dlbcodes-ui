<script setup lang="ts">
import { ref } from "vue";
// import Select from "../../../lib/components/form/select/Select.vue";
// import SelectTrigger from "../../../lib/components/form/select/SelectTrigger.vue";
// import SelectContent from "../../../lib/components/form/select/SelectContent.vue";
// import SelectItem from "../../../lib/components/form/select/SelectItem.vue";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "../../../lib/components/form/select";

const value = ref("");
</script>

<template>
    <div class="w-full max-w-xs">
        <Select v-model="value">
            <SelectTrigger placeholder="Pick a framework" />
            <SelectContent>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>
