import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumnsManagerService } from '../../services/table-columns-manager/table-columns-manager.service';
import { TableColumn } from '../../types/columns';

@Component({
  selector: 'app-custom-columns-table',
  standalone: true,
  imports: [
    NzTableModule,
    NzCheckboxModule,
    NzModalModule,
    NzButtonModule,
    CdkDropList,
    CdkDrag,
    JsonPipe,
  ],
  providers: [TableColumnsManagerService],
  templateUrl: './custom-columns-table.component.html',
  styleUrl: './custom-columns-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColumnsTableComponent {
  tableColumnsManager = inject(TableColumnsManagerService);
  @Input({ required: true }) listOfData!: any[];

  constructor() {
    this.tableColumnsManager.setInitialColumns({
      name: {
        label: 'Name',
        value: 'name',
        default: true,
        required: true,
        position: 'left',
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
    });
  }

  // modal
  isVisible: boolean = false;

  drop(event: CdkDragDrop<TableColumn[]>): void {
    this.tableColumnsManager.reorder(event.previousIndex, event.currentIndex);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleColumnsChanges(): void {
    this.tableColumnsManager.applyColumnsChanges();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
