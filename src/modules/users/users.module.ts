import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/ng-single-user/users.component';
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
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@common/interceptors/error.interceptor';
import { SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: SuccessInterceptor,
        multi: true,
      },
],
declarations: [
    ...tablesContainers.containers,
    ...tablesComponents.components,
    ...tablesDirectives.directives,
],
exports: [...tablesContainers.containers, ...tablesComponents.components],
})
export class UsersModule { }
