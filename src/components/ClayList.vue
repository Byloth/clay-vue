<script lang="ts" setup>
    import ClayListItem from "./ClayListItem.vue";
</script>

<template>
    <ul class="clay-list">
        <ClayListItem text="Matteo Bilotta" subtext="Online dal 09 Aprile 1993" />
    </ul>
</template>

<style lang="scss">
    .clay-list
    {
        list-style: none;
        padding: 0;
    }
</style>
