<template>
  <div class="d-flex justify-center align-center h-100">
    <v-card
      class="ma-4 w-100 "
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 1fr)`}"
    >
      <Cell
        v-for="(cell, idx) in cells"
        :key="idx"
        :disabled="disabled || valueDisabled(idx)"
        :highlight="winningCells.includes(idx)"
        :index="idx"
        :value="cell"
        @click="onCellClick(idx, cell)"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Cell from './Cell.vue'
  export default defineComponent({
    name: 'TicTacToe',
    components: { Cell },
    props: {
      size: { type: Number, required: true },
      cells: { type: Array, required: true },
      winningCells: { type: Array, default: () => [] },
      disabled: { type: Boolean, default: false },
    },
    emits: ['cell-click'],
    methods: {
      onCellClick (idx: number) {
        this.$emit('cell-click', idx)
      },
      valueDisabled (idx) {
        return this.cells[idx] !== null
      },
    },
  })
</script>
<style scoped>
</style>
