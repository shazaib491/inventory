import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonGuard } from '@common/guards';
import { Role } from '@common/models';
import { AuthGuard } from '@modules/auth/guards';
import { TablesGuard } from '@modules/category/guards';
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/master',
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
        // canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: 'users',
        loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule),
        data: { roles: [Role.Master] },
        canActivate: [TablesGuard],
    },

    {
        path: 'category',
        loadChildren: () =>
            import('../modules/category/category.module').then(m => m.CategoryModule),
            data: { roles: [Role.Master] },
            canActivate: [AuthGuard,TablesGuard],

    },

    {
        path: 'location',
        loadChildren: () =>
            import('../modules/location-rack/location.module').then(m => m.LocationModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'company',
        loadChildren: () => import('../modules/company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'tax',
        loadChildren: () => import('../modules/tax/tax.module').then(m => m.TaxModule),
        canActivate: [AuthGuard,TablesGuard],

    },

    {
        path: 'product',
        loadChildren: () =>
            import('../modules/purchase-management/purchase.module').then(m => m.PurchaseModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'supplier',
        loadChildren: () =>
            import('../modules/supplier/supplier.module').then(m => m.SupplierModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'purchase-product',
        loadChildren: () =>
            import('../modules/purchase-product/purchase.module').then(m => m.PurchaseModule),
            canActivate: [AuthGuard,TablesGuard],

    },

    {
        path: 'orders',
        loadChildren: () => import('../modules/orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
    },

    {
        path: 'settings',
        loadChildren: () =>
            import('../modules/settings/setting.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard],
    },

    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
