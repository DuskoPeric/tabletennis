import { Component, OnInit,Input } from '@angular/core';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() game: any;
  @Input() urlLeague: string;
  @Input() urlGroup: string;
  @Input() urlGame: string;
  @Input() addResultObj: any;
  p1obj:any={};
  p2obj:any={};
  constructor(public generalService:GeneralService) { }

  ngOnInit() {
    this.addResultObj.winner='';
  }

  makeWinner(winner){
    this.addResultObj.winner=winner;
  }

  updateGame(){
    console.log('t')
    if(this.addResultObj.p1r!=null && this.addResultObj.p2r!=null){

    
    this.game['winner']=this.addResultObj.winner;
    this.game.played=true;
    this.game['p1r']=String(this.addResultObj.p1r);
    this.game['p2r']=String(this.addResultObj.p2r);

    var url=this.urlLeague + "/" + this.urlGroup;

    console.log(typeof this.urlGame)

    this.generalService.updateGame(url,String(this.urlGame),this.game);
    var x=this.generalService.getPlayerData(this.game.p1id);
    var y=this.generalService.getPlayerData(this.game.p2id);
    var count1=0;
    var count2=0;
    x.snapshotChanges().subscribe(
      data=>{
        if(count1<1){
        count1++;
        this.p1obj=data.payload.val();
        this.p1obj.played++;
        this.p1obj.score+=Number(this.game.p1r);
        if (this.game.winner=="p1") {
          this.p1obj.wins++;
        }
        else{
          this.p1obj.lose++;
        }
        this.generalService.updatePlayer(this.game.p1id,this.p1obj);
      }
    }
    )
    y.snapshotChanges().subscribe(
      data=>{
        if(count2<1){
          count2++;
        this.p2obj=data.payload.val();
        this.p2obj.played++;
        this.p2obj.score+=Number(this.game.p2r);
        if (this.game.winner=="p2") {
          this.p2obj.wins++;
        }
        else{
          this.p2obj.lose++;
        }
        this.generalService.updatePlayer(this.game.p2id,this.p2obj);
      }
    }
    )
  }
  }
  
  updateResult(){
    if(this.addResultObj.p1r>this.addResultObj.p2r){
      this.addResultObj.winner="p1"
    }
    else if(this.addResultObj.p1r<this.addResultObj.p2r){
      this.addResultObj.winner="p2"
    }
    else{
      this.addResultObj.winner=""
    }
  }

}
