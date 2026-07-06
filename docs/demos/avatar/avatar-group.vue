<script setup lang="ts">
import { Avatar } from "@dlbcodes/ui";
</script>

<template>
    <!-- A simple overlapping stack using negative margin + a ring to separate. -->
    <div class="flex -space-x-3">
        <Avatar
            src="https://i.pravatar.cc/120?img=1"
            name="A"
            class="ring-2 ring-bg-base"
        />
        <Avatar
            src="https://i.pravatar.cc/120?img=2"
            name="B"
            class="ring-2 ring-bg-base"
        />
        <Avatar
            src="https://i.pravatar.cc/120?img=3"
            name="C"
            class="ring-2 ring-bg-base"
        />
        <Avatar name="+5" class="ring-2 ring-bg-base" />
    </div>
</template>
