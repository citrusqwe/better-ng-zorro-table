import { TestBed } from '@angular/core/testing';

import { TableColumnsManagerService } from './table-columns-manager.service';

describe('TableColumnsManagerService', () => {
  let service: TableColumnsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumnsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
