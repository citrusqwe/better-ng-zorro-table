import { moveItemInArray } from '@angular/cdk/drag-drop';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { TableColumn, TableColumns } from '../../types/columns';

@Injectable()
export class TableColumnsManagerService {
  private columns!: WritableSignal<TableColumns>;
  private columnsForSettings!: WritableSignal<TableColumns>;

  columnsToDisplay = computed(() => Object.values(this.columns()));

  columnsToDisplayInSettings = computed(() =>
    Object.values(this.columnsForSettings()).filter((col) => !col.position)
  );

  columnsToDisplayInSettingsFirst = computed(() =>
    Object.values(this.columnsForSettings()).filter(
      (col) => col.position === 'left' && col.required
    )
  );

  columnsToDisplayInSettingsLast = computed(() =>
    Object.values(this.columnsForSettings()).filter(
      (col) => col.position === 'right' && col.required
    )
  );

  private columnsValuesToObject<T extends TableColumn>(
    array: T[]
  ): TableColumns {
    return array.reduce((prev, curr) => ({ ...prev, [curr.value]: curr }), {});
  }

  private columnsToUpdateAfterReorder = computed(() => ({
    ...this.columnsValuesToObject(this.columnsToDisplayInSettingsFirst()),
    ...this.columnsValuesToObject(this.columnsToDisplayInSettings()),
    ...this.columnsValuesToObject(this.columnsToDisplayInSettingsLast()),
  }));

  setInitialColumns(tableColumns: TableColumns) {
    this.columns = signal<TableColumns>(tableColumns);
    this.columnsForSettings = signal<TableColumns>(tableColumns);
  }

  toggleColumnVisibility(columnName: string, visibility: boolean) {
    const neededColumn = this.columnsForSettings()[columnName];
    const updatedColumn = { ...neededColumn, default: visibility };
    console.log(columnName, updatedColumn);
    this.columnsForSettings.update((columns) => ({
      ...columns,
      [columnName]: updatedColumn,
    }));
  }

  reorder(prevIndex: number, currIndex: number): void {
    const cols = this.columnsToDisplayInSettings();
    moveItemInArray(cols, prevIndex, currIndex);
    this.columnsForSettings.set(this.columnsToUpdateAfterReorder());
  }

  applyColumnsChanges() {
    this.columns.set(this.columnsForSettings());
  }
}
