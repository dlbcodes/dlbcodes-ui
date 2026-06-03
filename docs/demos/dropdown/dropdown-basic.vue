<script setup lang="ts">
import Dropdown from "../../../lib/components/form/dropdown/Dropdown.vue";
import DropdownTrigger from "../../../lib/components/form/dropdown/DropdownTrigger.vue";
import DropdownContent from "../../../lib/components/form/dropdown/DropdownContent.vue";
import DropdownItem from "../../../lib/components/form/dropdown/DropdownItem.vue";
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
