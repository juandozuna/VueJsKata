
export default class Tile {
    constructor(){
        this.value = '';
        this.player = false;
        this.player = '';
        this.highlighted = false;
    }

    onHover(player){
        if(!this.played){
            this.value = player;
        }
    }

    onLeave(){
        if(!this.played){
            this.value = '';
        }
    }

    onClick(player){
        if(!this.played){
            this.played = true;
            this.value = player;
            this.player = player;
        }else {
            alert('No puede jugar esta casilla otra vez');
        }
    }

    reset(){
        this.value = '';
        this.played = false;
        this.player = '';
        this.highlighted = false;
    }

    highlight(){
        this.highlighted = true;
    }
}