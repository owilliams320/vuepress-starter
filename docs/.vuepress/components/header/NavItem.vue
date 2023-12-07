<template>
    <li>
        <a :href="href" :class="classes">
            <slot></slot>
        </a>
    </li>
</template>

<script  lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    active?: boolean,
    href?: string
 }>();

const classes = computed(() => ({
    'header-nav__main-menu__link': true,
    'active': props.active,
}));

</script>

<style lang="scss" scoped>

li {
    list-style: none;
}
.header-nav__main-menu__link {
    font-size: .9375rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: #00233c;
    position: relative;
    display: block;
    white-space: nowrap;
    text-decoration: none;
    transition: .25s;
    padding: 0 1.25rem;

    &:hover {
        color: #ff5f02;
        text-decoration: none;
    }

    &:after {
        content: "";
        position: absolute;
        height: 2px;
        bottom: -8px;
        background: transparent;
        width: 40px;
        left: 50%;
        transform: translateX(-50%);
        transition: all .2s ease;
    }

    &.active:after {
        background: #ff5f02;
    }
}
</style>