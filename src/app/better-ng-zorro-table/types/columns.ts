export interface TableColumn {
  visible: boolean;
  index: number;
  width: number;
  label: string;
}

export type TableColumnToRender = Omit<TableColumn, 'visible' | 'index'>;

export type TableColumns = Record<string, TableColumn>;
