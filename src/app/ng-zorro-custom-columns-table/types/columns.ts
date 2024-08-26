import { NzCustomColumn } from 'ng-zorro-antd/table';

export interface TableColumn extends NzCustomColumn {
  label: string;
  required?: boolean;
  position?: 'left' | 'right';
}

// export interface TableColumn {
//   visible: boolean;
//   index: number;
//   width: number;
//   label: string;
// }

// export type TableColumnToRender = Omit<TableColumn, 'visible' | 'index'>;

export type TableColumns = Record<string, TableColumn>;
