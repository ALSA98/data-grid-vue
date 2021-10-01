<script>
import StarButton from './StarButton.vue'
const localStorageSelectedRows = localStorage.getItem('selected')
const selectedRows = localStorageSelectedRows // execute once
  ? JSON.parse(localStorageSelectedRows)
  : {}
// its a usecase of Set, but since we cant stringify Set
// and converting it to array is an extra time-consuming task
// so we do it with Object : { {id}:true, 2656: true, 127:true}

export default {
  data() {
    return {
      id: null,
      cells: [],
      selected: false,
    }
  },
  components: {
    StarButton,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    columns: {
      type: Object,
      required: true,
    },
    hasStarColumn: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.id = this.rowData.id

    this.selected = selectedRows ? !!selectedRows[this.id] : false

    // order in this array matters
    this.cells = Object.keys(this.columns).map((column) => {
      const cellId = String(this.rowData[column]).slice(0, 7) + this.id
      const value = this.rowData[column].toLocaleString()

      const cell = {
        id: cellId,
        value,
      }
      return cell
    })
  },
  methods: {
    toggleSelect() {
      if (this.selected) {
        delete selectedRows[this.id]
        this.selected = false
      } else {
        selectedRows[this.id] = 1 //instead true
        this.selected = true
      }
      localStorage.setItem('selected', JSON.stringify(selectedRows))
    },
  },
}
</script>

<template>
  <tr>
    <td v-show="hasStarColumn">
      <StarButton :selected="selected" @toggle="toggleSelect" />
    </td>
    <template v-for="cell in cells" :key="cell.id">
      <td>{{ cell.value }}</td>
    </template>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5rem;
  line-height: 1.6rem;
  /* white-space: nowrap; */
}
tr {
  transition: 0.2s;
  border-radius: 8px;
  overflow: hidden;
}
tr:nth-child(even) {
  background-color: var(--primary);
}
tr:hover {
  background-color: var(--primary-dark);
}
</style>
