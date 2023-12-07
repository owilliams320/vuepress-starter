<template>
    <span class="material-symbols-outlined">
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
    font-family: Material Symbols Outlined;
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    font-variation-settings: "FILL" 0,"wght" 400,"GRAD" 0,"opsz" 48;
}
</style>