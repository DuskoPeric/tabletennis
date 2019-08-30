import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TableComponent } from './table/table.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PlayersComponent } from './players/players.component';
import { EditComponent } from './schedule/edit/edit.component';
import { AddComponent } from './players/add/add.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './players/confirm/confirm.component';
import { PlayoffComponent } from './playoff/playoff.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    TableComponent,
    ScheduleComponent,
    PlayersComponent,
    EditComponent,
    AddComponent,
    GroupsComponent,
    LoginComponent,
    ConfirmComponent,
    PlayoffComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
