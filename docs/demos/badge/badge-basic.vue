<script setup lang="ts">
import Badge from "../../../lib/components/primitives/Badge.vue";
import Avatar from "../../../lib/components/primitives/Avatar.vue";
</script>

<template>
    <div class="flex w-full max-w-sm flex-col gap-3">
        <div
            class="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-raised px-4 py-3"
        >
            <Avatar name="Ana Silva" :src="null" size="sm" />
            <div class="min-w-0 flex-1">
                <div class="truncate text-sm font-medium text-text-primary">
                    Ana Silva
                </div>
                <div class="truncate text-xs text-text-tertiary">
                    ana@example.com
                </div>
            </div>
            <Badge variant="success">Active</Badge>
        </div>

        <div
            class="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-raised px-4 py-3"
        >
            <Avatar name="John Carter" :src="null" size="sm" />
            <div class="min-w-0 flex-1">
                <div class="min-w-0 flex-1">
                    <div class="truncate text-sm font-medium text-text-primary">
                        John Carter
                    </div>
                    <div class="truncate text-xs text-text-tertiary">
                        john@example.com
                    </div>
                </div>
            </div>
            <Badge variant="pending">Invited</Badge>
        </div>
    </div>
</template>
