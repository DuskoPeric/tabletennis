import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password='';
  log;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then(
      (authenticated:boolean)=>{
          if (authenticated){
            this.log=true; 
          }
          else{
            this.log=false;
          }
      }
  );
    
  }

  login(){
    this.authService.login(this.password);
  }

  logout(){
    this.authService.logout();
  }

}
