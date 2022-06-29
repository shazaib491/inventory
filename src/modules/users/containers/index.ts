import { EditComponentsComponent } from '../components';
import { UsersComponent } from '../components/ng-single-user/users.component';
import { TableComponent } from './table/table.component';

export const containers = [TableComponent,UsersComponent,EditComponentsComponent];

export * from './table/table.component';
export * from './../components/edit-components/edit-components.component';
export * from './../components/ng-single-user/users.component';
