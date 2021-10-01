<script>
export default {
  props: {
    width: {
      type: String,
      default: '24px',
    },
    height: {
      type: String,
      default: '24px',
    },
    color: {
      type: String,
      default: '#666',
    },
  },
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="height"
    viewBox="0 0 24 24"
    :width="width"
    enable-background="new 0 0 24 24"
    :fill="color"
  >
    <slot />
  </svg>
</template>

<style scoped></style>
