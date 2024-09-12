import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumnsManagerService } from '../../services/table-columns-manager/table-columns-manager.service';
import { TableColumns } from '../../types/columns';
import { CustomColumnsCellDirective } from '../custom-columns-cell/custom-columns-cell.directive';
import { CustomColumnsModalComponent } from '../custom-columns-modal/custom-columns-modal.component';

@Component({
  selector: 'app-custom-columns-table',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzResizableModule,
    CustomColumnsModalComponent,
    CustomColumnsCellDirective,
  ],
  providers: [TableColumnsManagerService],
  templateUrl: './custom-columns-table.component.html',
  styleUrl: './custom-columns-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColumnsTableComponent<T> implements OnInit {
  tableColumnsManager = inject(TableColumnsManagerService);

  @Input({ required: true }) key!: string;
  @Input({ required: true }) listOfData!: T[];
  @Input({ required: true }) columns!: TableColumns;

  isVisibilityModalOpen: boolean = false;

  ngOnInit(): void {
    this.tableColumnsManager.initializeManager(this.key, this.columns);
  }
}
