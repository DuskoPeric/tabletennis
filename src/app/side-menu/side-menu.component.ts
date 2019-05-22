import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { GeneralService } from "../general.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
  log;
  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router
  ) {
    this.generalService.login.subscribe(data => {
      this.log = data;
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        this.log = true;
      } else {
        this.log = false;
      }
    });
  }
  admin(){
    this.router.navigate(['/justforadmin']);
  }
}
