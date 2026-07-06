<script setup lang="ts">
import { Button } from "@dlbcodes/ui";
</script>

<template>
    <!-- `as="a"` overrides the default RouterLink, rendering a plain anchor -->
    <Button to="https://example.com" as="a" target="_blank" variant="link">
        Visit site
    </Button>
</template>
