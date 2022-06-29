import { LocationModelComponent } from '../components';
import { LocationComponent } from '../components/location-rk/location.component';
import { TableComponent } from './table/table.component';

export const containers = [TableComponent, LocationComponent, LocationModelComponent];

export * from './table/table.component';
export * from './../components/location-rk/location.component';
export * from './../components/location-model/location-model.component';
