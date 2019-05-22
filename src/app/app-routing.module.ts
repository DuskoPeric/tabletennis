import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PlayersComponent } from './players/players.component';
import { GroupsComponent } from './groups/groups.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'justforadmin', component: LoginComponent },
  { path: 'groups', canActivate:[AuthGuard], component: GroupsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
