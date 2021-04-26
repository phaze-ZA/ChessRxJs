import * as PIXI from 'pixi.js';
import * as Rx from "rxjs";
import Board from './board.js';

const app = new PIXI.Application({
  width: 400,
  height: 400,
  antialias: true,
  resolution: 1
});

let board = new Board();

app.stage.addChild(board.container);
document.body.appendChild(app.view);

animate();

function animate(){
    board.render();
    app.render(board.container);
    requestAnimationFrame(animate);
}