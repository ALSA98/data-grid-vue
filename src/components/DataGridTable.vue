<script>
import { setQueryParam, removeQueryParam, getQueryParam } from '../utils/url.js'
import DataGridTableHeader from './DataGridTableHeader.vue'
import DataGridTableRow from './DataGridTableRow.vue'

let prevRowsCount = 0

export default {
  data() {
    return {
      hasStarColumn: true,
      sortedColumnKey: null,
      sortType: 'none',
      updatedColumns: null, // columns with sort added in this component
      filteredData: null, // if there is no filter, will be equal to this.data
      finalData: null, // = filtered data that sorted
    }
  },
  components: {
    DataGridTableHeader,
    DataGridTableRow,
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
    applicableFilters: {
      type: Array,
    },
    rowsPerPage: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    columnsCount() {
      const extraColumns = this.hasStarColumn ? 1 : 0
      return Object.keys(this.columns).length + extraColumns
    },
  },
  watch: {
    applicableFilters() {
      this.applyfilters()
      this.finalData = [...this.filteredData]
    },
    data() {
      this.applyfilters() // must be before sort
      this.finalData = [...this.filteredData]
      this.sortRows()
    },
    finalData() {
      this.checkIfEligibleForMoreData()
    },
  },
  created() {
    this.updatedColumns = { ...this.columns }
    this.applyfilters() // must be before sort
    this.finalData = [...this.filteredData]
    this.setSortFromUrlQuery()
  },
  methods: {
    handleColumnClick({ columnKey, prevSortType }) {
      // remove sort when click on an asc sorted column
      if (prevSortType === 'asc') {
        this.removeSort(columnKey)
        return
      }

      this.sortedColumnKey = columnKey
      if (prevSortType === 'none') this.sortType = 'desc'
      if (prevSortType === 'desc') this.sortType = 'asc'

      // save current sort in url for later use
      setQueryParam('sort', `${this.sortedColumnKey}:${this.sortType}`)

      // update columns data for DataGirdHeader component (to show the arrow next to the column name)
      this.updateColumnsSortStatus()

      this.sortRows()
    },
    updateColumnsSortStatus() {
      // remove sort from all columns first
      for (const column in this.updatedColumns) {
        this.updatedColumns[column].sort = 'none'
      }
      // then:
      this.updatedColumns[this.sortedColumnKey].sort = this.sortType
    },
    removeSort(columnKey) {
      this.updatedColumns[columnKey].sort = 'none'
      this.sortedColumnKey = null
      this.sortType = 'none'
      this.finalData = [...this.filteredData]

      removeQueryParam('sort')
    },
    sortRows() {
      if (!this.sortType || this.sortType === 'none') return

      this.finalData.sort((a, b) => {
        const modifier = this.sortType === 'asc' ? 1 : -1

        a = a[this.sortedColumnKey]
        b = b[this.sortedColumnKey]

        // to make string/number compare able
        if (typeof a === 'string' || typeof b === 'string') {
          a = String(a)
          b = String(b)
        }

        if (a < b) return -1 * modifier

        if (a > b) return 1 * modifier

        return 0
      })
    },
    setSortFromUrlQuery() {
      const sortInUrlQuery = getQueryParam('sort')
      if (!sortInUrlQuery) return
      const [columnKey, sortType] = sortInUrlQuery.split(':')
      if (columnKey && sortType) {
        this.sortedColumnKey = columnKey
        this.sortType = sortType
        this.updatedColumns[columnKey].sort = sortType
        this.sortRows()
      }
    },
    applyfilters() {
      if (!this.applicableFilters || !this.applicableFilters.length) {
        this.filteredData = [...this.data]
      } else {
        this.applicableFilters.forEach((filter) => {
          const [[key, value]] = Object.entries(filter)
          const regex = new RegExp(value, 'gi')
          this.filteredData = this.data.filter((row) => {
            return regex.test(row[key])
          })
        })
      }
    },
    onScroll() {
      const bottomOffset = this.getScrollBottomOffset()

      const gotDataFromPrevScroll = this.finalData.length > prevRowsCount
      const filtered = !!this.applicableFilters.length
      const eligibleForLoad = filtered
        ? bottomOffset < 800
        : bottomOffset < 800 && gotDataFromPrevScroll

      if (eligibleForLoad) {
        prevRowsCount = this.finalData.length
        this.$emit('reached-end')
      }
    },
    checkIfEligibleForMoreData() {
      if (this.filteredData.length <= this.rowsPerPage) {
        this.$emit('reached-end')
      }
    },
    getScrollBottomOffset() {
      const pageOffset = this.$refs.tableContainer.getBoundingClientRect().top
      const scrolled = this.$refs.table.getBoundingClientRect().top - pageOffset
      const tableHeight = this.$refs.table.clientHeight
      const difference = tableHeight - Math.abs(scrolled)
      //to test difference:
      //console.log(difference, Math.abs(scrolled), lastScrollHeight)
      return difference
    },
  },
}
</script>

<template>
  <div
    class="table-container"
    v-on:scroll.passive="onScroll"
    ref="tableContainer"
  >
    <table ref="table">
      <DataGridTableHeader
        @item-clicked="handleColumnClick"
        :columns="updatedColumns"
        :has-star-column="hasStarColumn"
      />

      <DataGridTableRow
        v-for="row in finalData"
        :key="row.id"
        :row-data="row"
        :columns="updatedColumns"
        :has-star-column="hasStarColumn"
      />
      <tr v-show="!finalData.length">
        <td class="empty" align="center" :colspan="columnsCount">
          نتیجه‌ای یافت نشد!
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  border-radius: 4px;
  overflow: scroll;
  max-height: calc(100vh - 4rem);
  position: relative;
}

table {
  border-collapse: collapse;
  width: 100%;
  position: relative;
}

.empty {
  padding: 1rem;
}

/* Scrollbar */
::-webkit-scrollbar {
  height: 0.875rem;
  width: 0.875rem;
}

::-webkit-scrollbar-track {
  background-color: var(--primary-dark);
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary-darker);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-darkest);
}
</style>
