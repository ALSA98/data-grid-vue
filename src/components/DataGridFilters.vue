;
<script>
import BaseInput from './base/BaseInput.vue'
export default {
  data() {
    return {
      filtersArray: [],
    }
  },
  components: {
    BaseInput,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.filtersArray = Object.entries(this.filters).map(([key, value]) => {
      return { key, ...value }
    })
  },
  methods: {
    updateFilter(key, value) {
      this.$emit('filters-updated', key, value)
      // update url
    },
  },
}
</script>

<template>
  <div class="from-container">
    <h2 class="title">جستجو در لیست</h2>
    <form @submit.prevent>
      <template v-for="filter in filtersArray" :key="filter.key">
        <BaseInput
          :label="filter.title"
          :id="filter.key"
          :value="filter.value"
          @changed="updateFilter"
          :placeholder="filter.placeHolder"
        />
      </template>
    </form>
  </div>
</template>

<style scoped>
.from-container {
  margin: 1rem 0;
  border-bottom: 1px solid var(--primary-dark);
  border-top: 1px solid var(--primary-dark);
  padding: 0.5rem 0;
}
form {
  display: flex;
  flex-wrap: wrap;
}
.title {
  margin: 0;
  padding: 0.5rem;
  font-weight: 900;
  font-size: 1rem;
}

@media (max-width: 992px) {
  .from-container {
    padding: 1.5rem 1rem;
  }
}
</style>
