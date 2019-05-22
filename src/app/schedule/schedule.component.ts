import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  log;
  urlLeague='';
  urlGroup='';
  urlGame='';
  urlUpdate='';
  toAdd:any;
  gameForEdit=[];
  popup=false;
  activeTab='1';
  playerList: any[];
  loading=true;
  addResultObj={
    winner:'',
    playeroneresult:0,
    playertworesult:0
  }
  listItems:any[]=[]

  constructor(private generalService: GeneralService,private authService: AuthService) {
    this.generalService.login.subscribe(data => {
      this.log = data;
    });
  }

  changeTab(tab){
    this.activeTab=tab;
  }

  getGroups() {
    var x = this.generalService.getGroupList();

    x.snapshotChanges().subscribe(item => {
      var tmpArr=[];
      var tmpArr2=[];
      this.playerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["id"]=element.key;
        this.playerList.push(y);
      });

      
      this.urlLeague=this.playerList[0].id;
      delete this.playerList[0].id;
      tmpArr=Object.values(this.playerList[0])

      for (let i = 0; i < tmpArr.length; i++) {
        var tmpvar=Object.values(tmpArr[i]);
        tmpArr2.push(tmpvar)
      }
      this.listItems=tmpArr2;
      this.loading=false;
    });
  }

  getName(number){
    var name='';
    switch (number) {
      case 1:
       name = 'Prvo kolo';
        break;
      case 2:
        name = "Drugo kolo";
        break;
      case 3:
        name = "Trece kolo";
        break;
      case 4:
        name = "Cetvrto kolo";
        break;
      case 5:
        name = "Peto kolo";
        break;
      case 6:
        name = "Sesto kolo";
        break;
      case 7:
        name = "Sedmo kolo";
        break;
      case 8:
        name = "Osmo kolo";
        break;
      case 9:
        name = "Deveto kolo";
        break;
      case 10:
        name = "Deseto kolo";
        break;
      case 11:
        name = "Jedanaesto kolo";
        break;
    }
    return name;
  }

  edit(game,group,id){
    this.urlGroup=group;
    this.urlGame=id;
    this.gameForEdit=game;
    this.popup=true;
    this.toAdd={
      winner:'',
      p1r:0,
      p2r:0
    }
  }

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        this.log = true;
      } else {
        this.log = false;
      }
    });
    this.getGroups();
  }

}
