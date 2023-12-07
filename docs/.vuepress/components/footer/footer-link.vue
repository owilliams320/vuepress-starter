<template>
    <li>
        <a :href="href" :aria-label="label">{{ label }}<span v-if="newWindow" class="material-symbols-outlined md-16 ms-2">open_in_new</span></a>
    </li>
</template>

<script lang="ts" setup>
defineProps<{
    href?: string,
    label?: string,
    newWindow?: boolean,
}>();
</script>

<style lang="scss" scoped>
li {
    margin: 1rem 0;
}

a {
    font-size: .9375rem;
    line-height: 1.5rem;
    color: #00233c;
    text-decoration: none;
    position: relative;
    background-image: linear-gradient(#00233c, #00233c);
    background-image: webkit-linear-gradient(#00233c, #00233c);
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 0 1px;
    transition: all .25s ease-in-out 0s;

    &:hover {
        background-size: 100% 1px;
    }

    .material-symbols-outlined.md-16 {
        font-size: 1rem;
        margin-left: 0.5rem;
    }
}
</style>