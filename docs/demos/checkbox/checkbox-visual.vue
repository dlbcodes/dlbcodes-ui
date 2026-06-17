<script setup lang="ts">
import { Checkbox } from "@dlbcodes/my-design-system";
</script>

<template>
    <!-- visual mode: box only, no input — driven by :model-value, not v-model -->
    <div class="flex items-center gap-4">
        <Checkbox :model-value="false" visual />
        <Checkbox :model-value="true" visual />
    </div>
</template>
