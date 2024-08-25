import { computed, Injectable, signal } from '@angular/core';
import { TableColumns } from '../../types/columns';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, Subject, switchMap } from 'rxjs';

@Injectable()
export class TableColumnManagerService {
  columns = signal<TableColumns>({
    name: { visible: true, index: 0, width: 200, label: 'Name' },
    age: { visible: true, index: 1, width: 200, label: 'Age' },
    address: { visible: true, index: 2, width: 200, label: 'Address' },
  });

  columnsToDisplay = computed(() =>
    Object.entries(this.columns())
      .filter(([_, value]) => value.visible)
      .sort((a, b) => a[1].index - b[1].index)
      .map(([_, value]) => ({ width: value.width, label: value.label }))
  );

  displayedColumns = computed(() => [
    ...this.columnsToDisplay(),
    { width: 300, label: 'Action' },
  ]);

  allColumns = computed(() =>
    Object.entries(this.columns()).map(([key, value]) => ({
      name: key,
      ...value,
    }))
  );

  // columnIsVisible$ = new Subject<string>();

  // constructor() {
  //   this.columnIsVisible$
  //     .pipe(
  //       switchMap((columnName) =>
  //         toObservable(this.columns).pipe(
  //           map((columns) => columns[columnName].visible)
  //         )
  //       )
  //     )
  //     .subscribe();
  // }

  isColumnVisible(columnName: string) {
    const columnsVisibility = this.columns();
    return columnsVisibility[columnName].visible;
  }

  toggleColumnVisibility(columnName: string, visibility: boolean) {
    const columnsVisibility = this.columns();
    const neededColumn = columnsVisibility[columnName];
    const toggledColumn = { ...neededColumn, visible: visibility };
    this.columns.update((columns) => ({
      ...columns,
      [columnName]: toggledColumn,
    }));
  }
}
