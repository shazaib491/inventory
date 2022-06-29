import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';
import { UsersComponent } from './components/ng-single-user/users.component';

const routes: Routes = [
    { path: '', component: tablesContainers.TableComponent },
    { path: 'addUser', component: tablesContainers.EditComponentsComponent },
    { path: 'edit/:id', component: tablesContainers.EditComponentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
