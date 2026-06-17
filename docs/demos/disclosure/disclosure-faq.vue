<script setup lang="ts">
import {
    Disclosure,
    DisclosureTrigger,
    DisclosureContent,
} from "@dlbcodes/my-design-system";

const faqs = [
    {
        q: "Can I cancel anytime?",
        a: "Yes, you can cancel your subscription at any point from your account settings.",
    },
    {
        q: "Do you offer refunds?",
        a: "We offer a 30-day money-back guarantee on all annual plans.",
    },
    {
        q: "Is there a free trial?",
        a: "Every plan comes with a 14-day free trial — no card required.",
    },
];
</script>

<template>
    <div class="w-full max-w-md">
        <Disclosure v-for="faq in faqs" :key="faq.q">
            <DisclosureTrigger>{{ faq.q }}</DisclosureTrigger>
            <DisclosureContent>{{ faq.a }}</DisclosureContent>
        </Disclosure>
    </div>
</template>
