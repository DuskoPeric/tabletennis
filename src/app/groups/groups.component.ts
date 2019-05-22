import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../general.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent implements OnInit {
  def = -1;
  results = [];
  playerList: any[];
  players: any = [];
  groups=[];
  ob:any={};

  constructor(private generalService: GeneralService) {}

  ngOnInit() {
    this.getPlayers();
  }

  schedule(number, playersArr) { 
    var resultArr = [];                  
    if (!playersArr) {
      playersArr = [];
      for (var i = 1; i <= number; i += 1) {
        playersArr.push(i);
      }
    } else {
      playersArr = playersArr.slice();
    }
  
    if (number % 2 === 1) {
      playersArr.push(this.def);
      number += 1;
    }
    for (var j = 0; j < number - 1; j += 1) {
      resultArr[j] = [];
      for (var k = 0; k < number / 2; k += 1) {
        if (playersArr[k] !== this.def && playersArr[number - 1 - k] !== this.def) {
          resultArr[j].push([playersArr[k], playersArr[number - 1 - k]]);
        }
      }
      playersArr.splice(1, 0, playersArr.pop()); 
    }
    return resultArr;
  };  

  deleteTable(){
    this.generalService.deleteTable();
  }

  updategroup(){
    this.generalService.insertGroup(this.results);

    for (const prop in this.ob) {
      this.ob[prop].lose=0;
      this.ob[prop].wins=0;
      this.ob[prop].played=0;
      this.ob[prop].score=0;
    }

    this.generalService.updatePlayers(this.ob)
  }

  getPlayers() {
    var x = this.generalService.getPlayerToPlayList();
    x.snapshotChanges().subscribe(item => {
      this.playerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["id"]=element.key;
        this.playerList.push(y);
      });
      
      
      for (let l = 0; l < this.playerList.length; l++) {
        this.groups.push({name:l+1,games:[]});
        
      }

      for (const prop in this.playerList) {
        this.ob[`${this.playerList[prop].id}`]=this.playerList[prop];
      }

      for (let i = 0; i < this.playerList.length; i++) {
        this.players.push({ name: this.playerList[i].name, id: this.playerList[i].id});
      }

      this.results=this.schedule(this.players.length,this.players)
      

      for (let i = 0; i < this.results.length; i++) {
        for (let j = 0; j < this.results[i].length; j++) {
          this.results[i][j]['p1']=this.results[i][j][0].name;
          this.results[i][j]['p2']=this.results[i][j][1].name;
          this.results[i][j]['p1id']=this.results[i][j][0].id;
          this.results[i][j]['p2id']=this.results[i][j][1].id;
          this.results[i][j]['played']=false;
          this.results[i][j].splice(0, 2);
        }
      }
    });
  }

}
