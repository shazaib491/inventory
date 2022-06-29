import { DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonGuard } from '@common/guards';
import { AuthInterceptor } from '@common/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@common/interceptors/error.interceptor';
import { SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { AuthGuard } from '@modules/auth/guards';
import { AuthService } from '@modules/auth/services';
import { TablesGuard } from '@modules/category/guards/tables.guard';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPrintModule} from 'ngx-print';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 1000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
          }),
          BrowserAnimationsModule,
          NgxSpinnerModule,
          NgxPrintModule
    ],
    exports:[BrowserModule, AppRoutingModule, HttpClientModule,NgxSpinnerModule],
    providers: [DecimalPipe,AuthService,AuthGuard,TablesGuard,
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
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
