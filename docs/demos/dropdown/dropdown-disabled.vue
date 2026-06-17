<script setup lang="ts">
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    Button,
} from "@dlbcodes/my-design-system";
</script>

<template>
    <Dropdown>
        <DropdownTrigger as-child>
            <Button variant="outline">Actions</Button>
        </DropdownTrigger>
        <DropdownContent size="sm">
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownItem disabled>Delete (no permission)</DropdownItem>
        </DropdownContent>
    </Dropdown>
</template>
