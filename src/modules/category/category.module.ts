import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
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
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppCommonModule,
    NavigationModule,
    DataTablesModule,
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
export class CategoryModule { }
