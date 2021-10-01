<script>
import DataGridTableHeaderItem from './DataGridTableHeaderItem.vue'
export default {
  components: {
    DataGridTableHeaderItem,
  },
  props: {
    columns: {
      type: Object,
      required: true,
    },
    hasStarColumn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    columnList() {
      const columnsWithKey = Object.entries(this.columns).map(
        ([key, value]) => {
          value.key = key
          return value
        }
      )
      return columnsWithKey
    },
  },
  methods: {
    handleItemClick({ columnKey, prevSortType }) {
      this.$emit('item-clicked', {
        columnKey,
        prevSortType,
      })
    },
  },
}
</script>

<template>
  <thead>
    <tr>
      <th v-show="hasStarColumn" :style="{ minWidth: '36px' }"></th>
      <DataGridTableHeaderItem
        v-for="col in columnList"
        @clikced="handleItemClick"
        :key="col.key"
        :key-name="col.key"
        :title="col.title"
        :sortable="col.sortable"
        :sort="col.sort ?? 'none'"
      />
      <!-- <th>نام تغییر دهنده</th>
      <th>تاریخ</th>
      <th>نام آگهی</th>
      <th>فیلد</th>
      <th>مقدار قدیمی</th>
      <th>مقدار جدید</th> -->
    </tr>
  </thead>
</template>

<style scoped>
thead {
  position: sticky;
  top: 0;
  background-color: white;
}

thead::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: var(--primary-dark);
}
</style>
