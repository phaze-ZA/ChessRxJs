import * as PIXI from "pixi.js";
import C_Square  from "./square.js";
import {Pawn, Piece} from "./pieces.js";

export default class Board{
    constructor(){
        this.squares = [];
        this.pieces = [];
        this.boardMap = [];
        this.selectedSquare = null;
        this.selectedPiece = null;
        this.container = new PIXI.Container();
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.constructBoard();
        this.constructPieces();
    }

    constructBoard(){
        let count_rank = 0;
        while (count_rank<8) {
            let count_file = 0;
            this.boardMap.push([]);
            while (count_file < 8){
                let color = 0xFFFFFF;
                if((count_rank + count_file) % 2 !== 0){
                    color = 0x555555;
                }
                const square = new C_Square(color, count_file,  count_rank);
                this.container.addChild(square.squareContainer);
                square.square.on('pointerup' , ()=>this.handleSquareClick(square));
                this.boardMap[count_rank].push(square);
                this.squares.push(square);
                count_file++;
            }
            count_rank++;
        }
    }

    handleSquareClick(square){
        if(this.selectedSquare === square){
            //if we have selected the previously selected square
            //empty the selected square and piece variables for later use
            this.selectedSquare = null;
            this.selectedPiece = null;
        }else{
            //we've selected a new square
            let oldSquare = this.selectedSquare;
            this.selectedSquare = square;
            //lets check whether we're holding a piece
            if(this.selectedPiece === null){
                //we're not holding a piece, so let's pick the one that's in this square up
                this.selectedPiece = this.selectedSquare.piece;
            }else{
                //we're holding a piece, so let's drop it on the new square
                //first we need to make sure that the new square is empty
                if(this.selectedSquare.piece === null){
                    //let's make sure we are able to move to the destination square
                    if(this.selectedPiece.move(this.selectedSquare.rank)){
                        //square is empty, let's drop our piece
                        this.selectedSquare.addPiece(this.selectedPiece);
                        //lets also make sure we remove the piece from the previous square
                        oldSquare.removePiece();
                    } else {
                        //Logic for move
                    }
                    //we've dropped the piece now, so let's make sure we don't continue to move it
                    this.selectedPiece = null;
                    this.selectedSquare = null;
                } else { 
                    //square is occupied
                    //we will add logic later to determine whether or not
                    //TODO: we can replace the occupying piece
                    
                    //For now let's just pick that piece up:
                    this.selectedPiece = this.selectedSquare.piece;
                }
            }
        }
    }

    constructPieces(){
        const TOTAL_PIECES = 16;
        for(let i = 0;  i < TOTAL_PIECES; i++){
            this.pieces.push(new Pawn(true));
        }

        for(let i = 0; i < this.pieces.length; i++){
            const piece = this.pieces[i];
            if(i < this.boardMap[this.boardMap.length - 1].length){
                this.boardMap[this.boardMap.length - 1][i].addPiece(piece);
            }else{
                this.boardMap[this.boardMap.length - 2][i - this.boardMap[this.boardMap.length - 1].length].addPiece(piece);
            }
        }
    }

    render(){
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i];
            if(square !== this.selectedSquare){
                square.square.tint = 0xFFFFFF;
            }else{
                square.square.tint = 0x00FFFF;
            }
            square.render();            
        }
    }
}