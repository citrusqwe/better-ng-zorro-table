export interface TableStorage {
  getItem: (key: string) => any;
  setItem: (ket: string, value: string) => any;
  removeItem: (key: string) => any;
}

export class TableStorageManager {
  private _key!: string;
  private _storage!: TableStorage;

  constructor(key: string, storage: TableStorage) {
    this._key = key;
    this._storage = storage;
  }

  getItem() {
    return this._storage.getItem(this._key);
  }

  setItem(value: string) {
    this._storage.setItem(this._key, value);
  }

  removeItem() {
    this._storage.removeItem(this._key);
  }
}
