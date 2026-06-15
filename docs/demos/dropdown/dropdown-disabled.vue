<script setup lang="ts">
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
import Button from "../../../lib/components/primitives/Button.vue";
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
