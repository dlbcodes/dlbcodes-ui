<script setup lang="ts">
import { ref } from "vue";
import Input from "../../../lib/components/form/Input.vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

const query = ref("");
</script>

<template>
    <Input v-model="query" placeholder="Search…" class="max-w-sm">
        <PhMagnifyingGlass class="size-4" />
    </Input>
</template>
