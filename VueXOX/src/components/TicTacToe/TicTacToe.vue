<template>
    <div>
        <h1 class="title"> Tic Tac Toe</h1>
        <board/> 
    </div>
</template>


<script>
import Board from './Board';
export default {
    name: 'tic-tac-toe',
    data(){
        return {

        };
    },
    components: {
        Board
    }
}
</script>

<style lang="scss">
    h1 {
        width: 100%;
        &.title {
            text-align: center;
            font-family: 'Century Gothic', sans-serif;
        }
    }
</style>

