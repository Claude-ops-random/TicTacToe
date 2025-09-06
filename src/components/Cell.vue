<template>
  <v-btn
    class="cell"
    :color="highlight ? 'green' : ''"
    :disabled="disabled"
    elevation="0"
    @click="$emit('click')"
  >
    <v-icon v-if="value">{{ value }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Cell',
    props: {
      value: { type: String, default: null },
      index: { type: Number, required: true },
      highlight: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
    },
    emits: ['click'],
  })
</script>
<style scoped>
.cell {
  border: 1px solid #000;
  min-width: 55px;
  aspect-ratio: 1/1;
  min-height: 55px;
  font-size: 30px;
  font-weight: bold;
}
</style>
