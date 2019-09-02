import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrls: ['./playoff.component.scss']
})
export class PlayoffComponent implements OnInit {

  active="quater"
  playoff={
  semi:{},
  final:{},
  quoter:{},
  champion:{}
}
  constructor(private generalService:GeneralService) { }

  ngOnInit() {
    this.getPlayoff();
  }

  getPlayoff(){
    var x=this.generalService.getplayoff();

    x.snapshotChanges().subscribe(item => {
      console.log(item)
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["id"]=element.key;
        this.playoff[element.key]=y;
      });
      console.log(this.playoff)
    });

  }

}
