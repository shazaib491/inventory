import { CompanyModelComponent } from '../components';
import { CompanyComponent } from '../components/company/company.component';
import { TableComponent } from './table/table.component';

export const containers = [TableComponent,CompanyComponent,CompanyModelComponent];

export * from './table/table.component';
export * from './../components/company/company.component';
export * from './../components/company-model/company-model.component';
