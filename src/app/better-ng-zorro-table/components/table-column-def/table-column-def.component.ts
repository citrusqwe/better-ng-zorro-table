import { Component, Input } from '@angular/core';
import { NzThMeasureDirective } from 'ng-zorro-antd/table';
import { TableColumnToRender } from '../../types/columns';

@Component({
  selector: 'app-table-column-def',
  standalone: true,
  imports: [NzThMeasureDirective],
  templateUrl: './table-column-def.component.html',
  styleUrl: './table-column-def.component.less',
})
export class TableColumnDefComponent {
  @Input({ required: true }) column!: TableColumnToRender;
}
