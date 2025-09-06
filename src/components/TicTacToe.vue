<template>
  <div class="d-flex justify-center align-center h-100">
    <v-card color="primary">
      <v-card-title>Tic Tac Toe</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row  align="center">
          <v-col>
            <h4>Choose your pawn :</h4>
          </v-col>
          <v-col>
            <v-btn-group
              density="compact"
              elevation="2"
            >
              <v-btn
                :color="pawnPlayer === pawns[0] ? 'grey' : ''"
                :disabled="started"
                @click="handlePawn(pawns[0])"
              >
                <v-icon>{{ pawns[0] }}</v-icon>
              </v-btn>
              <v-btn
                :color="pawnPlayer === pawns[1] ? 'grey' : ''"
                :disabled="started"
                @click="handlePawn(pawns[1])"
              >
                <v-icon>{{ pawns[1] }}</v-icon>
              </v-btn>
            </v-btn-group>
          </v-col>
        </v-row>
        <v-row justify="center">
          <Board
            :cells="createCells"
            :disabled="gameOver || isComputerPlaying"
            :size="size"
            :winning-cells="winningCells"
            @cell-click="handlePlayer"
          />
          <v-dialog v-model="startWithoutPawn" max-width="400">
            <template #default>
              <v-card class="text-center pa-4">
                Please choose your pawn first
                <v-card-actions class="d-flex justify-center">
                  <v-btn @click="startWithoutPawn = !startWithoutPawn">OK</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-row>
        <v-row class="mt-2" justify="center">
          <v-col class="text-center" lg="6" md="6" sm="6">
            <div v-if="gameOver">
              <div v-if="winner">
                <h3 v-if="winner === pawnPlayer">You beat my AI ! 🎉</h3>
                <h3 v-else>My AI is so strong and beat you! 💻</h3>
              </div>
              <div v-else>
                <h3>It's a draw! 🤝</h3>
              </div>
              <v-btn
                color="secondary"
                class="mt-2"
                @click="restartGame"
              >
                Restart Game
              </v-btn>
            </div>
            <div v-else-if="started">
              <h3>You are facing a formidable AI. Don't ruin it.</h3>
            </div>
            <div v-else>
              <h3>Please select your pawn and start the game.</h3>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Home',
    data () {
      return {
        size: 3 as number,
        cells: [] as (string | null)[],
        pawnPlayer: null as string | null,
        started: false as boolean,
        pawns: ['mdi-close', 'mdi-circle-outline'] as string[],
        winningCells: [] as number[],
        gameOver: false as boolean,
        startWithoutPawn: false as boolean,
        winner: null as string | null,
        isComputerPlaying: false as boolean,
      }
    },
    computed: {
      createCells () {
        this.cells = Array.from({ length: this.size * this.size }).fill(null)
        return this.cells
      },
    },
    methods: {
      handlePawn (pawn: string) {
        this.pawnPlayer = pawn
      },
      handlePlayer (idx: number) {
        if (this.pawnPlayer === null) {
          this.startWithoutPawn = true
          return
        }
        if (!this.started) this.started = true

        if (this.isComputerPlaying || this.cells[idx] !== null) return

        // Player
        this.cells[idx] = this.pawnPlayer
        this.checkWin()
        if (this.winner) return
        // Computer
        this.computerPlay()
      },
      computerPlay () {
        const availableIndices = this.cells.map((cell, index) => (cell === null ? index : null))
          .filter(index => index !== null)
        if (availableIndices.length > 0) {
          this.isComputerPlaying = true
          const randomIndex = Math.floor(Math.random() * availableIndices.length)
          const computerIndex = availableIndices[randomIndex]
          const computerPawn = this.pawnPlayer === this.pawns[0] ? this.pawns[1] : this.pawns[0]

          setTimeout(() => {
            this.cells[computerIndex] = computerPawn
            this.checkWin()
            this.isComputerPlaying = false
          }, 500)
        }
      },
      checkWin () {
        this.checkLines()
        if (this.winner) return
        this.checkCols()
        if (this.winner) return
        this.checkMainDiag()
        if(this.winner) return
        this.checkAntiDiag()
        if (this.winner) return

        // check draw
        if (!this.winner && this.cells.every(c => c !== null)) {
          this.gameOver = true
          return
        }
      },
      checkLines () {
        // lines
        for (let row = 0; row < this.size; row++) {
          const start = row * this.size
          const line = this.cells.slice(start, start + this.size)
          if (line.every(v => v && v === line[0])) {
            this.winningCells = Array.from({ length: this.size }, (_, i) => start + i)
            this.winner = line[0]
            this.gameOver = true
            return
          }
        }
      },
      checkCols () {
        // cols
        for (let col = 0; col < this.size; col++) {
          const column = []
          for (let row = 0; row < this.size; row++) column.push(this.cells[row * this.size + col])
          if (column.every(v => v && v === column[0])) {
            this.winningCells = Array.from({ length: this.size }, (_, i) => i * this.size + col)
            this.winner = column[0]
            this.gameOver = true
            return
          }
        }
      },

      checkMainDiag () {
        const mainDiag = Array.from({ length: this.size }, (_, i) => this.cells[i * this.size + i])
        if (mainDiag.every(v => v && v === mainDiag[0])) {
          this.winningCells = Array.from({ length: this.size }, (_, i) => i * this.size + i)
          this.winner = mainDiag[0]
          this.gameOver = true
          return
        }
      },
      checkAntiDiag () {
        const antiDiag = Array.from({ length: this.size }, (_, i) => this.cells[i * this.size + (this.size - 1 - i)])
        if (antiDiag.every(v => v && v === antiDiag[0])) {
          this.winningCells = Array.from({ length: this.size }, (_, i) => i * this.size + (this.size - 1 - i))
          this.winner = antiDiag[0]
          this.gameOver = true
          return
        }
      },
      restartGame () {
        this.cells = Array.from({ length: this.size * this.size }).fill(null)
        this.winningCells = []
        this.started = false
        this.gameOver = false
        this.winner = null
      },
    },
  })

</script>
