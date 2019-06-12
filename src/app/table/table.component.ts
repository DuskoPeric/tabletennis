import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  playerList:any[];
  players:any=[];
  items: Observable<any[]>;
  loading=true;

  constructor(private generalService:GeneralService, private router:Router) {}

  ngOnInit() {
    this.getRecipes();
  }
  getRecipes(){
    this.items = this.generalService.getPlayerListOv();
    this.items.subscribe(
      (data)=>{
        this.playerList=[];
        data.forEach(element=>{
          element["id"]=element.key;
          this.playerList.push(element);
        })
        this.playerList.sort((a, b) => (a.score < b.score) ? 1 : -1);

        var round = this.generalService.getGroupList();

        round.snapshotChanges().subscribe(item => {
          var tmpArr=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["id"]=element.key;
            tmpArr.push(y);
          });
          var arrArr=[];
          var convertArr=Object.values(tmpArr[0])

          for (let m = 0; m < convertArr.length; m++) {
            arrArr.push(Object.values(convertArr[m]))
          }

          var prewScore=0;
          for (let i = 0; i < this.playerList.length; i++) {
            if(prewScore==this.playerList[i].score){
              
              for (let j = 0; j < arrArr.length; j++) {
                for (let k = 0; k < arrArr[j].length; k++) {
                  if(this.playerList[i].name==arrArr[j][k].p1 && this.playerList[i-1].name==arrArr[j][k].p2 && arrArr[j][k].winner=="p1" || this.playerList[i].name==arrArr[j][k].p2 && this.playerList[i-1].name==arrArr[j][k].p1 && arrArr[j][k].winner=="p2"){
                    var tmp=this.playerList[i];
                    this.playerList[i]=this.playerList[i-1];
                    this.playerList[i-1]=tmp;
                        }
                  
                }
                
              }
            }
            prewScore=this.playerList[i].score;
          }
        });

        this.players=this.playerList;
        this.loading=false;
      }
    )
}

}
