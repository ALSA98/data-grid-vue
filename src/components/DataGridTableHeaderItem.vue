<script>
import BaseIcon from './base/BaseIcon.vue'
import IconArrowDown from './base/icons/IconArrowDown.vue'
export default {
  components: {
    BaseIcon,
    IconArrowDown,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
    keyName: {
      type: String,
      required: true,
    },
    sort: {
      type: String,
      default: 'none',
      validator: (value) => {
        return ['none', 'asc', 'desc'].indexOf(value) !== -1
      },
    },
  },
  methods: {
    handleClick() {
      if (!this.sortable) return
      this.$emit('clikced', {
        columnKey: this.keyName,
        prevSortType: this.sort,
      })
    },
  },
}
</script>

<template>
  <th @click="handleClick" :class="{ sortable: sortable }">
    <div class="header-item-content">
      <span>{{ title }}</span>
      <template v-if="sort !== 'none'">
        <BaseIcon
          class="icon"
          :class="{ 'upside-down': sort === 'asc' }"
          width="20px"
          height="20px"
        >
          <IconArrowDown />
        </BaseIcon>
      </template>
    </div>
  </th>
</template>

<style scoped>
.header-item-content {
  display: flex;
  align-items: center;
}
span {
  display: inline-block;
  margin-left: 0.5rem;
}
th {
  font-weight: 900;
  text-align: right;
  position: relative;
  transition: 0.2s;
  min-width: 80px;
  max-width: 200px;
  padding: 0.5rem;
  padding-left: 0.75rem;
  user-select: none;
}

th.sortable {
  cursor: pointer;
}

th:not(:last-child)::before {
  content: '';
  width: 0.1rem;
  height: 50%;
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary-dark);
}

th.sortable:hover {
  background-color: var(--primary-dark);
}

th.sortable:active {
  background-color: var(--primary-darker);
}

.icon {
  transition: 0.2s;
}

.upside-down {
  transform: rotate(180deg);
}
</style>
