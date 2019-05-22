import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/general.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() obj: any;

  constructor(public generalService:GeneralService) { }

  ngOnInit() {
  }

  save(){
    var data:any={}
    data.name=this.obj.name + " " + this.obj.surname;
    this.generalService.insertPlayer(data);
  }
  keyDownHandler(event: any) {
    if (event.which === 32)
        event.preventDefault();
}

}
