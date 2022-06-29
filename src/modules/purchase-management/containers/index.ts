import { PurchaseModelComponent } from '../components/purchase-model/purchase-model.component';
import { PurchaseComponent } from '../components/purchase/purchase.component';

import { TableComponent } from './table/table.component';

export const containers = [TableComponent, PurchaseModelComponent, PurchaseComponent];

export * from './table/table.component';
export * from './../components/purchase/purchase.component';
export * from './../components/purchase-model/purchase-model.component';
