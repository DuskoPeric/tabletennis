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
        this.players=this.playerList;
        this.loading=false;
      }
    )
}

}
