import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomColumnsTableComponent } from './ng-zorro-custom-columns-table/components/custom-columns-table/custom-columns-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomColumnsTableComponent],
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
}
