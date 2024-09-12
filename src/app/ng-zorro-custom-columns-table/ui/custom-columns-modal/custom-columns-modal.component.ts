import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableColumnsManagerService } from '../../services/table-columns-manager/table-columns-manager.service';
import { TableColumn } from '../../types/columns';

@Component({
  selector: 'app-custom-columns-modal',
  standalone: true,
  imports: [NzModalModule, CdkDropList, CdkDrag, NzCheckboxModule],
  templateUrl: './custom-columns-modal.component.html',
  styleUrl: './custom-columns-modal.component.less',
})
export class CustomColumnsModalComponent {
  tableColumnsManager = inject(TableColumnsManagerService);

  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  drop(event: CdkDragDrop<TableColumn[]>): void {
    this.tableColumnsManager.reorder(event.previousIndex, event.currentIndex);
  }

  private closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  handleColumnsChanges(): void {
    this.tableColumnsManager.applyColumnsChanges();
    this.closeModal();
  }

  handleCancel(): void {
    this.tableColumnsManager.resetColumnsToPrevState();
    this.closeModal();
  }
}
