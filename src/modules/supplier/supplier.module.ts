import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { TableComponent } from './containers/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import * as tablesComponents from './components';
import * as tablesContainers from './containers';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
//   declarations: [UsersComponent, TableComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    NgxSpinnerModule
  ],
  providers: [
    DecimalPipe,
    ...tablesServices.services,
    ...tablesGuards.guards,
    ...tablesDirectives.directives,
],
declarations: [
    ...tablesContainers.containers,
    ...tablesComponents.components,
    ...tablesDirectives.directives,
],
exports: [...tablesContainers.containers, ...tablesComponents.components],
})
export class SupplierModule { }
