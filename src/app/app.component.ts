import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomColumnsTableComponent } from './ng-zorro-custom-columns-table/ui/custom-columns-table/custom-columns-table.component';
import { TableColumns } from './ng-zorro-custom-columns-table/types/columns';
import { CustomColumnsCellDirective } from './ng-zorro-custom-columns-table/ui/custom-columns-cell/custom-columns-cell.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomColumnsTableComponent,
    CustomColumnsCellDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'better-ng-zorro-table';
  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      gender: 'female',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      gender: 'female',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      gender: 'male',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  tableColumns: TableColumns = {
    name: {
      label: 'Name',
      value: 'name',
      default: true,
      // required: true,
      // position: 'left',
      width: 200,
      fixWidth: true,
    },
    gender: {
      label: 'Gender',
      value: 'gender',
      default: true,
      width: 200,
    },
    address: {
      label: 'Address',
      value: 'address',
      default: true,
      width: 200,
    },
    age: {
      label: 'Age',
      value: 'age',
      default: true,
      width: 200,
    },
    action: {
      label: 'Action',
      value: 'action',
      default: true,
      required: true,
      position: 'right',
      width: 200,
    },
  };
}
