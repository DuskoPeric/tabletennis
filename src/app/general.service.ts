import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  groupList:AngularFireList<any>;
  gameList:AngularFireList<any>;
  playerList:AngularFireList<any>;
  playersList:AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  oldTable: AngularFireObject<any>;
  playerToDelete: AngularFireObject<any>;
  login=new Subject();
  constructor(private firebase:AngularFireDatabase) { }

  getAllList(){
    return this.firebase.list('/');
  }

  getPlayerList(){
    return this.firebase.list('players');
  }   
  
  getPlayerToPlayList(){
    return this.firebase.list('playersToPlay');
  }  
  getPlayerToPlayListOv(){
    return this.firebase.list('playersToPlay').valueChanges();
  }    

  getPlayerListOv(){
    return this.firebase.list('players').valueChanges();
  }     

  getPlayerData(id){
    return this.firebase.object('players/'+id)
  }

  getGroupList(){
    return this.firebase.list('round');
  }

  getGamesList(url){
    return this.firebase.list('round/'+url);
  }

  updatePlayers(data){
      this.playersList = this.getAllList();
    this.playersList.set('players',data)
  }

  insertGroup(data){
      this.groupList = this.getGroupList();
    this.groupList.set('nova',data);
  }

  updateGame(url,id,data){
      this.gameList = this.getGamesList(url);
    this.gameList.update(id,data)
  }

  updatePlayer(id,data){
      this.itemRef = this.getPlayerData(id);
    this.itemRef.update(data);
  }

  deleteTable(){
    this.oldTable = this.firebase.object('round/nova')
    this.oldTable.remove();
}

deletePlayer(id){
  this.playerToDelete = this.firebase.object('playersToPlay/'+id)
  this.playerToDelete.remove();
}

  insertPlayer(data){
    this.playersList=this.getPlayerToPlayList();
    this.playersList.push(data);
  }

  getplayoff(){
    return this.firebase.list('playoff');
  }
}
