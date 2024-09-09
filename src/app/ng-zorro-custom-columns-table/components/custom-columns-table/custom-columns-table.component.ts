import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ResizableModule } from 'angular-resizable-element';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
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
    ResizableModule,
    ObserversModule,
    NzResizableModule,
  ],
  providers: [TableColumnsManagerService],
  templateUrl: './custom-columns-table.component.html',
  styleUrl: './custom-columns-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColumnsTableComponent implements AfterViewInit {
  tableColumnsManager = inject(TableColumnsManagerService);
  @Input({ required: true }) listOfData!: any[];
  @ViewChild('table', { static: false }) table!: NzTableComponent<any[]>;

  constructor() {
    this.tableColumnsManager.setInitialColumns({
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
    });
  }

  onTableWidthChanges([record]: MutationRecord[]) {
    const targetWidth = (record.target as HTMLTableElement).clientWidth;
    console.log(
      record,
      targetWidth,
      Math.ceil(
        targetWidth / this.tableColumnsManager.columnsToDisplay().length
      )
    );
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

  ngAfterViewInit(): void {
    console.log(this.table.data);
  }
}
