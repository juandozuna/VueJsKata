<template>
    <div>
        <div class="game">
            <div class="gameTitle">
                <h1>{{topTitle}}</h1>
            </div>
            <div class="board">
                <div>
                    <square  v-for="(tile, i) in tiles" :key="i"
                        @click="clickTile(i)"
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
import Square from './Square';
import Tile from './tile.js';
const icon = require('./players.js').default;
export default {
    name: 'board',
    components: {
        Square
    },
    data(){
        return {
            temp: 9,
            tiles: new Array(9).fill().map(t => new Tile()),
            gameActive: true,
            winner: '',
            curPlayer: icon.x,
            players: {
                x: [], o: []
            }
        };
    },
    computed: {
        topTitle(){
            if(this.gameActive){
                return `Es el turno de ${this.curPlayer.value}`;
            }else {
                if(this.winner === 'tie'){
                    return `Es un empate`;
                }else {
                    return `${this.winner} es el ganador`;
                }
            }
        }
    },
    methods: {
        clickTile(i){
            if(this.gameActive && !this.tiles[i].played){
                let p = this.curPlayer.value;
                this.tiles[i].onClick(p);
                this.players[this.curPlayer.id].push(i);
                this.changePlayer();
            }
        },
        changePlayer(){
            this.checkWinner();
           this.curPlayer = this.curPlayer.value === icon.x.value ? icon.o : icon.x;
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
                    if(vw.indexOf(arr[i] + 1) > -1){
                        count++;
                        cells.push(i);
                    }
                    if(count === 3){
                        winner = this.curPlayer.value;
                        for(let k = 0; k < cells.length; k++){
                            this.tiles[arr[cells[k]]].highlight();
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
                if(!tile.played){
                    tie = false;
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
}
</script>


<style lang="scss">
    @import '../assets/board.scss';
</style>


