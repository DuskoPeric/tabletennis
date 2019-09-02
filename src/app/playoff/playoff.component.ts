import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-playoff',
  templateUrl: './playoff.component.html',
  styleUrls: ['./playoff.component.scss']
})
export class PlayoffComponent implements OnInit {

  active="quater"
  loading=true;
  playoff:any={}
  constructor(private generalService:GeneralService) { }

  ngOnInit() {
    this.playoff['semi']={};
    this.playoff['quoter']={};
    this.playoff['final']={};
    this.playoff['champion']={};

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
      this.loading=false;
    });

  }

}
