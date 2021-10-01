<script>
import BaseIcon from './base/BaseIcon.vue'
import IconStar from './base/icons/IconStar.vue'
import IconStarOutline from './base/icons/IconStarOutline.vue'
export default {
  components: {
    BaseIcon,
    IconStar,
    IconStarOutline,
  },
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<template>
  <button @click="$emit('toggle')">
    <BaseIcon>
      <IconStar v-if="selected" />
      <IconStarOutline v-else />
    </BaseIcon>
  </button>
</template>

<style scoped>
button {
  border: 0;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;
}
button:hover {
  background-color: var(--primary-darker);
}
button:active {
  background-color: var(--primary-darkest);
}
</style>
