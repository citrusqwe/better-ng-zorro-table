import { TestBed } from '@angular/core/testing';

import { TableColumnManagerService } from './table-column-manager.service';

describe('TableColumnManagerService', () => {
  let service: TableColumnManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumnManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
