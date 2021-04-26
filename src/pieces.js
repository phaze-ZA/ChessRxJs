import * as PIXI from "pixi.js";

class Piece{
    constructor(){
        this.type = null;
        this.color = null;
        this.allowedMoves = [];
        this.square = null;

        //move to sub class
        this.piece = new PIXI.Text('P',{fontFamily : 'Arial', fontSize: 24, fill: 0xff1010, align : 'center'});

        this.move = this.move.bind(this);
        if(this.generateMoves === undefined){
            throw new TypeError("generateMoves must be defined for " + this.type);
        }else{
            this.generateMoves = this.generateMoves.bind(this);
        }
    }
    
    move(destSquare){
        if(this.isFirstMove !== undefined){
            this.isFirstMove=false;
        }

        for (let i = 0; i < this.allowedMoves.length; i++) {
            const allowedMove = this.allowedMoves[i];
            if(destSquare == allowedMove){
                return true;
            }
        }
        return false;
    }
}

class Pawn extends Piece{
    constructor(b_white){
        super();
        this.type = "Pawn";
        this.isWhite = b_white;
        this.allowedMoves = [];
        this.isFirstMove = true;
    }
    generateMoves(){
        this.allowedMoves = [];
        let allowedSquare = this.square.rank - 1;
        this.allowedMoves.push(allowedSquare);
        if(this.isFirstMove){
            allowedSquare = this.square.rank - 2;
            this.allowedMoves.push(allowedSquare);
        }
    }
}

class Rook extends Piece{
    constructor(b_white){
        super();
        this.type = "Rook";
        this.isWhite = b_white;
        this.allowedMoves = [];
    }
    generateMoves(){
        this.allowedMoves = [];
        let allowedSquare = this.square.rank - 1;
        this.allowedMoves.push(allowedSquare);
    }
}


export { Piece, Pawn };