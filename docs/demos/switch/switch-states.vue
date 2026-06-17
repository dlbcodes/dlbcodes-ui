<script setup lang="ts">
import { ref } from "vue";
import { Switch, Label } from "@dlbcodes/my-design-system";

const a = ref(true);
const b = ref(false);
const c = ref(true);
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
            <Switch id="sw-on" v-model="a" />
            <Label for="sw-on">On</Label>
        </div>
        <div class="flex items-center gap-2">
            <Switch id="sw-off" v-model="b" />
            <Label for="sw-off">Off</Label>
        </div>
        <div class="flex items-center gap-2">
            <Switch id="sw-dis" v-model="c" disabled />
            <Label for="sw-dis">Disabled</Label>
        </div>
    </div>
</template>
