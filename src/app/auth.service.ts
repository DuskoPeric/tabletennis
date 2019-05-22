import { resolve, reject } from "q";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    constructor(private router: Router, private generalService:GeneralService) { }
    logedIn=false;
    isAuthenticated(){
        const promise =new Promise(
            (resolve,reject)=>{
                resolve(this.logedIn);
            }
        )
        return promise;
    }
    login(password){
        if(password=='ulumulu'){
            this.logedIn=true;
            this.generalService.login.next(true);
            this.router.navigate(['/']);
        }
       
    }
    logout(){
        this.logedIn=false;
        this.router.navigate(['/']);
        this.generalService.login.next(false);
    }
}