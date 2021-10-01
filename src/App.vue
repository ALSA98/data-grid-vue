<script>
import DataGrid from './components/DataGrid.vue'
import jsonData from './data.json'

const config = {
  columns: {
    name: {
      title: 'نام تغییر دهنده',
      sortable: true,
    },
    date: {
      title: 'تاریخ',
      sortable: true,
    },
    title: {
      title: 'نام آگهی',
      sortable: true,
    },
    field: {
      title: 'فیلد',
      sortable: true,
    },
    old_value: {
      title: 'مقدار قدیمی',
      sortable: true,
    },
    new_value: {
      title: 'مقدار جدید',
      sortable: true,
    },
  },
  filters: {
    name: {
      title: 'نام تغییر دهنده',
      type: 'text',
      placeHolder: 'مانند: Amir ...',
    },
    date: {
      title: 'تاریخ',
      type: 'text',
      placeHolder: 'مانند: 17-06-2020',
    },
    title: {
      title: 'نام آگهی',
      type: 'text',
      placeHolder: 'مانند: پژو پارس ...',
    },
    field: {
      title: 'فیلد',
      type: 'text',
      placeHolder: 'مانند: عنوان',
    },
  },
}

export default {
  data() {
    return {
      data: null,
      columnsConfig: config.columns,
      filtersConfig: config.filters,
    }
  },
  components: {
    DataGrid,
  },
  created() {
    this.data = jsonData
  },
}
</script>

<template>
  <DataGrid
    :rows-per-page="20"
    :columns="columnsConfig"
    :data="data"
    :filters="filtersConfig"
  />
</template>

<style>
:root {
  --primary: hsl(240, 69%, 98%);
  --primary-dark: hsl(240, 69%, 96%);
  --primary-darker: hsl(240, 69%, 92%);
  --primary-darkest: hsl(240, 69%, 88%);
}
html {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: 'Shabnam';
  direction: rtl;
  padding: 2rem;
  color: #333;

  overflow-y: scroll;
}
@media (max-width: 992px) {
  body {
    padding: 1rem;
  }
}
@media (max-width: 768px) {
  body {
    padding: 0;
  }
}
</style>
