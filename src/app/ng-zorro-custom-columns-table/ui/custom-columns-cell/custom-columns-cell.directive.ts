import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableColumnsManagerService } from '../../services/table-columns-manager/table-columns-manager.service';

@Directive({
  selector: 'th[customTableCellDef], td[customTableCellDef]',
  standalone: true,
})
export class CustomColumnsCellDirective implements OnInit {
  private tableColumnsManager = inject(TableColumnsManagerService);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  @Input({ required: true, alias: 'customTableCellDef' }) name!: string;

  ngOnInit(): void {
    this.tableColumnsManager.columnsVisibility$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((visibilityMap) => {
        const isCellVisible = visibilityMap[this.name];
        const displayOfCell = isCellVisible ? 'table-cell' : 'none';
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'display',
          displayOfCell
        );
      });
    // this.tableColumnsManager.columnsToDisplay$
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((columns) => {
    //     columns.forEach((column, i) => {
    //       if (column.value === this.name) {
    //         const isCellVisible = column.default;
    //         const displayOfCell = isCellVisible ? 'table-cell' : 'none';
    //         this.renderer.setStyle(
    //           this.elementRef.nativeElement,
    //           'display',
    //           displayOfCell
    //         );
    //         this.renderer.setStyle(this.elementRef.nativeElement, 'order', i);
    //         const flexStyles = !column.fixWidth
    //           ? `1 1 ${column.width}px`
    //           : `1 0 ${column.width}px`;
    //         this.renderer.setStyle(
    //           this.elementRef.nativeElement,
    //           'flex',
    //           flexStyles
    //         );
    //       }
    //     });
    //   });
  }
}
