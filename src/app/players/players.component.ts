import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../general.service";
import { Observable } from "rxjs";
import { AngularFireList } from "angularfire2/database";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  log;
  popup = false;
  playerList: any[];
  players: any = [];
  items: AngularFireList<any>;
  loading = true;
  player: any = {};
  selectedPlayer = {};

  constructor(private generalService: GeneralService,private authService: AuthService) {
    this.generalService.login.subscribe(data => {
      this.log = data;
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        this.log = true;
      } else {
        this.log = false;
      }
    });
    this.getPlayers();
  }

  add() {
    this.popup = true;
    this.player = {};
  }

  getPlayers() {
    this.items = this.generalService.getPlayerToPlayList();
    this.items.snapshotChanges().subscribe(data => {
      this.playerList = [];
      data.forEach(element => {
        var y = element.payload.toJSON();
        y["id"] = element.key;
        this.playerList.push(y);
      });
      for (let i = 0; i < this.playerList.length; i++) {
        var tmp = this.playerList[i].name.split(" ");
        this.playerList[i]["fname"] = tmp[0];
        this.playerList[i]["sname"] = tmp[1];
      }
      this.players = this.playerList;
      this.loading = false;
    });
  }

  delete(player) {
    this.selectedPlayer = player;
  }

  deletePlayer(id) {
    this.generalService.deletePlayer(id);
  }
}
