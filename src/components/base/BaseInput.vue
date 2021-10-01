<script>
export default {
  name: 'BaseInput',
  data() {
    return {
      modelValue: '',
    }
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    display: {
      type: String,
      default: 'block',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  created() {
    this.modelValue = this.value
  },
  methods: {
    updateInput() {
      this.$emit('changed', this.id, this.modelValue)
    },
  },
}
</script>

<template>
  <div class="input-container">
    <input
      :id="id"
      :type="type"
      v-model="modelValue"
      @input="updateInput"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
    <label v-if="label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.input-container {
  padding: 0.5rem;
  flex: 0 0 200px;
  display: flex;
  flex-direction: column-reverse;
}

label {
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  display: block;
  transition: 0.2s;
}
input {
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 4px;
  width: calc(100% - 1rem);
  border: 0;
  background-color: var(--primary);
  transition: 0.2s;
  font-family: 'shabnam';
}
input:not(:focus):hover {
  background-color: var(--primary-dark);
}

input:focus {
  outline: 2px solid hsl(268, 91%, 46%);
}

input:focus + label {
  color: hsl(268, 91%, 46%);
}
::placeholder {
  font-family: 'shabnam';
  font-weight: 500;
  color: var(--primary-darkest);
}
@media (max-width: 576px) {
  .input-container {
    flex: 1 1 200px !important;
  }
}
</style>
