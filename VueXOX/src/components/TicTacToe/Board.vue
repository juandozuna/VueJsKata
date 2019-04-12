<template>
  <div>
    <div class="game">
      <div class="gameTitle">
        <h1>{{ toptitle }}</h1>
      </div>
      <div class="board">
        <div>
            <square v-for="(tile, i) in tiles" :key="i" 
                @clicked="clickTile(i)"
                @mouseover="tile.onHover(curPlayer.value)"
                @mouseleave="tile.onLeave()"
                :played="tile.played"
                :player="tile.player"
                :highlighted="tile.highlighted"
            >
                {{tile.value}}
            </square>
        </div>
      </div>
      <button @click="reset">RESET GAME</button>
    </div>
  </div>
</template>

<script>
import Square from "./Square";
import playerIcon from './PlayerEnum.js';
import Tile from './Tile.js';
const icon = require('./PlayerEnum.js').default;
export default {
  name: "board",
  components: {
    Square
  },
  data() {
    return {
      tiles: new Array(9).fill().map(t => new Tile()),
      moves: 0,
      gameActive: true,
      winner: '',
      curPlayer: icon.x,
      players: {
        x: [],
        o: []
      }
    };
  },
  computed: {
      toptitle() {
          if(this.gameActive){
              return `It's ${this.curPlayer.value}'s Turn`;
              //return 'Simple Game';
          }else {
              if(this.winner === 'tie'){
                  return "It's a Tie";
              }else {
                  return `${this.winner} just won`;
              }
          }
      }
  },
  methods: {
      clickTile(i){
          if(this.gameActive && !this.tiles[i].played){
              let p = this.curPlayer.value;
              this.tiles[i].onClick(p);
              this.players[this.curPlayer.id].push(i+1);
              this.changePlayer();
          }
      },
      changePlayer(){
          this.moves++;
          this.checkWinner();
          if(this.curPlayer.value === icon.x.value){
              this.curPlayer = icon.o;
          }else {
              this.curPlayer = icon.x;
          }

      },
      checkWinner(){
        const validWins = [
          [1,2,3],[4,5,6],[7,8,9],
          [1,4,7],[2,5,8],[3,6,9],
          [7,5,3],[1,5,9]
        ];
        let count = 0;
        let winner = '';
        let cells = [];
        for(let vw of validWins){
          count = 0;
          cells = [];
          let arr = this.players[this.curPlayer.id];
          for(let i = 0; i < arr.length; i++){
            if(vw.indexOf(arr[i]) > -1){
              count++;
              cells.push(i);
            }
            if(count === 3){
              winner = this.curPlayer.value;
              for(let k = 0; k < cells.length; k++){
                this.tiles[arr[cells[k]]-1].highlight();
              }
              break;
            }
          }
        }
        this.winner = winner;
        if(this.winner != ''){
          this.gameActive = false;
        }
        this.checkIfFilled();
      },
      checkIfFilled(){
        let tie = true;
        for(let tile of this.tiles){
          if(tile.value === ''){
            tie = false
            break;
          }
        }
        if(this.gameActive && this.winner === '' && tie){
          this.gameActive = false;
          this.winner = "tie";
        }
      },
      reset(){
        this.curPlayer = icon.x;
        this.moves = 0;
        this.winner = '';
        this.gameActive = true;
        for(let tile of this.tiles){
          tile.reset();
        }
        this.players = {
          x: [],
          o: []
        };
      }
  }
};
</script>


<style lang="scss">
@import "../../assets/board.scss";
</style>
