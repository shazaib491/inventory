import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

const routes: Routes = [{ path: '', component: tablesContainers.TableComponent },
{ path: 'addOrders', component: tablesContainers.OrdersModelComponent },
{ path: 'edit/:id', component: tablesContainers.OrdersModelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
