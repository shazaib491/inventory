import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

const routes: Routes = [
    { path: '', component: tablesContainers.TableComponent },
    { path: 'addTax', component: tablesContainers.TaxModelComponent },
    { path: 'edit/:id', component: tablesContainers.TaxModelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }


// Tax
// Percentage
// Status
// Added
// Updated
// Action
