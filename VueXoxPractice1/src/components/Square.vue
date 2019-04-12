<template>
    <div class="container">
        <div class="square" :class="playedClass"
            @click="$emit('click')"
            @mouseover="$emit('mouseover')"
            @mouseleave="$emit('mouseleave')"
        >
            <h1><slot></slot></h1>
        </div>
    </div>
</template>

<script>
const icon = require('./players.js').default ;
export default {
    name: 'square',
    props: ['played', 'player', 'highlighted'],
    computed: {
        playedClass(){
            let t = '';
            if(this.played){
                t += 'player'
                if(this.player == icon.o.value){
                    t += ' O ';
                }else t += ' X ';
            }
            if(this.highlighted){
                t += ' highlighted'
            }
            return t;
        }
    }
}
</script>

<style lang="scss">
    @import '../assets/square.scss';
</style>

