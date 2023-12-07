<script setup lang="ts">
import NavbarBrand from '@theme/NavbarBrand.vue'
import NavbarItems from '@theme/NavbarItems.vue'
import ToggleColorModeButton from '@theme/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue'
import { computed, ref } from 'vue'
import {
  DeviceType,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '@vuepress/theme-default/lib/client/composables/index.js'
import Header from './header/Header.vue'
import Icon from './icon/Icon.vue';
import Button from './button/Button.vue';

defineEmits<(e: 'toggle-sidebar') => void>()

defineSlots<{
  before?: (props: Record<never, never>) => any
  after?: (props: Record<never, never>) => any
}>()

const themeLocale = useThemeLocaleData()

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

useUpdateDeviceStatus(
  DeviceType.MOBILE,
  (mobileDesktopBreakpoint: number): void => {
    // avoid overlapping of long title and long navbar links
    const navbarHorizontalPadding =
      getCssValue(navbar.value, 'paddingLeft') +
      getCssValue(navbar.value, 'paddingRight')
    if (window.innerWidth < mobileDesktopBreakpoint) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
  },
)

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <!-- Inter Font Typography & Material Icons Rounded Font --->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
  rel="stylesheet"
/>
  <Header :title="'Developers'" >
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <span ref="navbarBrand">
      <NavbarBrand />
    </span>

    <template v-slot:navigation>
      <slot name="before" />
      <NavbarItems class="can-hide" />
      <slot name="after" />
    </template>

    <template v-slot:actions>
      <Icon>search</Icon>
      <Button :label="'Login'" primary></Button>
      <div class="navbar-items-wrapper" :style="linksWrapperStyle">
        <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
        <NavbarSearch />
      </div>
    </template>

  </Header>
</template>
