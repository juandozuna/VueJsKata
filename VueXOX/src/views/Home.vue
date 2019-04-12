<template>
  <div class="home">  
    <tic-tac-toe/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TicTacToe from '../components/TicTacToe/TicTacToe';

export default {
  name: 'home',
  components: {
    HelloWorld,
    TicTacToe
  }
}
</script>
