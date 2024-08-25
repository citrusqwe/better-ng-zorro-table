import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumnManagerService } from '../../services/table-column-manager/table-column-manager.service';
import { TableCellDefComponent } from '../table-cell-def/table-cell-def.component';
import { TableColumnDefComponent } from '../table-column-def/table-column-def.component';
import { TableCellDefDirective } from '../../directives/table-cell-def.directive';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzDropDownModule,
    NzCheckboxModule,
    TableCellDefComponent,
    TableColumnDefComponent,
    TableCellDefDirective,
  ],
  providers: [TableColumnManagerService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  tableColumnManager = inject(TableColumnManagerService);
  @Input({ required: true }) list: any[] = [];
}
