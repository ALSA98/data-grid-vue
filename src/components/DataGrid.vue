<script>
import DataGridFilters from './DataGridFilters.vue'
import DataGridTable from './DataGridTable.vue'
import { setQueryParam, removeQueryParam, getQueryParam } from '../utils/url.js'

export default {
  data() {
    return {
      updatedFilters: {},
      dataParts: [],
      currentPage: 1,
    }
  },
  components: {
    DataGridFilters,
    DataGridTable,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Object,
      required: true,
    },
    filters: {
      type: Object,
    },
    rowsPerPage: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    filtersKeyValue() {
      // without type, placeholder ..., only key and value [{'k':'v'},{'k':'v'},...]
      return Object.entries(this.updatedFilters).reduce(
        (acc, [key, filter]) => {
          if (filter.value) acc.push({ [key]: filter.value })
          return acc
        },
        []
      )
    },
  },
  created() {
    this.pushDataparts()
    this.updatedFilters = { ...this.filters }
    this.setFiltersFromURlQuery()
  },
  methods: {
    setNewFilter(key, value) {
      this.updatedFilters[key].value = value
      if (!this.filtersKeyValue.length) {
        removeQueryParam('filters')
      } else {
        setQueryParam('filters', JSON.stringify(this.filtersKeyValue))
      }
      this.currentPage = 1 // reset page number
    },
    setFiltersFromURlQuery() {
      const filtersString = getQueryParam('filters')
      if (!filtersString) return
      const filtersArray = JSON.parse(filtersString)
      filtersArray.forEach((filter) => {
        const [[key, value]] = Object.entries(filter)
        this.updatedFilters[key].value = value
      })
    },
    pushDataparts() {
      const from = (this.currentPage - 1) * this.rowsPerPage
      const to = this.currentPage * this.rowsPerPage
      // last page check
      if (to > this.data.length + this.rowsPerPage) return
      this.dataParts = [...this.dataParts, ...this.data.slice(from, to)]
    },
    loadMoreData() {
      this.currentPage++
      this.pushDataparts()
    },
  },
}
</script>

<template>
  <div>
    <h1>تاریخچه تغییرات</h1>
    <DataGridFilters
      v-if="filters"
      :filters="updatedFilters"
      @filters-updated="setNewFilter"
    />
    <!-- options: multip-line rows, show stars -->
    <DataGridTable
      :columns="columns"
      :data="dataParts"
      :applicable-filters="filtersKeyValue"
      @reached-end="loadMoreData"
      :rows-per-page="rowsPerPage"
    />
  </div>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  padding: 0 0.5rem 0.5rem;
}

@media (max-width: 992px) {
  h1 {
    font-size: 1.5rem;
    padding: 1.5rem 1.5rem 0;
  }
}
</style>
