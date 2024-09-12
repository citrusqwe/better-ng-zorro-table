import { NgModule } from '@angular/core';
import { CustomColumnsCellDirective } from './ui/custom-columns-cell/custom-columns-cell.directive';
import { CustomColumnsModalComponent } from './ui/custom-columns-modal/custom-columns-modal.component';
import { CustomColumnsTableComponent } from './ui/custom-columns-table/custom-columns-table.component';

@NgModule({
  imports: [
    CustomColumnsCellDirective,
    CustomColumnsModalComponent,
    CustomColumnsTableComponent,
  ],
  exports: [
    CustomColumnsCellDirective,
    CustomColumnsModalComponent,
    CustomColumnsTableComponent,
  ],
})
export class CustomColumnsTableModule {}
