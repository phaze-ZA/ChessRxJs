import * as PIXI from 'pixi.js';
export default class C_Square {
    constructor(color, file, rank){
        this.rank = rank;
        this.file = file;
        this.width = 50;
        this.height = 50;
        this.x = this.file * this.width;
        this.y = this.rank * this.height;
        this.isClicked = false;
        this.piece = null;
        
        this.squareContainer = new PIXI.Container();
        
        this.square = new PIXI.Graphics();
        this.square.beginFill(color,1);
        this.square.drawRect(0,0,this.width,this.height);
        this.square.endFill();
        
        this.squareContainer.position.set(this.x, this.y);
        this.squareContainer.addChild(this.square);

        this.square.interactive = true;

        //Methods
        this.addPiece = this.addPiece.bind(this);
        this.removePiece = this.removePiece.bind(this);
    }

    addPiece(piece){
        this.squareContainer.addChild(piece.piece);
        this.piece = piece;
        piece.square = this;
        this.piece.generateMoves();
    }

    removePiece(){
        this.squareContainer.removeChild(this.piece.piece);
        this.piece.square = null;
        this.piece = null;
    }

    render(){
    }
}