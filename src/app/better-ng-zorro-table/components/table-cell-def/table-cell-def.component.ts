import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-cell-def',
  standalone: true,
  imports: [],
  templateUrl: './table-cell-def.component.html',
  styleUrl: './table-cell-def.component.less',
})
export class TableCellDefComponent {
  @Input({ required: true }) name!: string;
}
