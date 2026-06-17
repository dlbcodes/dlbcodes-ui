<script setup lang="ts">
import { ref } from "vue";
import {
    Field,
    FieldLabel,
    FieldContent,
    Input,
    Button,
    Checkbox,
    Label,
    Separator,
} from "@dlbcodes/my-design-system";
import { PhGoogleLogo, PhGithubLogo } from "@phosphor-icons/vue";

// Local state only — this is a static showcase, nothing navigates or submits.
const email = ref("");
const password = ref("");
const remember = ref(false);
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <div>
            <div
                class="text-2xl font-semibold tracking-tight text-text-primary"
            >
                Welcome back
            </div>
            <div class="mt-1 text-sm text-text-secondary">
                Sign in to your account to continue.
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <Button variant="secondary" class="w-full justify-center">
                <PhGoogleLogo class="size-4" /> Continue with Google
            </Button>
            <Button variant="secondary" class="w-full justify-center">
                <PhGithubLogo class="size-4" /> Continue with GitHub
            </Button>
        </div>

        <div class="flex items-center gap-3">
            <Separator class="flex-1" />
            <span class="text-xs text-text-tertiary">or</span>
            <Separator class="flex-1" />
        </div>

        <div class="flex flex-col gap-4">
            <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                    <Input
                        v-model="email"
                        type="email"
                        placeholder="you@example.com"
                    />
                </FieldContent>
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <FieldContent>
                    <Input
                        v-model="password"
                        type="password"
                        placeholder="••••••••"
                    />
                </FieldContent>
            </Field>

            <div class="flex items-center justify-between">
                <Label
                    for="showcase-remember"
                    class="flex items-center gap-2 text-sm text-text-secondary"
                >
                    <Checkbox id="showcase-remember" v-model="remember" />
                    Remember me
                </Label>

                <span class="cursor-default text-sm text-brand-200">
                    Forgot password?
                </span>
            </div>

            <Button variant="primary" class="w-full justify-center">
                Sign in
            </Button>
        </div>

        <div class="text-center text-sm text-text-secondary">
            Don't have an account?
            <span class="font-medium text-brand-200">Sign up</span>
        </div>
    </div>
</template>
