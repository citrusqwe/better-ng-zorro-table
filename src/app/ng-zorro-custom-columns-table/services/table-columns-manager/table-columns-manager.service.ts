import { moveItemInArray } from '@angular/cdk/drag-drop';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { TableColumn, TableColumns } from '../../types/columns';
import { toObservable } from '@angular/core/rxjs-interop';
import { TableStorageManager } from '../../utils/table-storage';

@Injectable()
export class TableColumnsManagerService {
  private allColumns!: WritableSignal<TableColumns>;
  private columns!: WritableSignal<TableColumns>;
  private columnsForSettings!: WritableSignal<TableColumns>;

  private tableStorageManager!: TableStorageManager;

  columnsToDisplay = computed(() => Object.values(this.columns()));
  columnsToDisplay$ = toObservable(this.columnsToDisplay);
  columnsVisibility = computed(() =>
    Object.fromEntries(
      Object.entries(this.columns()).map(([key, column]) => [
        key,
        column.default,
      ])
    )
  );
  columnsVisibility$ = toObservable(this.columnsVisibility);

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

  initializeManager(key: string, tableColumns: TableColumns): void {
    this.setInitialColumns(tableColumns);
    this.getAndSetColumnsFromStorage(key);
  }

  private setInitialColumns(tableColumns: TableColumns): void {
    this.allColumns = signal<TableColumns>(tableColumns);
    this.columns = signal<TableColumns>(tableColumns);
    this.columnsForSettings = signal<TableColumns>(tableColumns);
  }

  private getAndSetColumnsFromStorage(key: string): void {
    this.tableStorageManager = new TableStorageManager(
      key,
      window.localStorage
    );
    const columnsFromStorage = JSON.parse(this.tableStorageManager.getItem());
    this.columns.set(columnsFromStorage);
    this.columnsForSettings.set(columnsFromStorage);
  }

  toggleColumnVisibility(columnName: string, visibility: boolean): void {
    const neededColumn = this.columnsForSettings()[columnName];
    const updatedColumn = { ...neededColumn, default: visibility };
    console.log(columnName, updatedColumn);
    this.columnsForSettings.update((columns) => ({
      ...columns,
      [columnName]: updatedColumn,
    }));
  }

  changeColumnWidth(columnName: string, width?: number): void {
    const neededColumn = this.columns()[columnName];
    const updatedColumn = {
      ...neededColumn,
      width: width || neededColumn.width,
    };
    console.log(columnName, updatedColumn);
    this.columns.update((columns) => ({
      ...columns,
      [columnName]: updatedColumn,
    }));
  }

  reorder(prevIndex: number, currIndex: number): void {
    const cols = this.columnsToDisplayInSettings();
    moveItemInArray(cols, prevIndex, currIndex);
    this.columnsForSettings.set(this.columnsToUpdateAfterReorder());
  }

  resetColumnsToPrevState(): void {
    console.log('cols', this.columns());
    this.columnsForSettings.set(this.columns());
  }

  applyColumnsChanges(): void {
    this.columns.set(this.columnsForSettings());
    this.tableStorageManager.setItem(JSON.stringify(this.columns()));
  }
}
