<template>
    <div>
        <h1 class="title"> Tic Tac Toe</h1>
        <board />
    </div>
</template>

<script>
import Board from './Board';
export default {
    name: 'tic-tac-toe',
    components: {
        Board
    }
}
</script>

<style lang="scss">
    .title {
        text-align: center;
        width: 100%;
        font-family: 'Century Gothic';
    }
</style>
