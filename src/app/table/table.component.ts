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
    var aoa=[];
    this.getPlayers();
  }
  getPlayers(){
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

          /* find unique scores */
          var resultG=[];
          for (let p = 0; p < this.playerList.length; p++) {
            var have=false;
            for (let r = 0; r < resultG.length; r++) {
              if(resultG[r]==this.playerList[p].score){
                have=true;
              }
            }
            if(!have){
              resultG.push(this.playerList[p].score);
            }
          }
          /* create array of arrays */
          var aoa=[];
          for (let i=0;i<resultG.length;i++)
          {
            aoa["arr_"+resultG[i]] = [];
          }
          /* push player to array */
          for (let i = 0; i < this.playerList.length; i++) {
            this.playerList[i].po=0;
            aoa["arr_"+this.playerList[i].score].push(this.playerList[i]);
          }
          /* sort player inside array */
          for (let a = 0; a < resultG.length; a++) {
            for (let i = 0; i < aoa["arr_"+resultG[a]].length; i++) {
              for (let k = 0; k < aoa["arr_"+resultG[a]].length; k++) {
               for (let j = 0; j < arrArr.length; j++) {
                 for(let d=0; d< arrArr[j].length;d++){
                 if(arrArr[j][d].p1==aoa["arr_"+resultG[a]][i].name && arrArr[j][d].p2==aoa["arr_"+resultG[a]][k].name && arrArr[j][d].winner=="p1" || arrArr[j][d].p1==aoa["arr_"+resultG[a]][k].name && arrArr[j][d].p2==aoa["arr_"+resultG[a]][i].name && arrArr[j][d].winner=="p2"){
                  aoa["arr_"+resultG[a]][i].po+=1;
                 }
                 else if(arrArr[j][d].p1==aoa["arr_"+resultG[a]][i].name && arrArr[j][d].p2==aoa["arr_"+resultG[a]][k].name && arrArr[j][d].winner=="p2" || arrArr[j][d].p1==aoa["arr_"+resultG[a]][k].name && arrArr[j][d].p2==aoa["arr_"+resultG[a]][i].name && arrArr[j][d].winner=="p1"){
                  aoa["arr_"+resultG[a]][k].po+=1;
                 }
                }
               }
              }
            }
            aoa["arr_"+resultG[a]].sort((l, m) => (l.po < m.po) ? 1 : -1)
           }
           /* concat to final array */
           var final=[];
           for (let i = 0; i < resultG.length; i++) {
            for (let j = 0; j < aoa["arr_"+resultG[i]].length; j++) {
              final.push(aoa["arr_"+resultG[i]][j]);
            }
           }

           this.players=final;

        });

        
        this.loading=false;
      }
    )
}

}
