<template>
    <div class="container">
        <div class="square" 
        @mouseover="$emit('mouseover')" 
        @click="$emit('clicked')" 
        :class="playedClass" 
        @mouseleave="$emit('mouseleave')">
            <h1><slot></slot></h1>
        </div>
    </div>
</template>


<script>
const icon = require('./PlayerEnum.js').default;
export default {
    name: 'square',
    props: ['played', 'player', 'highlighted'],
    computed: {
        playedClass(){
            let t = ''
            if(this.played){
                if(this.player == icon.o.value){
                    t = 'player O ';
                }else {
                    t = 'player X ';
                }
            }

            if(this.highlighted){
                t += ' highlighted';
            }   
            return t;
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/square.scss';
</style>
