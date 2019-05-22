import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() selectedPlayer: any;
  @Output() confirm = new EventEmitter

  constructor() { }

  ngOnInit() {
  }

  yes(){
    this.confirm.emit(this.selectedPlayer.id);
  }

}
