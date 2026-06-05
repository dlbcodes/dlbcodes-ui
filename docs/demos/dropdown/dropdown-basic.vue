<script setup lang="ts">
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "../../../lib/components/form/dropdown";
import Button from "../../../lib/components/primitives/Button.vue";
</script>

<template>
    <Dropdown>
        <DropdownTrigger>
            <Button variant="outline">Options</Button>
        </DropdownTrigger>
        <DropdownContent size="full">
            <DropdownItem @select="() => {}">Profile</DropdownItem>
            <DropdownItem @select="() => {}">Settings</DropdownItem>
            <DropdownItem @select="() => {}">Sign out</DropdownItem>
        </DropdownContent>
    </Dropdown>
</template>
