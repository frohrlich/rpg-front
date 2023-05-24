import { Component, OnInit } from "@angular/core";

declare function startGame():any;
declare function connect():any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
  ) { }
 
  ngOnInit() {
    startGame();
    connect();
  }
}
