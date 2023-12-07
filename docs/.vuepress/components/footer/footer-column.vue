<template>
    <li>
        <span class="title">{{ title }}</span>
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>

<script lang="ts" setup>
defineProps<{ title?: string }>();
</script>

<style lang="scss" scoped>
.title {
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
    color: #00233c;
}

li {
    flex: 1 0 0%;
    width: 100%;
    margin: 0;
    padding-left: calc(var(--bs-gutter-x, 1.5rem)*.5);
    padding-right: calc(var(--bs-gutter-x, 1.5rem)*.5);

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
    }
}

ul {
    list-style: none;
    flex-direction: column;
    margin: 0;
    padding: 0;
}
</style>