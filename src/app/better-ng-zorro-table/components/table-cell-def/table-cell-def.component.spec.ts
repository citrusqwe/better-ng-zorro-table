import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellDefComponent } from './table-cell-def.component';

describe('TableCellDefComponent', () => {
  let component: TableCellDefComponent;
  let fixture: ComponentFixture<TableCellDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCellDefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCellDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
