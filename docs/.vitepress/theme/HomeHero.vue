<script setup lang="ts">
import { Button } from "@dlbcodes/my-design-system";
</script>

<template>
    <section class="border-b border-border-subtle">
        <div
            class="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-20 text-center md:py-28"
        >
            <h1
                class="text-3xl font-semibold tracking-tight text-balance text-text-primary md:text-5xl lg:text-6xl lg:leading-[1.05]"
            >
                Accessible Vue 3 components, tokenized and yours to own.
            </h1>
            <p class="max-w-2xl text-lg text-balance text-text-secondary">
                A composable component library built on Tailwind v4,
                class-variance-authority, and Headless UI — designed to be
                styled with your tokens, not fought against.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3 pt-3">
                <Button to="/guide/getting-started" as="a">Get started</Button>
                <Button to="/components/avatar" as="a" variant="secondary">
                    Browse components
                </Button>
            </div>
        </div>
    </section>
</template>
